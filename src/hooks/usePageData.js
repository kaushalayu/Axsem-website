import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function usePageData(slug, fallbackData) {
    const [data, setData] = useState({
        faqs: fallbackData.faqs || [],
        gallery: fallbackData.gallery || [],
        hero: fallbackData.hero || {},
        loading: true
    });

    useEffect(() => {
        async function fetchData() {
            try {
                // Slugs in DB usually start with /
                const searchSlug = slug.startsWith('/') ? slug.substring(1) : slug;
                // Our api.js likely has a getPageBySlug or similar. 
                // Looking at server.js: app.use('/api/pages', require('./routes/pages'));
                // And api.js: nothing for getPageBySlug specifically. Let's use fetch but clean it up.
                
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/pages/slug/${searchSlug}`);
                
                if (response.ok) {
                    const page = await response.json();
                    
                    // Extract FAQs
                    const faqSection = page.sections?.find(s => s.type === 'faq' && s.enabled);
                    const dynamicFaqs = faqSection?.content?.items?.map(item => ({
                        q: item.question,
                        a: item.answer
                    })) || fallbackData.faqs;

                    // Extract Gallery (Photos)
                    const gallerySection = page.sections?.find(s => s.type === 'gallery' && s.enabled);
                    const dynamicGallery = gallerySection?.content?.items?.map(item => ({
                        url: item.url,
                        alt: item.alt
                    })) || fallbackData.gallery;

                    // Extract Hero Image
                    const dynamicHero = page.hero?.enabled ? {
                        image: page.hero.backgroundImage,
                        title: page.hero.heading,
                        subtitle: page.hero.subheading
                    } : {};

                    setData({
                        faqs: dynamicFaqs,
                        gallery: dynamicGallery,
                        hero: dynamicHero,
                        loading: false
                    });
                } else {
                    setData(prev => ({ ...prev, loading: false }));
                }
            } catch (err) {
                console.error(`Error fetching page data for ${slug}:`, err);
                setData(prev => ({ ...prev, loading: false }));
            }
        }
        fetchData();
    }, [slug]);

    return data;
}
