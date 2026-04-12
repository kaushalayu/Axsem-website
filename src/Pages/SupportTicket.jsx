import { useState } from "react"
import { Link } from "react-router-dom"
import { 
  FiArrowLeft, FiSend, FiCheck, FiUser, FiMail, FiPhone, 
  FiHelpCircle, FiAlertCircle, FiFile, FiClock, FiZap,
  FiMessageSquare, FiAlertTriangle, FiHeadphones
} from "react-icons/fi"
import { api } from "../services/api"
import PageHero from "../Components/PageHero"
import "../Styles/SupportTicket.css"

const TICKET_PRIORITIES = [
  { value: "", label: "Select Priority" },
  { value: "low", label: "Low - General Inquiry" },
  { value: "medium", label: "Medium - Issue Affecting Work" },
  { value: "high", label: "High - Major Issue" },
  { value: "urgent", label: "Urgent - System Down" },
]

const TICKET_CATEGORIES = [
  { value: "", label: "Select Category" },
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing / Payment" },
  { value: "feature", label: "Feature Request" },
  { value: "feedback", label: "Feedback" },
  { value: "complaint", label: "Complaint" },
  { value: "other", label: "Other" },
]

export default function SupportTicket() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    clientId: "",
    priority: "",
    category: "",
    subject: "",
    description: "",
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
    if (!formData.category)
      newErrors.category = "Please select a category"
    if (!formData.subject.trim())
      newErrors.subject = "Subject is required"
    if (formData.subject.length < 10)
      newErrors.subject = "Subject must be at least 10 characters"
    if (!formData.description.trim())
      newErrors.description = "Description is required"
    if (formData.description.length < 20)
      newErrors.description = "Please provide more details (min 20 chars)"
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
        email: formData.email,
        phone: formData.mobile,
        subject: formData.subject,
        message: `Category: ${formData.category}\nPriority: ${formData.priority || 'Not specified'}\nClient ID: ${formData.clientId || 'N/A'}\n\nDescription: ${formData.description}`,
        source: 'support_ticket'
      }
      
      await api.addInquiry(submitData)
      setSubmitSuccess(true)
    } catch (error) {
      setErrors({ submit: "Submission failed. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="st-success-page">
        <div className="st-success-container">
          <div className="st-success-icon">
            <FiCheck />
          </div>
          <h1>Ticket Submitted!</h1>
          <p>Your support ticket has been received.</p>
          <div className="st-success-details">
            <p>Ticket ID: <strong>#TKT-{Date.now().toString().slice(-6)}</strong></p>
            <p>We'll respond within 24 hours.</p>
            <div className="st-success-contact">
              <span><FiMail /> {formData.email}</span>
              <span><FiPhone /> {formData.mobile}</span>
            </div>
          </div>
          <div className="st-success-actions">
            <Link to="/" className="st-btn-primary">Back to Home</Link>
            <Link to="/contact" className="st-btn-outline">Contact Support</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="st-page">
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Support" }, { label: "Raise Ticket" }]}
        pill="Support"
        title={<>Raise a <span className="ph-gradient">Support Ticket</span></>}
        subtitle="Having an issue? We're here to help. Submit a ticket."
        tag="Support Ticket"
      />

      <div className="st-container">
        {/* Form Section */}
        <div className="st-form-section">
          <div className="st-form-card">
            <div className="st-form-header">
              <div className="st-header-icon">
                <FiMessageSquare />
              </div>
              <div>
                <h2>Submit Your Request</h2>
                <p>Fill in the details below and we'll get back to you</p>
              </div>
            </div>

            <form className="st-form" onSubmit={handleSubmit}>
              <div className="st-form-grid">
                <div className="st-form-group">
                  <label>Full Name <span className="st-required">*</span></label>
                  <div className="st-input-wrapper">
                    <div className="st-input-icon"><FiUser /></div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className={errors.fullName ? 'st-error' : ''}
                    />
                  </div>
                  {errors.fullName && <span className="st-field-error"><FiAlertCircle /> {errors.fullName}</span>}
                </div>

                <div className="st-form-group">
                  <label>Email Address <span className="st-required">*</span></label>
                  <div className="st-input-wrapper">
                    <div className="st-input-icon"><FiMail /></div>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={errors.email ? 'st-error' : ''}
                    />
                  </div>
                  {errors.email && <span className="st-field-error"><FiAlertCircle /> {errors.email}</span>}
                </div>

                <div className="st-form-group">
                  <label>Mobile Number <span className="st-required">*</span></label>
                  <div className="st-input-wrapper">
                    <div className="st-input-icon"><FiPhone /></div>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={formData.mobile}
                      onChange={(e) => updateField('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={errors.mobile ? 'st-error' : ''}
                    />
                  </div>
                  {errors.mobile && <span className="st-field-error"><FiAlertCircle /> {errors.mobile}</span>}
                </div>

                <div className="st-form-group">
                  <label>Client ID <span className="st-optional">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="AXS-12345"
                    value={formData.clientId}
                    onChange={(e) => updateField('clientId', e.target.value.toUpperCase())}
                  />
                </div>

                <div className="st-form-group">
                  <label>Category <span className="st-required">*</span></label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className={errors.category ? 'st-error' : ''}
                  >
                    {TICKET_CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  {errors.category && <span className="st-field-error"><FiAlertCircle /> {errors.category}</span>}
                </div>

                <div className="st-form-group">
                  <label>Priority <span className="st-optional">(optional)</span></label>
                  <select
                    value={formData.priority}
                    onChange={(e) => updateField('priority', e.target.value)}
                  >
                    {TICKET_PRIORITIES.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="st-form-group st-full">
                  <label>Subject <span className="st-required">*</span></label>
                  <input
                    type="text"
                    placeholder="Brief summary of your issue"
                    value={formData.subject}
                    onChange={(e) => updateField('subject', e.target.value.slice(0, 200))}
                    className={errors.subject ? 'st-error' : ''}
                  />
                  {errors.subject && <span className="st-field-error"><FiAlertCircle /> {errors.subject}</span>}
                </div>

                <div className="st-form-group st-full">
                  <label>Description <span className="st-required">*</span></label>
                  <textarea
                    placeholder="Describe your issue in detail..."
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value.slice(0, 2000))}
                    rows={5}
                    className={errors.description ? 'st-error' : ''}
                  />
                  <span className="st-char-count">{formData.description.length}/2000</span>
                  {errors.description && <span className="st-field-error"><FiAlertCircle /> {errors.description}</span>}
                </div>
              </div>

              <label className="st-terms-checkbox">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateField('agreeTerms', e.target.checked)}
                />
                <span className="st-checkbox-custom"></span>
                <span>
                  I agree to the <Link to="/terms" target="_blank">Terms</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="st-field-error"><FiAlertCircle /> {errors.agreeTerms}</span>
              )}

              {errors.submit && (
                <div className="st-submit-error">
                  <FiAlertCircle /> {errors.submit}
                </div>
              )}

              <div className="st-form-actions">
                <Link to="/" className="st-btn-outline">
                  <FiArrowLeft /> Cancel
                </Link>
                <button type="submit" className="st-btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="st-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Ticket <FiSend />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Side Info Section */}
        <div className="st-info-section">
          <div className="st-info-card">
            <div className="st-info-header">
              <div className="st-info-icon">
                <FiHeadphones />
              </div>
              <h3>Need Quick Help?</h3>
            </div>
            
            <div className="st-help-options">
              <Link to="/faq" className="st-help-link">
                <FiFile /> Check our FAQ
              </Link>
              <Link to="/blogs" className="st-help-link">
                <FiFile /> Browse Knowledge Base
              </Link>
            </div>

            <div className="st-contact-card">
              <h4>For urgent issues:</h4>
              <strong>+91 98765 43210</strong>
            </div>

            <div className="st-hours-card">
              <h4><FiClock /> Support Hours</h4>
              <ul>
                <li>Mon - Fri: 10 AM - 7 PM</li>
                <li>Saturday: 10 AM - 2 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
