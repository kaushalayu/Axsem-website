import { useState } from "react"
import { FiLock, FiEye, FiEyeOff, FiSave } from "react-icons/fi"
import { api } from "../../services/api"
import { useToast } from "../../Components/Toast"

export default function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      addToast("New passwords do not match", "error")
      return
    }

    if (newPassword.length < 8) {
      addToast("Password must be at least 8 characters", "error")
      return
    }

    const hasUpper = /[A-Z]/.test(newPassword)
    const hasLower = /[a-z]/.test(newPassword)
    const hasNumber = /\d/.test(newPassword)
    const hasSpecial = /[@$!%*?&]/.test(newPassword)

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      addToast("Password must contain uppercase, lowercase, number, and special character", "error")
      return
    }

    setLoading(true)

    try {
      const result = await api.changePassword(currentPassword, newPassword)

      if (result.success) {
        addToast("Password updated successfully", "success")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        addToast(result.message || "Failed to update password", "error")
      }
    } catch (err) {
      addToast(err.message || "Failed to update password", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Change Password</h1>
      </div>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          <div className="admin-form-group">
            <label>Current Password *</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showCurrent ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="admin-form-group">
            <label>New Password *</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="admin-form-group">
            <label>Confirm New Password *</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px', color: '#666' }}>
            <strong>Password requirements:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
              <li>One special character (@$!%*?&)</li>
            </ul>
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            <FiSave /> {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
