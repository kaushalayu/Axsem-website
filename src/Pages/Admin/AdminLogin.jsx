import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi"
import { api } from "../../services/api"
import { useToast } from "../../Components/Toast"
import "../../Styles/Admin/Admin.css"
import logo from "../../assets/Axsem.jpg"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await api.login(email, password)

      if (result.success) {
        addToast("Login successful! Welcome back.", "success")
        setTimeout(() => navigate("/admin"), 500)
      } else {
        setError(result.message || "Invalid credentials")
        addToast(result.message || "Invalid credentials", "error")
      }
    } catch (err) {
      setError(err.message)
      addToast(err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <img src={logo} alt="Axsem" className="admin-login-logo" />
          <h1>Axsem</h1>
          <span>Admin Panel</span>
        </div>

        <div className="admin-login-form-section">
          <h2>Welcome Back</h2>
          <p>Sign in to continue</p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="admin-login-error">
                <FiShield size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="admin-login-group">
              <label>Email</label>
              <div className="admin-login-input">
                <FiMail className="admin-login-input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="admin-login-group">
              <label>Password</label>
              <div className="admin-login-input">
                <FiLock className="admin-login-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="admin-login-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="admin-login-spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <div className="admin-login-footer">
          <p>© {new Date().getFullYear()} Axsem Softwares</p>
        </div>
      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 20px;
        }

        .admin-login-card {
          width: 100%;
          max-width: 420px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .admin-login-brand {
          background: linear-gradient(135deg, #f05a28 0%, #e5491e 100%);
          padding: 40px 30px;
          text-align: center;
        }

        .admin-login-logo {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(255, 255, 255, 0.3);
          margin-bottom: 16px;
        }

        .admin-login-brand h1 {
          color: white;
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: 3px;
          margin: 0 0 6px 0;
        }

        .admin-login-brand span {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .admin-login-form-section {
          padding: 36px 32px;
        }

        .admin-login-form-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 6px 0;
        }

        .admin-login-form-section p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0 0 28px 0;
        }

        .admin-login-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .admin-login-group {
          margin-bottom: 20px;
        }

        .admin-login-group label {
          display: block;
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
          margin-bottom: 8px;
        }

        .admin-login-input {
          position: relative;
        }

        .admin-login-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 1.1rem;
        }

        .admin-login-input input {
          width: 100%;
          padding: 14px 44px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .admin-login-input input:focus {
          outline: none;
          border-color: #f05a28;
          box-shadow: 0 0 0 3px rgba(240, 90, 40, 0.1);
        }

        .admin-login-input input::placeholder {
          color: #9ca3af;
        }

        .admin-login-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-login-toggle:hover {
          color: #f05a28;
        }

        .admin-login-btn {
          width: 100%;
          padding: 15px;
          background: #f05a28;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
        }

        .admin-login-btn:hover:not(:disabled) {
          background: #e5491e;
        }

        .admin-login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .admin-login-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .admin-login-footer {
          padding: 20px 32px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        .admin-login-footer p {
          color: #9ca3af;
          font-size: 0.8rem;
          margin: 0;
        }

        @media (max-width: 480px) {
          .admin-login-card {
            border-radius: 0;
            max-width: 100%;
            min-height: 100vh;
            box-shadow: none;
          }

          .admin-login-brand {
            padding: 32px 20px;
          }

          .admin-login-form-section {
            padding: 28px 20px;
          }
        }
      `}</style>
    </div>
  )
}
