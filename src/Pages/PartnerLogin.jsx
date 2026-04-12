import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { 
  FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiArrowRight, 
  FiTrendingUp, FiDollarSign, FiFileText, FiShield,
  FiCheck, FiUser, FiUsers, FiCalendar, FiMapPin, FiPhone, FiAward
} from "react-icons/fi"
import { api } from "../services/api"
import "../Styles/PartnerLogin.css"

export default function PartnerLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
    setError("")
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter valid email"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setError("")

    try {
      const response = await api.partnerLogin(formData.email, formData.password)
      
      if (response.success && response.token) {
        localStorage.setItem("partnerToken", response.token)
        localStorage.setItem("partnerUser", JSON.stringify(response.data))
        navigate("/partner/dashboard")
      } else {
        setError(response.message || "Login failed")
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pl-page">
      <div className="pl-container">
        {/* Left Side - Form */}
        <div className="pl-card">
          <Link to="/" className="pl-back-link">
            <span>←</span> Back to Home
          </Link>
          
          <div className="pl-header">
            <div className="pl-logo-badge">
              <div className="pl-logo-icon">
                <FiAward />
              </div>
            </div>
            <span className="pl-portal-tag">Partner Portal</span>
            <h1>Welcome Back</h1>
            <p>Sign in to your partner account</p>
          </div>

          <form className="pl-form" onSubmit={handleSubmit}>
            {error && (
              <div className="pl-error-banner">
                <FiAlertCircle />
                <span>{error}</span>
              </div>
            )}

            <div className="pl-form-group">
              <label>Email Address</label>
              <div className="pl-input-wrapper">
                <div className="pl-input-icon-wrap">
                  <FiMail />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="partner@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <span className="pl-field-error">{errors.email}</span>
              )}
            </div>

            <div className="pl-form-group">
              <label>Password</label>
              <div className="pl-input-wrapper">
                <div className="pl-input-icon-wrap">
                  <FiLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="pl-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <span className="pl-field-error">{errors.password}</span>
              )}
            </div>

            <div className="pl-form-options">
              <label className="pl-remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/partner/forgot-password" className="pl-forgot">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="pl-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="pl-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="pl-footer">
            <p>Not a partner yet?</p>
            <Link to="/partner/register" className="pl-register-link">
              Register as Partner <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="pl-info">
          <div className="pl-info-gradient"></div>
          <div className="pl-info-content">
            <div className="pl-info-header">
              <h2>Partner Dashboard</h2>
              <p>Access your partner dashboard to manage referrals, track commissions, and grow your business.</p>
            </div>
            
            <div className="pl-stats-row">
              <div className="pl-mini-stat">
                <span className="pl-mini-stat-icon"><FiDollarSign /></span>
                <span className="pl-mini-stat-text">15% Commission</span>
              </div>
              <div className="pl-mini-stat">
                <span className="pl-mini-stat-icon"><FiUsers /></span>
                <span className="pl-mini-stat-text">500+ Partners</span>
              </div>
            </div>
            
            <div className="pl-features-grid">
              <div className="pl-feature-card">
                <div className="pl-feature-icon-wrap">
                  <FiTrendingUp />
                </div>
                <div>
                  <h4>Dashboard</h4>
                  <p>Track referrals and earnings</p>
                </div>
              </div>
              <div className="pl-feature-card">
                <div className="pl-feature-icon-wrap">
                  <FiDollarSign />
                </div>
                <div>
                  <h4>Commissions</h4>
                  <p>View and manage earnings</p>
                </div>
              </div>
              <div className="pl-feature-card">
                <div className="pl-feature-icon-wrap">
                  <FiFileText />
                </div>
                <div>
                  <h4>Documents</h4>
                  <p>Upload and manage files</p>
                </div>
              </div>
              <div className="pl-feature-card">
                <div className="pl-feature-icon-wrap">
                  <FiShield />
                </div>
                <div>
                  <h4>Secure</h4>
                  <p>Your data is protected</p>
                </div>
              </div>
            </div>

            <div className="pl-trust-badges">
              <div className="pl-trust-item">
                <FiCheck /> Trusted by 500+ partners
              </div>
              <div className="pl-trust-item">
                <FiCheck /> 24/7 Support
              </div>
              <div className="pl-trust-item">
                <FiCheck /> Instant payouts
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
