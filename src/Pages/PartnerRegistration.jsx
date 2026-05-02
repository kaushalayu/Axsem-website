import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { FiArrowLeft, FiArrowRight, FiCheck, FiSend, FiUpload, FiX, FiFile, FiAlertCircle } from "react-icons/fi"
import { api } from "../services/api"
import { useToast } from "../Components/Toast"
import PageHero from "../Components/PageHero"
import OtpModal from "../Components/OtpModal"
import FileUpload from "../Components/FileUpload"
import "../Styles/PartnerRegistration.css"

const BUSINESS_TYPES = [
  { value: "", label: "Select Business Type" },
  { value: "individual", label: "Individual / Freelancer" },
  { value: "proprietorship", label: "Sole Proprietorship" },
  { value: "partnership", label: "Partnership Firm" },
  { value: "private_ltd", label: "Private Limited Company" },
  { value: "llp", label: "LLP" },
  { value: "corporate", label: "Corporate / Enterprise" },
]

const PARTNERSHIP_AREAS = [
  { value: "web_development", label: "Web Development" },
  { value: "mobile_apps", label: "Mobile App Development" },
  { value: "digital_marketing", label: "Digital Marketing" },
  { value: "seo", label: "SEO Services" },
  { value: "it_services", label: "IT Services" },
  { value: "consulting", label: "Consulting" },
  { value: "design", label: "Design Services" },
  { value: "hosting", label: "Hosting & Domain" },
]

const STEPS = [
  { id: 1, title: "Basic Info", icon: "01" },
  { id: 2, title: "Business Details", icon: "02" },
  { id: 3, title: "Partnership", icon: "03" },
  { id: 4, title: "Documents", icon: "04" },
  { id: 5, title: "Review", icon: "05" },
]

