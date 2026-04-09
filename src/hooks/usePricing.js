import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const DEFAULT_PRICING = {
  website: {
    basic: "₹25,000",
    standard: "₹50,000",
    dynamic: "₹90,000",
  },
  software: {
    basic: "₹50,000",
    premium: "₹2,00,000",
    custom: "Custom",
  },
  seo: {
    basic: "₹15,000",
    advanced: "₹35,000",
    local: "₹8,000",
  },
  socialMedia: {
    starter: "₹12,000",
    growth: "₹22,000",
    pro: "₹40,000",
  },
  branding: {
    starter: "₹10,000",
    pro: "₹35,000",
    enterprise: "₹18,000",
  },
  printDesign: {
    businessCards: "₹1,500",
    brochureFlyer: "₹4,000",
    bannersStandees: "₹3,000",
    stationery: "₹5,000",
    catalogue: "₹12,000",
    packaging: "₹8,000",
  },
  logo: {
    basic: "₹5,000",
    standard: "₹10,000",
    premium: "₹18,000",
  },
  packages: {
    basicSco: "₹15,000",
    advanceSco: "₹35,000",
    basicSoftware: "₹50,000",
    premiumSoftware: "₹2,00,000",
    standerdWebsite: "₹50,000",
    dynamicPage: "₹90,000",
    development: "₹25,000",
    logoDesign: "₹10,000",
    brand: "₹35,000",
    printDesign: "₹18,000",
  },
};

const DEFAULT_PRODUCT_PRICING = {
  hospital: {
    starter: { price: "₹2,999", per: "/month" },
    growth: { price: "₹6,499", per: "/month" },
    enterprise: { price: "Custom", per: "" },
  },
  aiAutomation: {
    starter: { price: "₹4,999", per: "/month" },
    scale: { price: "₹14,999", per: "/month" },
    enterprise: { price: "Custom", per: "" },
  },
  school: {
    small: { price: "₹1,999", per: "/month" },
    standard: { price: "₹4,499", per: "/month" },
    premium: { price: "₹8,999", per: "/month" },
  },
  hr: {
    basic: { price: "₹49", per: "/user/mo" },
    pro: { price: "₹89", per: "/user/mo" },
    enterprise: { price: "₹129", per: "/user/mo" },
  },
  ngo: {
    basic: { price: "₹1,499", per: "/month" },
    standard: { price: "₹3,999", per: "/month" },
    premium: { price: "₹7,499", per: "/month" },
  },
  hotel: {
    small: { price: "₹2,499", per: "/month" },
    standard: { price: "₹5,499", per: "/month" },
    fullSuite: { price: "₹9,999", per: "/month" },
  },
  restaurant: {
    starter: { price: "₹1,499", per: "/month" },
    pro: { price: "₹3,499", per: "/month" },
    chain: { price: "₹7,999", per: "/month" },
  },
  realEstate: {
    broker: { price: "₹1,999", per: "/month" },
    builder: { price: "₹7,999", per: "/month" },
    enterprise: { price: "Custom", per: "" },
  },
  crm: {
    starter: { price: "₹999", per: "/user/mo" },
    team: { price: "₹1,799", per: "/user/mo" },
    scale: { price: "₹2,499", per: "/user/mo" },
  },
};

let pricingCache = null;
let productPricingCache = null;

export function usePricing() {
  const [pricing, setPricing] = useState(DEFAULT_PRICING);
  const [productPricing, setProductPricing] = useState(DEFAULT_PRODUCT_PRICING);
  const [loading, setLoading] = useState(true);

  const fetchPricing = useCallback(async () => {
    try {
      const data = await api.getPricing();
      if (Array.isArray(data) && data.length > 0) {
        const priceMap = {};
        
        data.forEach(category => {
          category.plans.forEach(plan => {
            const key = plan.name.toLowerCase().replace(/\s+/g, '');
            if (category.category === 'Website') {
              if (key.includes('basic')) priceMap.website = { ...priceMap.website, basic: plan.price };
              if (key.includes('standard') && !key.includes('dynamic')) priceMap.website = { ...priceMap.website, standard: plan.price };
              if (key.includes('dynamic')) priceMap.website = { ...priceMap.website, dynamic: plan.price };
            }
            if (category.category === 'Software') {
              if (key.includes('basic') && !key.includes('enterprise')) priceMap.software = { ...priceMap.software, basic: plan.price };
              if (key.includes('premium') || key.includes('enterprise')) priceMap.software = { ...priceMap.software, premium: plan.price };
            }
            if (category.category === 'SEO') {
              if (key.includes('basic') && !key.includes('advanced')) priceMap.seo = { ...priceMap.seo, basic: plan.price };
              if (key.includes('advanced')) priceMap.seo = { ...priceMap.seo, advanced: plan.price };
              if (key.includes('local')) priceMap.seo = { ...priceMap.seo, local: plan.price };
            }
            if (category.category === 'Social Media') {
              if (key.includes('starter')) priceMap.socialMedia = { ...priceMap.socialMedia, starter: plan.price };
              if (key.includes('growth')) priceMap.socialMedia = { ...priceMap.socialMedia, growth: plan.price };
              if (key.includes('pro')) priceMap.socialMedia = { ...priceMap.socialMedia, pro: plan.price };
            }
            if (category.category === 'Design') {
              if (key.includes('logo')) priceMap.logo = { ...priceMap.logo, standard: plan.price };
              if (key.includes('brand') || key.includes('identity')) priceMap.branding = { ...priceMap.branding, pro: plan.price };
              if (key.includes('print') || key.includes('bundle')) priceMap.printDesign = { ...priceMap.printDesign, businessCards: plan.price };
            }
          });
        });

        pricingCache = priceMap;
        setPricing(prev => ({ ...prev, ...priceMap }));
      }
    } catch (error) {
      console.error('Error fetching pricing:', error);
    }
  }, []);

  const fetchProductPricing = useCallback(async () => {
    try {
      const data = await api.getProductPricing();
      if (Array.isArray(data) && data.length > 0) {
        const priceMap = {};
        data.forEach(product => {
          priceMap[product.productId] = {};
          product.tiers.forEach(tier => {
            const key = tier.name.toLowerCase();
            priceMap[product.productId][key] = {
              price: tier.price,
              per: tier.per,
              desc: tier.desc,
              features: tier.features,
              highlight: tier.highlight
            };
          });
        });
        productPricingCache = priceMap;
        setProductPricing(priceMap);
      }
    } catch (error) {
      console.error('Error fetching product pricing:', error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPricing(), fetchProductPricing()]);
      setLoading(false);
    };
    loadData();
  }, [fetchPricing, fetchProductPricing]);

  const getPrice = useCallback((category, plan) => {
    if (pricing[category]?.[plan]) {
      return pricing[category][plan];
    }
    return DEFAULT_PRICING[category]?.[plan] || "₹0";
  }, [pricing]);

  const getProductPrice = useCallback((product, tier) => {
    if (productPricing[product]?.[tier]) {
      return productPricing[product][tier];
    }
    return DEFAULT_PRODUCT_PRICING[product]?.[tier] || { price: "Custom", per: "" };
  }, [productPricing]);

  const getPricingByRoute = useCallback(async (route) => {
    try {
      const productId = route.replace('/products/', '');
      const data = await api.getProductPricingById(productId);
      return data;
    } catch (error) {
      console.error('Error fetching pricing by route:', error);
      return null;
    }
  }, []);

  return {
    pricing,
    productPricing,
    loading,
    getPrice,
    getProductPrice,
    getPricingByRoute,
    refetch: fetchPricing,
  };
}

export default usePricing;
