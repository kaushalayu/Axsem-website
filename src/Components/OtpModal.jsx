import { useState, useRef, useEffect } from "react"
import { FiX, FiCheck, FiAlertCircle, FiRefreshCw } from "react-icons/fi"
import "../Styles/OtpModal.css"

export default function OtpModal({ type, value, onClose, onVerified }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(res => res - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)
    setError("")

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newOtp = [...otp]
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char
    })
    setOtp(newOtp)
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
  }

  const handleVerify = async () => {
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setError("Please enter complete 6-digit OTP")
      return
    }

    setIsVerifying(true)
    setError("")

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (otpValue === "123456" || otpValue === "000000") {
        setIsVerified(true)
        setTimeout(() => {
          onVerified()
        }, 1500)
      } else {
        setError("Invalid OTP. Please try again.")
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = () => {
    setIsResending(true)
    setResendTimer(30)
    setOtp(["", "", "", "", "", ""])
    setError("")
    
    setTimeout(() => {
      setIsResending(false)
    }, 1000)
  }

  const maskedValue = type === 'mobile' 
    ? `+91 ${value.slice(0, 3)}XXXX${value.slice(-2)}`
    : value.split('@')[0].slice(0, 3) + '***@' + value.split('@')[1]

  return (
    <div className="otp-modal-overlay" onClick={onClose}>
      <div className="otp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="otp-close" onClick={onClose}>
          <FiX />
        </button>

        {isVerified ? (
          <div className="otp-verified">
            <div className="otp-verified-icon">
              <FiCheck />
            </div>
            <h3>Verified!</h3>
            <p>Your {type} has been verified successfully.</p>
          </div>
        ) : (
          <>
            <div className="otp-header">
              <h3>Verify Your {type === 'mobile' ? 'Mobile Number' : 'Email'}</h3>
              <p>Enter the 6-digit code sent to</p>
              <span className="otp-value">{maskedValue}</span>
            </div>

            <div className="otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`otp-input ${error ? 'error' : ''}`}
                  disabled={isVerifying}
                />
              ))}
            </div>

            {error && (
              <div className="otp-error">
                <FiAlertCircle />
                <span>{error}</span>
              </div>
            )}

            <button 
              className="otp-verify-btn" 
              onClick={handleVerify}
              disabled={isVerifying || otp.join("").length !== 6}
            >
              {isVerifying ? (
                <>
                  <span className="otp-spinner"></span>
                  Verifying...
                </>
              ) : (
                <>
                  <FiCheck /> Verify OTP
                </>
              )}
            </button>

            <div className="otp-resend">
              {resendTimer > 0 ? (
                <p>Resend OTP in <span className="otp-timer">00:{resendTimer.toString().padStart(2, '0')}</span></p>
              ) : (
                <button 
                  className="otp-resend-btn" 
                  onClick={handleResend}
                  disabled={isResending}
                >
                  <FiRefreshCw className={isResending ? 'spinning' : ''} />
                  Resend OTP
                </button>
              )}
            </div>

            <p className="otp-note">
              <FiAlertCircle /> Demo OTP: Use <strong>123456</strong> or <strong>000000</strong> for testing
            </p>
          </>
        )}
      </div>
    </div>
  )
}
