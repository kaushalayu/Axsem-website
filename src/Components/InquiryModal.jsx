import { useState, useEffect } from 'react';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useCompany } from '../contexts/CompanyContext';
import { api } from '../services/api';

const SERVICE_OPTIONS = [
  'Website Development',
  'Mobile App Development',
  'SEO Services',
  'Digital Marketing',
  'Graphic Design',
  'UI/UX Design',
  'Software Development',
  'E-Commerce',
  'Content Marketing',
  'Social Media Marketing'
];

const BUDGET_OPTIONS = [
  { value: '', label: 'Select Budget' },
  { value: '5000-10000', label: '₹5,000 - ₹10,000' },
  { value: '10000-25000', label: '₹10,000 - ₹25,000' },
  { value: '25000-50000', label: '₹25,000 - ₹50,000' },
  { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
  { value: '100000-250000', label: '₹1,00,000 - ₹2,50,000' },
  { value: '250000+', label: '₹2,50,000+' }
];

const InquiryModal = () => {
  const { services } = useCompany();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    budget: '',
    services: [],
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => { 
      document.body.style.overflow = ''; 
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const currentServices = prev.services || [];
      if (currentServices.includes(service)) {
        return { ...prev, services: currentServices.filter(s => s !== service) };
      } else {
        return { ...prev, services: [...currentServices, service] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const inquiryData = {
        ...formData,
        service: formData.services.join(', ')
      };
      await api.addInquiry(inquiryData);
      setNotification({ type: 'success', message: 'Thank you! We will contact you soon.' });
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ name: '', mobile: '', email: '', budget: '', services: [], message: '' });
        setNotification(null);
      }, 2000);
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to submit. Please try again.' });
    }
    setLoading(false);
  };

  const allServiceOptions = [...SERVICE_OPTIONS, ...services.map(s => typeof s.title === 'string' ? s.title : 'Service').filter(s => !SERVICE_OPTIONS.includes(s))];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="inquiry-modal-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '10px',
        overflow: 'hidden'
      }}
      onClick={handleOverlayClick}
    >
      <style>{`
        .inquiry-modal-wrapper {
          touch-action: none !important;
        }
        .inquiry-modal-wrapper * {
          touch-action: none !important;
        }
        .inquiry-modal-form {
          touch-action: pan-y !important;
          -webkit-overflow-scrolling: touch;
        }
        .inquiry-modal-form input, .inquiry-modal-form select, .inquiry-modal-form textarea, .inquiry-modal-form button {
          touch-action: manipulation !important;
        }
      `}</style>
      <div 
        className="inquiry-modal-form"
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '700px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          margin: '10px 0'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
            border: '1px solid #ddd',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: 'pointer',
            color: '#555',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #f05a28 0%, #e04d1f 100%)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)';
            e.currentTarget.style.color = '#555';
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
          }}
        >
          <FiX />
        </button>

        <h2 style={{
          margin: '0 0 24px 0',
          color: '#f05a28',
          fontSize: '26px',
          fontWeight: '600'
        }}>
          Inquiry About Service
        </h2>

        {notification && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: notification.type === 'success' ? '#d4edda' : '#f8d7da',
            color: notification.type === 'success' ? '#155724' : '#721c24',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {notification.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
                backgroundColor: '#fff'
              }}
            >
              {BUDGET_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333', fontSize: '13px' }}>
              Which Service You Want
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
              {allServiceOptions.map((service, index) => (
                <label
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 4px',
                    border: formData.services.includes(service) ? '2px solid #f05a28' : '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: formData.services.includes(service) ? '#fff5f0' : '#fff'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    style={{
                      marginRight: '8px',
                      width: '16px',
                      height: '16px',
                      accentColor: '#f05a28'
                    }}
                  />
                  <span style={{ fontSize: '11px' }}>{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <textarea
              name="message"
              placeholder="Description"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#f05a28',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '17px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;