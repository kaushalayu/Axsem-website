import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi"
import { api } from "../../services/api"
import "../../Styles/Admin/Admin.css"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await api.login(email, password)
    
    if (result.success) {
      navigate("/admin")
    } else {
      setError(result.message || "Login failed")
    }
    setLoading(false)
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-page">
        <div className="login-brand">
          <div className="login-logo">
            <FiShield size={32} />
          </div>
        </div>
        
        <div className="admin-login-container">
          <div className="admin-login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to Admin Panel</p>
          </div>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            {error && <div className="admin-login-error">{error}</div>}
            
            <div className="input-group">
              <div className="input-icon">
                <FiMail />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="input-field"
                required
              />
            </div>
            
            <div className="input-group">
              <div className="input-icon">
                <FiLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
                required
              />
              <button 
                type="button" 
                className="input-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <button 
              type="submit" 
              className="admin-login-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loader"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <span>© 2024 AXSEM. All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