export default function PartnerRegistration() {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    businessType: "",
    city: "",
    state: "",
    website: "",
    gstin: "",
    aadharPan: "",
    partnershipAreas: [],
    experience: "",
    message: "",
    documents: [],
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [otpModal, setOtpModal] = useState({ show: false, type: null, value: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const formRef = useRef(null)

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const togglePartnershipArea = (value) => {
    setFormData(prev => ({
      ...prev,
      partnershipAreas: prev.partnershipAreas.includes(value)
        ? prev.partnershipAreas.filter(v => v !== value)
        : [...prev.partnershipAreas, value]
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.companyName.trim() || formData.companyName.length < 3)
        newErrors.companyName = "Company name required (min 3 chars)"
      if (!formData.contactPerson.trim())
        newErrors.contactPerson = "Contact person name required"
      if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.replace(/\D/g, '')))
        newErrors.mobile = "Valid 10-digit mobile number required"
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Valid email address required"
    }

    if (step === 2) {
      if (!formData.businessType)
        newErrors.businessType = "Please select business type"
      if (!formData.city.trim())
        newErrors.city = "City is required"
      if (!formData.state.trim())
        newErrors.state = "State is required"
      if (formData.website && !/^https?:\/\/.+/.test(formData.website))
        newErrors.website = "Enter valid URL (e.g., https://example.com)"
      if (formData.gstin && !/^[0-9A-Z]{15}$/.test(formData.gstin.toUpperCase()))
        newErrors.gstin = "Enter valid 15-character GSTIN"
      if (!formData.aadharPan.trim())
        newErrors.aadharPan = "Aadhar/PAN number required"
    }

    if (step === 3) {
      if (formData.partnershipAreas.length === 0)
        newErrors.partnershipAreas = "Select at least one partnership area"
    }

    if (step === 4) {
      if (formData.documents.length === 0)
        newErrors.documents = "Please upload at least one document"
    }

    if (step === 5) {
      if (!formData.agreeTerms)
        newErrors.agreeTerms = "You must agree to terms & conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSendOtp = (type) => {
    const value = type === 'mobile' ? formData.mobile : formData.email
    if (value) {
      setOtpModal({ show: true, type, value })
    }
  }

  const handleOtpVerified = () => {
    setOtpModal({ show: false, type: null, value: "" })
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setIsSubmitting(true)

    try {
      const submitData = {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        mobile: formData.mobile,
        email: formData.email,
        password: `Axsem${Date.now().toString(36)}`,
        businessType: formData.businessType,
        city: formData.city,
        state: formData.state,
        website: formData.website,
        gstin: formData.gstin,
        aadharPan: formData.aadharPan,
        partnershipAreas: formData.partnershipAreas,
        experience: formData.experience,
        message: formData.message,
        documents: formData.documents.map(d => ({ name: d.name, url: d.url || '', type: d.type, size: d.size }))
      }

      const response = await api.partnerRegister(submitData)

      if (response.success) {
        setSubmitSuccess(true)
        addToast("Registration submitted! We'll verify and contact you soon.", "success")
      } else {
        setErrors({ submit: response.message || "Registration failed" })
        addToast(response.message || "Registration failed", "error")
      }
    } catch (error) {
      setErrors({ submit: error.message || "Failed to submit. Please try again." })
      addToast(error.message || "Failed to submit. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="pr-success-page">
        <div className="pr-success-container">
          <div className="pr-success-icon">
            <FiCheck />
          </div>
          <h1>Registration Submitted!</h1>
          <p>Thank you for partnering with Axsem Softwares.</p>
          <div className="pr-success-details">
            <p>Your application is under review. You'll receive updates via:</p>
            <div className="pr-success-contact">
              <span>📧 {formData.email}</span>
              <span>📱 {formData.mobile}</span>
            </div>
            <p className="pr-success-note">Our team will review your application within 2-3 business days.</p>
          </div>
          <div className="pr-success-actions">
            <Link to="/" className="pr-btn-primary">Back to Home</Link>
            <Link to="/contact" className="pr-btn-outline">Contact Support</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pr-page">
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partner With Us" }]}
        pill="Partnership"
        title={<>Join Our <span className="ph-gradient">Partner Network</span></>}
        subtitle="Partner with Axsem Softwares and grow your business together. Earn commissions by referring clients."
        tag="Partner Registration"
      />

      <div className="pr-container">
        {/* Progress Steps */}
        <div className="pr-progress">
          <div className="pr-progress-bar">
            <div
              className="pr-progress-fill"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          <div className="pr-steps">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`pr-step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              >
                <div className="pr-step-circle">
                  {currentStep > step.id ? <FiCheck /> : step.icon}
                </div>
                <span className="pr-step-title">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="pr-form" ref={formRef}>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="pr-step-content">
              <h2 className="pr-step-heading">Basic Information</h2>
              <p className="pr-step-desc">Tell us about yourself or your company</p>

              <div className="pr-form-grid">
                <div className="pr-form-group">
                  <label>Full Name / Company Name <span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter company or individual name"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className={errors.companyName ? 'error' : ''}
                  />
                  {errors.companyName && <span className="pr-error"><FiAlertCircle /> {errors.companyName}</span>}
                </div>

                <div className="pr-form-group">
                  <label>Contact Person Name <span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="Who should we contact?"
                    value={formData.contactPerson}
                    onChange={(e) => updateField('contactPerson', e.target.value)}
                    className={errors.contactPerson ? 'error' : ''}
                  />
                  {errors.contactPerson && <span className="pr-error"><FiAlertCircle /> {errors.contactPerson}</span>}
                </div>

                <div className="pr-form-group pr-otp-group">
                  <label>Mobile Number <span className="required">*</span></label>
                  <div className="pr-otp-input-wrapper">
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile"
                      value={formData.mobile}
                      onChange={(e) => updateField('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={errors.mobile ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="pr-otp-btn"
                      onClick={() => handleSendOtp('mobile')}
                      disabled={!formData.mobile || formData.mobile.length !== 10}
                    >
                      <FiSend /> OTP
                    </button>
                  </div>
                  {errors.mobile && <span className="pr-error"><FiAlertCircle /> {errors.mobile}</span>}
                </div>

                <div className="pr-form-group pr-otp-group">
                  <label>Email Address <span className="required">*</span></label>
                  <div className="pr-otp-input-wrapper">
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={errors.email ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="pr-otp-btn"
                      onClick={() => handleSendOtp('email')}
                      disabled={!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                    >
                      <FiSend /> OTP
                    </button>
                  </div>
                  {errors.email && <span className="pr-error"><FiAlertCircle /> {errors.email}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Details */}
          {currentStep === 2 && (
            <div className="pr-step-content">
              <h2 className="pr-step-heading">Business Details</h2>
              <p className="pr-step-desc">Help us understand your business better</p>

              <div className="pr-form-grid">
                <div className="pr-form-group pr-full">
                  <label>Business Type <span className="required">*</span></label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => updateField('businessType', e.target.value)}
                    className={errors.businessType ? 'error' : ''}
                  >
                    {BUSINESS_TYPES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.businessType && <span className="pr-error"><FiAlertCircle /> {errors.businessType}</span>}
                </div>

                <div className="pr-form-group">
                  <label>City <span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter city name"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="pr-error"><FiAlertCircle /> {errors.city}</span>}
                </div>

                <div className="pr-form-group">
                  <label>State <span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter state name"
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="pr-error"><FiAlertCircle /> {errors.state}</span>}
                </div>

                <div className="pr-form-group">
                  <label>Website URL <span className="optional">(optional)</span></label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    className={errors.website ? 'error' : ''}
                  />
                  {errors.website && <span className="pr-error"><FiAlertCircle /> {errors.website}</span>}
                </div>

                <div className="pr-form-group">
                  <label>GSTIN Number <span className="optional">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="15-character GSTIN"
                    value={formData.gstin}
                    onChange={(e) => updateField('gstin', e.target.value.toUpperCase().slice(0, 15))}
                    className={errors.gstin ? 'error' : ''}
                    maxLength={15}
                  />
                  {errors.gstin && <span className="pr-error"><FiAlertCircle /> {errors.gstin}</span>}
                </div>

                <div className="pr-form-group">
                  <label>Aadhar / PAN Number <span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter Aadhar or PAN number"
                    value={formData.aadharPan}
                    onChange={(e) => updateField('aadharPan', e.target.value.toUpperCase())}
                    className={errors.aadharPan ? 'error' : ''}
                  />
                  {errors.aadharPan && <span className="pr-error"><FiAlertCircle /> {errors.aadharPan}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Partnership Areas */}
          {currentStep === 3 && (
            <div className="pr-step-content">
              <h2 className="pr-step-heading">Partnership Details</h2>
              <p className="pr-step-desc">Select the areas you're interested in partnering</p>

              <div className="pr-checkbox-grid">
                {PARTNERSHIP_AREAS.map(area => (
                  <label key={area.value} className="pr-checkbox-card">
                    <input
                      type="checkbox"
                      checked={formData.partnershipAreas.includes(area.value)}
                      onChange={() => togglePartnershipArea(area.value)}
                    />
                    <span className="pr-checkbox-custom"></span>
                    <span className="pr-checkbox-label">{area.label}</span>
                  </label>
                ))}
              </div>
              {errors.partnershipAreas && (
                <span className="pr-error"><FiAlertCircle /> {errors.partnershipAreas}</span>
              )}

              <div className="pr-form-grid" style={{ marginTop: '2rem' }}>
                <div className="pr-form-group">
                  <label>Experience in Years <span className="optional">(optional)</span></label>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.experience}
                    onChange={(e) => updateField('experience', e.target.value)}
                    min={0}
                    max={50}
                  />
                </div>

                <div className="pr-form-group">
                  <label>Message / Proposal <span className="optional">(optional)</span></label>
                  <textarea
                    placeholder="Tell us about your partnership ideas..."
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value.slice(0, 500))}
                    rows={4}
                  />
                  <span className="pr-char-count">{formData.message.length}/500</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <div className="pr-step-content">
              <h2 className="pr-step-heading">Upload Documents</h2>
              <p className="pr-step-desc">Upload required documents for verification</p>

              <FileUpload
                files={formData.documents}
                onFilesChange={(files) => updateField('documents', files)}
                maxSize={5}
                accept=".pdf,.jpg,.jpeg,.png"
                maxFiles={5}
              />
              {errors.documents && (
                <span className="pr-error"><FiAlertCircle /> {errors.documents}</span>
              )}

              <div className="pr-docs-info">
                <h4>Required Documents:</h4>
                <ul>
                  <li>Business Registration Certificate</li>
                  <li>PAN Card / Aadhar Card</li>
                  <li>Address Proof</li>
                  <li>Passport size photo</li>
                </ul>
                <p className="pr-docs-note">
                  <FiAlertCircle /> Accepted formats: PDF, JPG, PNG (Max 5MB each)
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="pr-step-content">
              <h2 className="pr-step-heading">Review & Submit</h2>
              <p className="pr-step-desc">Please review your information before submitting</p>

              <div className="pr-review-section">
                <div className="pr-review-card">
                  <h4>Basic Information</h4>
                  <div className="pr-review-grid">
                    <div className="pr-review-item">
                      <span className="label">Company Name</span>
                      <span className="value">{formData.companyName}</span>
                    </div>
                    <div className="pr-review-item">
                      <span className="label">Contact Person</span>
                      <span className="value">{formData.contactPerson}</span>
                    </div>
                    <div className="pr-review-item">
                      <span className="label">Mobile</span>
                      <span className="value">{formData.mobile}</span>
                    </div>
                    <div className="pr-review-item">
                      <span className="label">Email</span>
                      <span className="value">{formData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="pr-review-card">
                  <h4>Business Details</h4>
                  <div className="pr-review-grid">
                    <div className="pr-review-item">
                      <span className="label">Business Type</span>
                      <span className="value">{BUSINESS_TYPES.find(b => b.value === formData.businessType)?.label}</span>
                    </div>
                    <div className="pr-review-item">
                      <span className="label">Location</span>
                      <span className="value">{formData.city}, {formData.state}</span>
                    </div>
                    {formData.website && (
                      <div className="pr-review-item">
                        <span className="label">Website</span>
                        <span className="value">{formData.website}</span>
                      </div>
                    )}
                    {formData.gstin && (
                      <div className="pr-review-item">
                        <span className="label">GSTIN</span>
                        <span className="value">{formData.gstin}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pr-review-card">
                  <h4>Partnership Areas</h4>
                  <div className="pr-review-areas">
                    {formData.partnershipAreas.map(area => (
                      <span key={area} className="pr-area-tag">
                        {PARTNERSHIP_AREAS.find(a => a.value === area)?.label}
                      </span>
                    ))}
                  </div>
                  {formData.experience && (
                    <div className="pr-review-item" style={{ marginTop: '1rem' }}>
                      <span className="label">Experience</span>
                      <span className="value">{formData.experience} years</span>
                    </div>
                  )}
                </div>

                <div className="pr-review-card">
                  <h4>Documents</h4>
                  <div className="pr-review-docs">
                    {formData.documents.map((doc, i) => (
                      <div key={i} className="pr-review-doc">
                        <FiFile />
                        <span>{doc.name}</span>
                        <span className="pr-doc-size">({(doc.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <label className="pr-terms-checkbox">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateField('agreeTerms', e.target.checked)}
                />
                <span className="pr-checkbox-custom"></span>
                <span>
                  I agree to the <Link to="/terms" target="_blank">Terms & Conditions</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="pr-error"><FiAlertCircle /> {errors.agreeTerms}</span>
              )}

              {errors.submit && (
                <div className="pr-submit-error">
                  <FiAlertCircle /> {errors.submit}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pr-form-actions">
            {currentStep > 1 && (
              <button type="button" className="pr-btn-outline" onClick={handlePrev}>
                <FiArrowLeft /> Previous
              </button>
            )}

            {currentStep < 5 ? (
              <button type="button" className="pr-btn-primary" onClick={handleNext}>
                Next <FiArrowRight />
              </button>
            ) : (
              <button
                type="button"
                className="pr-btn-submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="pr-spinner"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <FiArrowRight />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* OTP Modal */}
      {otpModal.show && (
        <OtpModal
          type={otpModal.type}
          value={otpModal.value}
          onClose={() => setOtpModal({ show: false, type: null, value: "" })}
          onVerified={handleOtpVerified}
        />
      )}
    </div>
  )
}
