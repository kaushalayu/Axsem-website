import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FooterContext = createContext();

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error('useFooter must be used within a FooterProvider');
  }
  return context;
};

export const FooterProvider = ({ children }) => {
  const [footerLinks, setFooterLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchFooterLinks = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      if (!forceRefresh) {
        const cached = localStorage.getItem('footerLinks');
        const cacheTime = localStorage.getItem('footerLinksTime');
        
        if (cached && cacheTime) {
          const cacheAge = Date.now() - parseInt(cacheTime);
          if (cacheAge < 5 * 60 * 1000) {
            setFooterLinks(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/footer`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setFooterLinks(data);
        localStorage.setItem('footerLinks', JSON.stringify(data));
        localStorage.setItem('footerLinksTime', Date.now().toString());
        setLastUpdated(new Date());
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      console.error('Failed to fetch footer links:', err);
      setError(err.message);
      const cached = localStorage.getItem('footerLinks');
      if (cached) {
        setFooterLinks(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addFooterLink = async (linkData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/footer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(linkData)
      });
      const newLink = await response.json();
      
      const updatedLinks = [...footerLinks, newLink];
      setFooterLinks(updatedLinks);
      localStorage.setItem('footerLinks', JSON.stringify(updatedLinks));
      localStorage.setItem('footerLinksTime', Date.now().toString());
      
      return newLink;
    } catch (err) {
      throw err;
    }
  };

  const updateFooterLink = async (id, linkData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/footer/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(linkData)
      });
      const updatedLink = await response.json();
      
      const updatedLinks = footerLinks.map(link => 
        link._id === id ? updatedLink : link
      );
      setFooterLinks(updatedLinks);
      localStorage.setItem('footerLinks', JSON.stringify(updatedLinks));
      localStorage.setItem('footerLinksTime', Date.now().toString());
      
      return updatedLink;
    } catch (err) {
      throw err;
    }
  };

  const deleteFooterLink = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/footer/${id}`, {
        method: 'DELETE'
      });
      
      const updatedLinks = footerLinks.filter(link => link._id !== id);
      setFooterLinks(updatedLinks);
      localStorage.setItem('footerLinks', JSON.stringify(updatedLinks));
      localStorage.setItem('footerLinksTime', Date.now().toString());
    } catch (err) {
      throw err;
    }
  };

  const reorderLinks = async (items) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/footer/reorder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      const updatedLinks = await response.json();
      
      setFooterLinks(updatedLinks);
      localStorage.setItem('footerLinks', JSON.stringify(updatedLinks));
      localStorage.setItem('footerLinksTime', Date.now().toString());
      
      return updatedLinks;
    } catch (err) {
      throw err;
    }
  };

  const getLinksByCategory = (category) => {
    return footerLinks.filter(link => link.category === category && link.isActive);
  };

  const getCategories = () => {
    const categories = [...new Set(footerLinks.map(link => link.category))];
    return categories.sort();
  };

  useEffect(() => {
    fetchFooterLinks();
  }, [fetchFooterLinks]);

  const value = {
    footerLinks,
    loading,
    error,
    lastUpdated,
    fetchFooterLinks,
    addFooterLink,
    updateFooterLink,
    deleteFooterLink,
    reorderLinks,
    getLinksByCategory,
    getCategories
  };

  return (
    <FooterContext.Provider value={value}>
      {children}
    </FooterContext.Provider>
  );
};

export default FooterContext;
