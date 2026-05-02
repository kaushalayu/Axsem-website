import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { normalizeText, normalizeObject } from '../utils/textUtils';

const CompanyContext = createContext();

const normalizeService = (service) => ({
  ...service,
  title: normalizeText(service.title),
  desc: normalizeText(service.desc),
  description: normalizeText(service.description),
});

const normalizeCompanyInfo = (info) => {
  if (!info) return null;
  return {
    ...info,
    companyName: normalizeText(info.companyName),
    address: normalizeText(info.address),
    email: normalizeText(info.email),
    phone: normalizeText(info.phone),
  };
};

export function CompanyProvider({ children }) {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'Axsem Softwares',
    email: 'info@Axsemsoftwares.com',
    phone: '+91 7860291285',
    address: 'New Delhi, India',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    github: '',
    youtube: ''
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanyInfo = useCallback(async () => {
    try {
      const data = await api.getCompanyInfo();
      if (data) setCompanyInfo(normalizeCompanyInfo(data));
    } catch (err) {
      console.error('Failed to load company info:', err);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const data = await api.getServices();
      if (data && Array.isArray(data)) {
        setServices(data.map(normalizeService));
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    }
  }, []);

  const refreshCompanyInfo = useCallback(async () => {
    await fetchCompanyInfo();
  }, [fetchCompanyInfo]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCompanyInfo(), fetchServices()]);
      setLoading(false);
    };
    loadData();
  }, [fetchCompanyInfo, fetchServices]);

  return (
    <CompanyContext.Provider value={{
      companyInfo,
      services,
      loading,
      refreshCompanyInfo,
      fetchServices
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within CompanyProvider');
  }
  return context;
}
