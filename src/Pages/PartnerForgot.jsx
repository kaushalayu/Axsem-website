import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiMail, FiArrowLeft, FiArrowRight, FiCheck, FiAlertCircle, FiLock, FiKey } from "react-icons/fi"
import { api } from "../services/api"
import "../Styles/PartnerForgot.css"

export default function PartnerForgot() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1=email, 2=otp, 3=reset, 4=success
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError("Email is required")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await api.partnerForgotPassword(email)
      
      if (response.success) {
        setStep(2)
      } else {
        setError(response.message || "Failed to send OTP")
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    if (!otp.trim() || otp.length !== 6) {
      setError("Enter valid 6-digit OTP")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await api.partnerVerifyOtp(email, otp)
      
      if (response.success) {
        setStep(3)
      } else {
        setError(response.message || "Invalid OTP")
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    
    if (!newPassword) {
      setError("New password is required")
      return
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await api.partnerResetPassword(email, otp, newPassword)
      
      if (response.success) {
        setStep(4)
      } else {
        setError(response.message || "Failed to reset password")
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resendOtp = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      const response = await api.partnerForgotPassword(email)
      if (response.success) {
        setError("OTP resent successfully")
      } else {
        setError(response.message || "Failed to resend OTP")
      }
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  // Success State
  if (step === 4) {
    return (
      <div className="pf-page">
        <div className="pf-container">
          <div className="pf-card">
            <div className="pf-success-icon">
              <FiCheck />
            </div>
            <h1>Password Reset!</h1>
            <p>Your password has been reset successfully.</p>
            
            <Link to="/partner/login" className="pf-back-btn">
              Sign In with New Password
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pf-page">
      <div className="pf-container">
        <div className="pf-card">
          <Link to="/partner/login" className="pf-back-link">
            <FiArrowLeft /> Back to Login
          </Link>
          
          <div className="pf-header">
            <div className="pf-logo-badge">
              <div className="pf-logo-icon">
                {step === 1 ? <FiMail /> : step === 2 ? <FiKey /> : <FiLock />}
              </div>
            </div>
            <span className="pf-portal-tag">Partner Portal</span>
            
            {step === 1 && (
              <>
                <h1>Forgot Password?</h1>
                <p>Enter your email address and we'll send you a link to reset your password.</p>
              </>
            )}
            
            {step === 2 && (
              <>
                <h1>Enter OTP</h1>
                <p>We've sent a 6-digit OTP to <strong>{email}</strong></p>
              </>
            )}
            
            {step === 3 && (
              <>
                <h1>Reset Password</h1>
                <p>Enter your new password below.</p>
              </>
            )}
          </div>

          {error && (
            <div className="pf-error-banner">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Email Form */}
          {step === 1 && (
            <form className="pf-form" onSubmit={handleEmailSubmit}>
              <div className="pf-form-group">
                <label>Email Address</label>
                <div className="pf-input-wrapper">
                  <div className="pf-input-icon">
                    <FiMail />
                  </div>
                  <input
                    type="email"
                    placeholder="partner@company.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className={error ? 'pf-error' : ''}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button type="submit" className="pf-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <span className="pf-spinner"></span>
                ) : (
                  <>
                    Send OTP
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP Form */}
          {step === 2 && (
            <form className="pf-form" onSubmit={handleOtpSubmit}>
              <div className="pf-form-group">
                <label>Enter 6-digit OTP</label>
                <div className="pf-input-wrapper">
                  <div className="pf-input-icon">
                    <FiKey />
                  </div>
                  <input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(""); }}
                    className={error ? 'pf-error' : ''}
                    maxLength={6}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button type="submit" className="pf-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <span className="pf-spinner"></span>
                ) : (
                  <>
                    Verify OTP
                    <FiArrowRight />
                  </>
                )}
              </button>

              <div className="pf-resend">
                <span>Didn't receive OTP? </span>
                <button type="button" onClick={resendOtp} disabled={isLoading}>Resend</button>
              </div>
            </form>
          )}

          {/* Step 3: New Password Form */}
          {step === 3 && (
            <form className="pf-form" onSubmit={handlePasswordReset}>
              <div className="pf-form-group">
                <label>New Password</label>
                <div className="pf-input-wrapper">
                  <div className="pf-input-icon">
                    <FiLock />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="pf-form-group">
                <label>Confirm Password</label>
                <div className="pf-input-wrapper">
                  <div className="pf-input-icon">
                    <FiLock />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                    className={error ? 'pf-error' : ''}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button type="submit" className="pf-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <span className="pf-spinner"></span>
                ) : (
                  <>
                    Reset Password
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pf-footer">
            <p>Remember your password?</p>
            <Link to="/partner/login" className="pf-login-link">
              Sign In <FiArrowRight />
            </Link>
          </div>
        </div>

        <div className="pf-info">
          <div className="pf-info-content">
            <h2>Need Help?</h2>
            <p>If you're having trouble resetting your password, contact our support team for assistance.</p>
            
            <div className="pf-help-list">
              <div className="pf-help-item">
                <FiCheck />
                <span>24/7 Support Available</span>
              </div>
              <div className="pf-help-item">
                <FiCheck />
                <span>Response within 1 hour</span>
              </div>
              <div className="pf-help-item">
                <FiCheck />
                <span>Dedicated partner support</span>
              </div>
            </div>

            <Link to="/contact" className="pf-contact-btn">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}