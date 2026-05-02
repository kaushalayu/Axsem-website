import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  FiSearch, FiCheck, FiX, FiUser, FiMail, FiAlertCircle,
  FiShield, FiBriefcase, FiCalendar, FiTrendingUp,
  FiAlertTriangle, FiPhone, FiFileText, FiAward, FiUsers, FiClock
} from "react-icons/fi"
import { api } from "../services/api"
import { useToast } from "../Components/Toast"
import PageHero from "../Components/PageHero"
import "../Styles/EmployeeVerification.css"

export default function EmployeeVerification() {
  const { addToast } = useToast()
  const [searchData, setSearchData] = useState({
    employeeId: "",
    email: "",
  })
  const [errors, setErrors] = useState({})
  const [isSearching, setIsSearching] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const [stats, setStats] = useState({ total: 0, active: 0 })

  useEffect(() => {
    api.getEmployeeStats().then(res => {
      if (res.data) {
        setStats({ total: res.data.total || 0, active: res.data.active || 0 })
      }
    }).catch(() => { })
  }, [])

  const updateField = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const validateSearch = () => {
    const newErrors = {}

    if (!searchData.employeeId.trim() && !searchData.email.trim()) {
      newErrors.employeeId = "Enter Employee ID or Email"
      newErrors.email = "Enter Employee ID or Email"
    } else if (searchData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(searchData.email)) {
      newErrors.email = "Enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!validateSearch()) return

    setIsSearching(true)
    setVerificationResult(null)

    try {
      const response = await api.verifyEmployee(
        searchData.employeeId.trim() || null,
        searchData.email.trim() || null
      )

      if (response.success && response.found) {
        setVerificationResult({ found: true, employee: response.employee })
        addToast("Employee verified successfully!", "success")
      } else {
        setVerificationResult({ found: false })
        addToast("No matching employee found.", "error")
      }
    } catch (error) {
      setErrors({ submit: "Verification failed. Please try again." })
      addToast(error.message, "error")
    } finally {
      setIsSearching(false)
    }
  }

  const handleReset = () => {
    setSearchData({ employeeId: "", email: "" })
    setVerificationResult(null)
    setErrors({})
  }

  return (
    <div className="ev-page">
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Verify Employee" }]}
        pill="Verification"
        title={<>Employee <span className="ph-gradient">Verification</span></>}
        subtitle="Verify if someone claiming to be an Axsem employee is legitimate."
        tag="Employee Verification"
      />

      <div className="ev-container">
        {/* Left Column - Search & Results */}
        <div className="ev-left-col">
          {/* Search Card */}
          <div className="ev-search-card">
            <div className="ev-card-accent"></div>
            <div className="ev-search-header">
              <div className="ev-icon-box">
                <FiShield />
              </div>
              <div>
                <h2>Verify Employee</h2>
                <p>Enter Employee ID or Email to verify</p>
              </div>
            </div>

            <form className="ev-form" onSubmit={handleVerify}>
              <div className="ev-input-group">
                <div className="ev-input-card">
                  <div className="ev-input-icon"><FiBriefcase /></div>
                  <input
                    type="text"
                    placeholder="Enter Employee ID (e.g., AXS-EMP-001)"
                    value={searchData.employeeId}
                    onChange={(e) => updateField('employeeId', e.target.value.toUpperCase())}
                    className={errors.employeeId ? 'ev-error' : ''}
                  />
                </div>

                <div className="ev-divider-text">
                  <span>or</span>
                </div>

                <div className="ev-input-card">
                  <div className="ev-input-icon"><FiMail /></div>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    value={searchData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={errors.email ? 'ev-error' : ''}
                  />
                </div>
              </div>

              {errors.submit && (
                <div className="ev-error-banner">
                  <FiAlertCircle /> {errors.submit}
                </div>
              )}

              <div className="ev-form-actions">
                <button type="button" className="ev-btn-reset" onClick={handleReset}>
                  Reset
                </button>
                <button type="submit" className="ev-btn-verify" disabled={isSearching}>
                  {isSearching ? (
                    <>
                      <span className="ev-spinner"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <FiSearch /> Verify Now
                    </>
                  )}
                </button>
              </div>

              <div className="ev-form-note">
                <p>Enter Employee ID (e.g., AXS-EMP-001) or registered email to verify</p>
              </div>
            </form>
          </div>

          {/* Result Card */}
          {verificationResult && (
            <div className={`ev-result-card ${verificationResult.found ? 'ev-verified' : 'ev-not-verified'}`}>
              <div className="ev-result-banner">
                <div className="ev-result-icon">
                  {verificationResult.found ? <FiCheck /> : <FiX />}
                </div>
                <div className="ev-result-text">
                  <h3>{verificationResult.found ? 'Employee Verified!' : 'Not Found'}</h3>
                  <p>{verificationResult.found
                    ? 'This person is a verified Axsem employee.'
                    : 'No matching employee found.'}</p>
                </div>
              </div>

              {verificationResult.found && (
                <>
                  <div className="ev-employee-card">
                    <div className="ev-employee-header">
                      <div className="ev-avatar">
                        {verificationResult.employee.name.charAt(0)}
                      </div>
                      <div className="ev-employee-basic">
                        <h4>{verificationResult.employee.name}</h4>
                        <span>{verificationResult.employee.designation}</span>
                        <span className="ev-dept">{verificationResult.employee.department}</span>
                      </div>
                      <div className="ev-status-pill">
                        <FiCheck /> Verified
                      </div>
                    </div>

                    <div className="ev-details-grid">
                      <div className="ev-detail-item">
                        <span className="ev-detail-label">Employee ID</span>
                        <span className="ev-detail-value">{verificationResult.employee.employeeId}</span>
                      </div>
                      <div className="ev-detail-item">
                        <span className="ev-detail-label">Email</span>
                        <span className="ev-detail-value">{verificationResult.employee.email}</span>
                      </div>
                      <div className="ev-detail-item">
                        <span className="ev-detail-label">Phone</span>
                        <span className="ev-detail-value">{verificationResult.employee.phone}</span>
                      </div>
                      <div className="ev-detail-item">
                        <span className="ev-detail-label">Location</span>
                        <span className="ev-detail-value">{verificationResult.employee.location}</span>
                      </div>
                      <div className="ev-detail-item">
                        <span className="ev-detail-label">Joined On</span>
                        <span className="ev-detail-value">{new Date(verificationResult.employee.joiningDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="ev-detail-item">
                        <span className="ev-detail-label">Company</span>
                        <span className="ev-detail-value">Axsem Softwares</span>
                      </div>
                    </div>
                  </div>

                  <div className="ev-verification-stamp">
                    <FiShield />
                    <span>Verified on {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                  </div>
                </>
              )}

              {!verificationResult.found && (
                <div className="ev-not-found-content">
                  <div className="ev-warning-box">
                    <FiAlertTriangle />
                    <div>
                      <h4>Possible Reasons:</h4>
                      <ul>
                        <li>The Employee ID or Email may be incorrect</li>
                        <li>The person may no longer be employed with us</li>
                        <li>Spelling might differ from our records</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ev-help-options">
                    <p>Need assistance? Contact us:</p>
                    <Link to="/contact" className="ev-contact-btn">
                      <FiPhone /> Contact Support
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Info */}
        <div className="ev-right-col">
          {/* Why Verify Card */}
          <div className="ev-info-card ev-why-card">
            <div className="ev-card-icon">
              <FiShield />
            </div>
            <h3>Why Verify Employees?</h3>
            <p className="ev-info-desc">Protect your business from fraud and verify that individuals claiming to represent Axsem Softwares are genuinely part of our team.</p>

            <div className="ev-benefits-list">
              <div className="ev-benefit-item">
                <div className="ev-benefit-icon">
                  <FiShield />
                </div>
                <div>
                  <h4>Stay Protected</h4>
                  <p>Avoid scams from people pretending to be Axsem employees</p>
                </div>
              </div>

              <div className="ev-benefit-item">
                <div className="ev-benefit-icon">
                  <FiCheck />
                </div>
                <div>
                  <h4>Verify Authenticity</h4>
                  <p>Confirm if someone is a legitimate Axsem team member</p>
                </div>
              </div>

              <div className="ev-benefit-item">
                <div className="ev-benefit-icon">
                  <FiUsers />
                </div>
                <div>
                  <h4>Build Trust</h4>
                  <p>Ensure you're working with real Axsem professionals</p>
                </div>
              </div>

              <div className="ev-benefit-item">
                <div className="ev-benefit-icon">
                  <FiPhone />
                </div>
                <div>
                  <h4>Need Help?</h4>
                  <p>Contact us anytime for verification assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
