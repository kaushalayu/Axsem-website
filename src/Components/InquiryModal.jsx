import { useState, useEffect } from 'react';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useCompany } from '../contexts/CompanyContext';
import { api } from '../services/api';

const InquiryModal = () => {
  const { services } = useCompany();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.addInquiry(formData);
      setNotification({ type: 'success', message: 'Thank you! We will contact you soon.' });
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ name: '', mobile: '', email: '', service: '', message: '' });
        setNotification(null);
      }, 2000);
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to submit. Please try again.' });
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{
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
      padding: '20px'
    }} onClick={() => setIsOpen(false)}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '36px',
        maxWidth: '520px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }} onClick={(e) => e.stopPropagation()}>
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
          <div style={{ marginBottom: '18px' }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '15px',
                boxSizing: 'border-box',
                backgroundColor: '#fff'
              }}
            >
              <option value="">Select Service</option>
              {services.map((service, index) => {
                const title = typeof service.title === 'string' ? service.title : 'Service';
                return (
                  <option key={service._id || title || index} value={title}>
                    {title}
                  </option>
                );
              })}
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '15px',
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
