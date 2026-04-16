import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const NavbarContext = createContext();

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};

export const NavbarProvider = ({ children }) => {
  const [navLinks, setNavLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch nav links from API
  const fetchNavLinks = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check localStorage cache first (unless force refresh)
      if (!forceRefresh) {
        const cached = localStorage.getItem('navLinks');
        const cacheTime = localStorage.getItem('navLinksTime');
        
        if (cached && cacheTime) {
          const cacheAge = Date.now() - parseInt(cacheTime);
          // Cache valid for 5 minutes
          if (cacheAge < 5 * 60 * 1000) {
            setNavLinks(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }
      }

      // Fetch from API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/navbar`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setNavLinks(data);
        // Update cache
        localStorage.setItem('navLinks', JSON.stringify(data));
        localStorage.setItem('navLinksTime', Date.now().toString());
        setLastUpdated(new Date());
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      console.error('Failed to fetch nav links:', err);
      setError(err.message);
      // Fallback to cache if available
      const cached = localStorage.getItem('navLinks');
      if (cached) {
        setNavLinks(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new link
  const addNavLink = async (linkData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/navbar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(linkData)
      });
      const newLink = await response.json();
      
      // Update state and cache
      const updatedLinks = [...navLinks, newLink];
      setNavLinks(updatedLinks);
      localStorage.setItem('navLinks', JSON.stringify(updatedLinks));
      localStorage.setItem('navLinksTime', Date.now().toString());
      
      return newLink;
    } catch (err) {
      throw err;
    }
  };

  // Update link
  const updateNavLink = async (id, linkData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/navbar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(linkData)
      });
      const updatedLink = await response.json();
      
      // Update state and cache
      const updatedLinks = navLinks.map(link => 
        link._id === id ? updatedLink : link
      );
      setNavLinks(updatedLinks);
      localStorage.setItem('navLinks', JSON.stringify(updatedLinks));
      localStorage.setItem('navLinksTime', Date.now().toString());
      
      return updatedLink;
    } catch (err) {
      throw err;
    }
  };

  // Delete link
  const deleteNavLink = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/navbar/${id}`, {
        method: 'DELETE'
      });
      
      // Update state and cache
      const updatedLinks = navLinks.filter(link => link._id !== id);
      setNavLinks(updatedLinks);
      localStorage.setItem('navLinks', JSON.stringify(updatedLinks));
      localStorage.setItem('navLinksTime', Date.now().toString());
    } catch (err) {
      throw err;
    }
  };

  // Reorder links
  const reorderLinks = async (items) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/navbar/reorder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      const updatedLinks = await response.json();
      
      // Update state and cache
      setNavLinks(updatedLinks);
      localStorage.setItem('navLinks', JSON.stringify(updatedLinks));
      localStorage.setItem('navLinksTime', Date.now().toString());
      
      return updatedLinks;
    } catch (err) {
      throw err;
    }
  };

  // Get links by category
  const getLinksByCategory = (category) => {
    return navLinks.filter(link => link.category === category && link.isActive);
  };

  // Get categories
  const getCategories = () => {
    const categories = [...new Set(navLinks.map(link => link.category))];
    return categories.sort();
  };

  // Initial fetch
  useEffect(() => {
    fetchNavLinks();
  }, [fetchNavLinks]);

  const value = {
    navLinks,
    loading,
    error,
    lastUpdated,
    fetchNavLinks,
    addNavLink,
    updateNavLink,
    deleteNavLink,
    reorderLinks,
    getLinksByCategory,
    getCategories
  };

  return (
    <NavbarContext.Provider value={value}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
