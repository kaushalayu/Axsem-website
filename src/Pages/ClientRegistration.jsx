import { useState } from "react"
import { Link } from "react-router-dom"
import {
  FiArrowLeft, FiArrowRight, FiCheck, FiUser, FiMail, FiPhone,
  FiBriefcase, FiMessageSquare, FiAlertCircle, FiZap, FiClock,
  FiStar, FiGift, FiChevronRight, FiSend
} from "react-icons/fi"
import { api } from "../services/api"
import { useToast } from "../Components/Toast"
import PageHero from "../Components/PageHero"
import "../Styles/ClientRegistration.css"

export default function ClientRegistration() {
  const { addToast } = useToast()

const SERVICE_INTERESTS = [
  { value: "web_development", label: "Web Development" },
  { value: "mobile_apps", label: "Mobile App Development" },
  { value: "software", label: "Custom Software" },
  { value: "ui_ux", label: "UI/UX Design" },
  { value: "digital_marketing", label: "Digital Marketing" },
  { value: "seo", label: "SEO Services" },
  { value: "graphic_design", label: "Graphic Design" },
  { value: "it_support", label: "IT Support" },
]

const BUDGET_RANGES = [
  { value: "", label: "Select Budget Range" },
  { value: "under_50k", label: "Under ₹50,000" },
  { value: "50k_1lakh", label: "₹50,000 - ₹1 Lakh" },
  { value: "1lakh_5lakh", label: "₹1 Lakh - ₹5 Lakh" },
  { value: "5lakh_10lakh", label: "₹5 Lakh - ₹10 Lakh" },
  { value: "above_10lakh", label: "Above ₹10 Lakh" },
  { value: "not_sure", label: "Not Sure Yet" },
]

export default function ClientRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    mobile: "",
    city: "",
    serviceInterest: "",
    budget: "",
    message: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required"
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required"
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.replace(/\D/g, '')))
      newErrors.mobile = "Valid 10-digit mobile required"
    if (!formData.serviceInterest)
      newErrors.serviceInterest = "Please select a service"
    if (!formData.budget)
      newErrors.budget = "Please select a budget range"
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const submitData = {
        name: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.mobile,
        city: formData.city,
        serviceInterest: formData.serviceInterest,
        budget: formData.budget,
        message: formData.message,
        source: 'client_registration'
      }

      await api.addInquiry(submitData)
      setSubmitSuccess(true)
      addToast("Registration submitted! Our team will contact you soon.", "success")
    } catch (error) {
      setErrors({ submit: "Submission failed. Please try again." })
      addToast(error.message || "Submission failed. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="cr-success-page">
        <div className="cr-success-container">
          <div className="cr-success-icon">
            <FiCheck />
          </div>
          <h1>Registration Successful!</h1>
          <p>Thank you for choosing Axsem Softwares.</p>
          <div className="cr-success-details">
            <p>Our team will contact you within 24 hours.</p>
            <div className="cr-success-contact">
              <span><FiMail /> {formData.email}</span>
              <span><FiPhone /> {formData.mobile}</span>
            </div>
          </div>
          <div className="cr-success-actions">
            <Link to="/" className="cr-btn-primary">Back to Home</Link>
            <Link to="/contact" className="cr-btn-outline">Contact Support</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cr-page">
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Client Registration" }]}
        pill="Registration"
        title={<>Register as a <span className="ph-gradient">Client</span></>}
        subtitle="Get started with Axsem Softwares. Tell us about your project."
        tag="Client Registration"
      />

      <div className="cr-container">
        {/* Form Section */}
        <div className="cr-form-section">
          <div className="cr-form-card">
            <div className="cr-form-header">
              <div className="cr-header-icon">
                <FiSend />
              </div>
              <div>
                <h2>Get Started</h2>
                <p>Tell us about yourself and your project needs</p>
              </div>
            </div>

            <form className="cr-form" onSubmit={handleSubmit}>
              <div className="cr-form-grid">
                <div className="cr-form-group">
                  <label>Full Name <span className="cr-required">*</span></label>
                  <div className="cr-input-wrapper">
                    <div className="cr-input-icon"><FiUser /></div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className={errors.fullName ? 'cr-error' : ''}
                    />
                  </div>
                  {errors.fullName && <span className="cr-field-error"><FiAlertCircle /> {errors.fullName}</span>}
                </div>

                <div className="cr-form-group">
                  <label>Company Name <span className="cr-optional">(optional)</span></label>
                  <div className="cr-input-wrapper">
                    <div className="cr-input-icon"><FiBriefcase /></div>
                    <input
                      type="text"
                      placeholder="Your Company"
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="cr-form-group">
                  <label>Email Address <span className="cr-required">*</span></label>
                  <div className="cr-input-wrapper">
                    <div className="cr-input-icon"><FiMail /></div>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={errors.email ? 'cr-error' : ''}
                    />
                  </div>
                  {errors.email && <span className="cr-field-error"><FiAlertCircle /> {errors.email}</span>}
                </div>

                <div className="cr-form-group">
                  <label>Mobile Number <span className="cr-required">*</span></label>
                  <div className="cr-input-wrapper">
                    <div className="cr-input-icon"><FiPhone /></div>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={formData.mobile}
                      onChange={(e) => updateField('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={errors.mobile ? 'cr-error' : ''}
                    />
                  </div>
                  {errors.mobile && <span className="cr-field-error"><FiAlertCircle /> {errors.mobile}</span>}
                </div>

                <div className="cr-form-group">
                  <label>City <span className="cr-optional">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                  />
                </div>

                <div className="cr-form-group">
                  <label>Service Interest <span className="cr-required">*</span></label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => updateField('serviceInterest', e.target.value)}
                    className={errors.serviceInterest ? 'cr-error' : ''}
                  >
                    <option value="">Select a Service</option>
                    {SERVICE_INTERESTS.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  {errors.serviceInterest && <span className="cr-field-error"><FiAlertCircle /> {errors.serviceInterest}</span>}
                </div>

                <div className="cr-form-group cr-full">
                  <label>Budget Range <span className="cr-required">*</span></label>
                  <select
                    value={formData.budget}
                    onChange={(e) => updateField('budget', e.target.value)}
                    className={errors.budget ? 'cr-error' : ''}
                  >
                    {BUDGET_RANGES.map(b => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                  {errors.budget && <span className="cr-field-error"><FiAlertCircle /> {errors.budget}</span>}
                </div>

                <div className="cr-form-group cr-full">
                  <label>Project Details <span className="cr-optional">(optional)</span></label>
                  <textarea
                    placeholder="Describe your project requirements..."
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value.slice(0, 1000))}
                    rows={4}
                  />
                  <span className="cr-char-count">{formData.message.length}/1000</span>
                </div>
              </div>

              <label className="cr-terms-checkbox">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateField('agreeTerms', e.target.checked)}
                />
                <span className="cr-checkbox-custom"></span>
                <span>
                  I agree to the <Link to="/terms" target="_blank">Terms</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="cr-field-error"><FiAlertCircle /> {errors.agreeTerms}</span>
              )}

              {errors.submit && (
                <div className="cr-submit-error">
                  <FiAlertCircle /> {errors.submit}
                </div>
              )}

              <div className="cr-form-actions">
                <Link to="/" className="cr-btn-outline">
                  <FiArrowLeft /> Cancel
                </Link>
                <button type="submit" className="cr-btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="cr-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit <FiArrowRight />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Side Info Section */}
        <div className="cr-info-section">
          <div className="cr-info-card">
            <h3>Why Register?</h3>

            <div className="cr-benefits">
              <div className="cr-benefit">
                <div className="cr-benefit-icon">
                  <FiZap />
                </div>
                <div>
                  <h4>Quick Response</h4>
                  <p>Get personalized quotes within 24 hours</p>
                </div>
              </div>

              <div className="cr-benefit">
                <div className="cr-benefit-icon">
                  <FiStar />
                </div>
                <div>
                  <h4>Priority Support</h4>
                  <p>Dedicated account manager for you</p>
                </div>
              </div>

              <div className="cr-benefit">
                <div className="cr-benefit-icon">
                  <FiClock />
                </div>
                <div>
                  <h4>Free Consultation</h4>
                  <p>30-minute free consultation included</p>
                </div>
              </div>

              <div className="cr-benefit">
                <div className="cr-benefit-icon">
                  <FiGift />
                </div>
                <div>
                  <h4>Exclusive Offers</h4>
                  <p>Access to special discounts</p>
                </div>
              </div>
            </div>

            <div className="cr-contact-box">
              <p>Need immediate assistance?</p>
              <Link to="/contact" className="cr-btn-primary">
                <FiPhone /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
