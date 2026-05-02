import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom"
import {
  FiHome, FiUser, FiUsers, FiDollarSign, FiFile,
  FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX,
  FiSun, FiMoon, FiUserPlus, FiClock, FiBell, FiPlus, FiEye, FiEyeOff,
  FiCamera, FiUpload
} from "react-icons/fi"
import { api } from "../services/api"
import { useToast } from "../Components/Toast"
import "./PartnerDashboard.css"

const NAV_ITEMS = [
  { path: "/partner/dashboard", icon: FiHome, label: "Dashboard" },
  { path: "/partner/profile", icon: FiUser, label: "My Profile" },
  { path: "/partner/clients", icon: FiUsers, label: "My Clients" },
  { path: "/partner/commissions", icon: FiDollarSign, label: "Earnings" },
  { path: "/partner/documents", icon: FiFile, label: "Documents" },
  { path: "/partner/tickets", icon: FiMessageSquare, label: "Support" },
  { path: "/partner/settings", icon: FiSettings, label: "Settings" },
]

export default function PartnerDashboard() {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const fileInputRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [partner, setPartner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('partnerTheme') || 'light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("partnerToken")
    if (!token) {
      navigate("/partner/login")
      return
    }

    api.partnerVerify().then(response => {
      if (response.success && response.data) {
        setPartner(response.data)
        localStorage.setItem('partnerUser', JSON.stringify(response.data))
      }
      setLoading(false)
    }).catch((err) => {
      console.error('Verify error:', err)
      localStorage.removeItem("partnerToken")
      localStorage.removeItem("partnerUser")
      navigate("/partner/login")
      setLoading(false)
    })
  }, [navigate])

  useEffect(() => {
    localStorage.setItem('partnerTheme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem("partnerToken")
    localStorage.removeItem("partnerUser")
    navigate("/partner/login")
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      addToast('Please select an image file', 'error')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast('Image size must be less than 5MB', 'error')
      return
    }

    setUploading(true)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64Image = reader.result

        const response = await api.partnerUpdatePhoto(base64Image)
        if (response.success) {
          setPartner(prev => ({ ...prev, profilePhoto: base64Image }))
          localStorage.setItem('partnerUser', JSON.stringify({ ...partner, profilePhoto: base64Image }))
        }
        setUploading(false)
      }
      reader.onerror = () => {
        addToast('Error reading file', 'error')
        setUploading(false)
      }
    } catch (err) {
      addToast('Error uploading photo', 'error')
      setUploading(false)
    }
  }

  const isActive = (path) => location.pathname === path

  if (loading) {
    return (
      <div className="pd-layout" style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.3s' }}>
        <aside className="pd-sidebar" style={{ background: 'var(--bg-card)' }}>
          <div className="pd-sidebar-header">
            <div className="pd-logo">
              <div className="pd-logo-icon"></div>
              <div className="skeleton" style={{ width: 80, height: 16 }}></div>
            </div>
          </div>
          <div className="pd-user-card">
            <div className="skeleton" style={{ width: 42, height: 42, borderRadius: 10 }}></div>
            <div>
              <div className="skeleton" style={{ width: 100, height: 14, marginBottom: 6 }}></div>
              <div className="skeleton" style={{ width: 60, height: 12 }}></div>
            </div>
          </div>
          <nav className="pd-nav">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 40, borderRadius: 8, marginBottom: 4 }}></div>
            ))}
          </nav>
        </aside>
        <main className="pd-main">
          <div style={{ padding: '20px' }}>
            <div className="pd-stats-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="pd-stat-card">
                  <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 12 }}></div>
                  <div>
                    <div className="skeleton" style={{ width: 60, height: 12, marginBottom: 8 }}></div>
                    <div className="skeleton" style={{ width: 80, height: 20 }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pd-card" style={{ marginTop: 20 }}>
              <div className="skeleton" style={{ width: 150, height: 18, marginBottom: 16 }}></div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div className="skeleton" style={{ width: 120, height: 14, marginBottom: 6 }}></div>
                    <div className="skeleton" style={{ width: 80, height: 12 }}></div>
                  </div>
                  <div className="skeleton" style={{ width: 60, height: 24, borderRadius: 6 }}></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="pd-layout" style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.3s' }}>
      <header className="pd-mobile-header">
        <button className="pd-icon-btn" onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>
        <Link to="/partner/dashboard" className="pd-mobile-logo">
          {partner?.profilePhoto ? (
            <img src={partner.profilePhoto} alt="" style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} />
          ) : 'Axsem'}
        </Link>
        <button className="pd-icon-btn">
          <FiBell />
        </button>
      </header>

      {sidebarOpen && (
        <div className="pd-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`pd-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="pd-sidebar-header">
          <Link to="/partner/dashboard" className="pd-logo">
            <div className="pd-logo-icon">AX</div>
            <span>Partner Portal</span>
          </Link>
          <button className="pd-close-btn" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="pd-user-card">
          <div className="pd-avatar-wrapper">
            {partner?.profilePhoto ? (
              <img src={partner.profilePhoto} alt="Profile" className="pd-avatar-img" />
            ) : (
              <div className="pd-avatar">
                {partner?.contactPerson?.charAt(0) || partner?.companyName?.charAt(0) || 'P'}
              </div>
            )}
            <button
              className="pd-avatar-upload"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <div className="pd-spinner" style={{ width: 14, height: 14 }}></div>
              ) : (
                <FiCamera />
              )}
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />
          <div className="pd-user-info">
            <h4>{partner?.contactPerson || partner?.companyName}</h4>
            <span>{partner?.partnerId || 'Partner'}</span>
          </div>
        </div>

        <nav className="pd-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={isActive(item.path) ? 'active' : ''}
            >
              <item.icon />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pd-sidebar-footer">
          <button onClick={toggleTheme}>
            {theme === 'light' ? <FiMoon /> : <FiSun />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          <button onClick={handleLogout} className="pd-logout">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="pd-main">
        <Outlet context={{ partner, setPartner }} />
      </main>
    </div>
  )
}

export function DashboardPage() {
  const [stats, setStats] = useState({ clients: 0, earnings: 0, pending: 0, paid: 0 })
  const [recentClients, setRecentClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.partnerGetClients().catch(() => ({ data: [] })),
      api.partnerGetCommissions().catch(() => ({}))
    ]).then(([clientsRes, commissionsRes]) => {
      const clients = clientsRes.data || []
      setRecentClients(clients.slice(0, 5))
      setStats({
        clients: clients.length,
        earnings: commissionsRes.stats?.totalEarnings || 0,
        pending: commissionsRes.stats?.pendingPayout || 0,
        paid: (commissionsRes.stats?.totalEarnings || 0) - (commissionsRes.stats?.pendingPayout || 0)
      })
      setLoading(false)
    })
  }, [])

  const cards = [
    { label: "Total Clients", value: stats.clients, icon: FiUsers, color: "#3b82f6" },
    { label: "Total Earnings", value: `₹${stats.earnings.toLocaleString()}`, icon: FiDollarSign, color: "#10b981" },
    { label: "Pending Payout", value: `₹${stats.pending.toLocaleString()}`, icon: FiClock, color: "#f59e0b" },
    { label: "Paid Out", value: `₹${stats.paid.toLocaleString()}`, icon: FiDollarSign, color: "#8b5cf6" },
  ]

  return (
    <div className="pd-page">
      <div className="pd-page-header">
        <h1>Dashboard</h1>
        <Link to="/partner/clients" className="pd-btn-primary">
          <FiPlus /> Add Client
        </Link>
      </div>

      {loading ? (
        <div className="pd-loading-mini"><div className="pd-spinner"></div></div>
      ) : (
        <>
          <div className="pd-stats-grid">
            {cards.map((card, i) => (
              <div key={i} className="pd-stat-card" style={{ '--accent': card.color }}>
                <div className="pd-stat-icon"><card.icon /></div>
                <div className="pd-stat-info">
                  <span className="pd-stat-label">{card.label}</span>
                  <span className="pd-stat-value">{card.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pd-card">
            <h3>Recent Clients</h3>
            {recentClients.length === 0 ? (
              <p className="pd-empty-text">No clients added yet</p>
            ) : (
              <div className="pd-list">
                {recentClients.map((client, i) => (
                  <div key={i} className="pd-list-item">
                    <div className="pd-list-info">
                      <span className="pd-list-title">{client.clientName || client.companyName}</span>
                      <span className="pd-list-sub">{client.email}</span>
                    </div>
                    <span className={`pd-badge ${client.status || 'active'}`}>{client.status || 'Active'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export function ClientsPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ clientName: "", companyName: "", email: "", mobile: "", product: "", notes: "" })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = () => {
    api.partnerGetClients().then(res => {
      setClients(res.data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const handleAdd = async () => {
    if (!form.clientName || !form.email) {
      addToast('Please fill required fields', 'error')
      return
    }
    try {
      await api.partnerAddClient(form)
      await loadClients()
      setShowModal(false)
      setForm({ clientName: "", companyName: "", email: "", mobile: "", product: "", notes: "" })
      addToast('Client added successfully!', 'success')
    } catch (err) {
      addToast(err.message || 'Error adding client', 'error')
    }
  }

  return (
    <div className="pd-page">
      <div className="pd-page-header">
        <h1>My Clients</h1>
        <button className="pd-btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Client
        </button>
      </div>

      {loading ? (
        <div className="pd-loading-mini"><div className="pd-spinner"></div></div>
      ) : clients.length === 0 ? (
        <div className="pd-empty">
          <FiUsers />
          <p>No clients yet</p>
          <button onClick={() => setShowModal(true)}>Add First Client</button>
        </div>
      ) : (
        <div className="pd-table-wrapper">
          <table className="pd-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, i) => (
                <tr key={i}>
                  <td>{client.clientName}</td>
                  <td>{client.companyName || '-'}</td>
                  <td>{client.email}</td>
                  <td>{client.mobile || '-'}</td>
                  <td><span className={`pd-badge ${client.status || 'active'}`}>{client.status || 'Active'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="pd-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pd-modal" onClick={e => e.stopPropagation()}>
            <div className="pd-modal-header">
              <h3>Add New Client</h3>
              <button onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            <div className="pd-modal-body">
              <div className="pd-form-row">
                <div className="pd-form-group">
                  <label>Client Name *</label>
                  <input value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} placeholder="Enter client name" />
                </div>
                <div className="pd-form-group">
                  <label>Company Name</label>
                  <input value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} placeholder="Enter company name" />
                </div>
              </div>
              <div className="pd-form-row">
                <div className="pd-form-group">
                  <label>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
                </div>
                <div className="pd-form-group">
                  <label>Phone</label>
                  <input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} placeholder="9876543210" />
                </div>
              </div>
              <div className="pd-form-group">
                <label>Product</label>
                <input value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} placeholder="Product/Service" />
              </div>
              <div className="pd-form-group">
                <label>Notes</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Additional notes" />
              </div>
            </div>
            <div className="pd-modal-footer">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="pd-btn-primary" onClick={handleAdd}>Add Client</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function ProfilePage() {
  const location = useLocation()
  const { partner, setPartner } = location.pathname.includes('/partner') ? { partner: JSON.parse(localStorage.getItem('partnerUser') || '{}'), setPartner: () => { } } : { partner: {}, setPartner: () => { } }
  const [form, setForm] = useState({
    companyName: partner?.companyName || '',
    contactPerson: partner?.contactPerson || '',
    mobile: partner?.mobile || '',
    city: partner?.city || '',
    state: partner?.state || '',
    website: partner?.website || ''
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.partnerUpdateProfile(form)
      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Error: ' + (err.message || 'Something went wrong'))
    }
    setSaving(false)
  }

  return (
    <div className="pd-page">
      <div className="pd-page-header">
        <h1>My Profile</h1>
      </div>

      <div className="pd-card">
        {message && <div className={`pd-alert ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
        <div className="pd-form-row">
          <div className="pd-form-group">
            <label>Company Name</label>
            <input value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} />
          </div>
          <div className="pd-form-group">
            <label>Contact Person</label>
            <input value={form.contactPerson} onChange={e => setForm({ ...form, contactPerson: e.target.value })} />
          </div>
        </div>
        <div className="pd-form-row">
          <div className="pd-form-group">
            <label>Email</label>
            <input value={partner?.email || ''} disabled />
          </div>
          <div className="pd-form-group">
            <label>Phone</label>
            <input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
          </div>
        </div>
        <div className="pd-form-row">
          <div className="pd-form-group">
            <label>City</label>
            <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
          </div>
          <div className="pd-form-group">
            <label>State</label>
            <input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
          </div>
        </div>
        <div className="pd-form-group">
          <label>Website</label>
          <input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://example.com" />
        </div>
        <button className="pd-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export function EarningsPage() {
  const [commissions, setCommissions] = useState({ commissions: [], stats: {} })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.partnerGetCommissions().then(res => {
      setCommissions(res.data || { commissions: [], stats: {} })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const stats = commissions.stats || {}

  return (
    <div className="pd-page">
      <div className="pd-page-header">
        <h1>My Earnings</h1>
      </div>

      {loading ? (
        <div className="pd-loading-mini"><div className="pd-spinner"></div></div>
      ) : (
        <>
          <div className="pd-earnings-grid">
            <div className="pd-earn-card">
              <span>Total Earned</span>
              <h2>₹{(stats.totalEarnings || 0).toLocaleString()}</h2>
            </div>
            <div className="pd-earn-card">
              <span>Pending Payout</span>
              <h2>₹{(stats.pendingPayout || 0).toLocaleString()}</h2>
            </div>
            <div className="pd-earn-card">
              <span>Total Clients</span>
              <h2>{stats.totalClients || 0}</h2>
            </div>
            <div className="pd-earn-card">
              <span>Active Clients</span>
              <h2>{stats.activeClients || 0}</h2>
            </div>
          </div>

          <div className="pd-card">
            <h3>Commission History</h3>
            {(commissions.commissions || []).length === 0 ? (
              <p className="pd-empty-text">No commissions yet</p>
            ) : (
              <div className="pd-table-wrapper">
                <table className="pd-table">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.commissions.map((c, i) => (
                      <tr key={i}>
                        <td>{c.transactionId}</td>
                        <td>{c.clientName}</td>
                        <td>₹{c.amount?.toLocaleString()}</td>
                        <td>{c.type}</td>
                        <td><span className={`pd-badge ${c.status}`}>{c.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export function DocumentsPage() {
  return (
    <div className="pd-page">
      <div className="pd-page-header">
        <h1>Documents</h1>
      </div>
      <div className="pd-empty">
        <FiFile />
        <p>No documents uploaded</p>
        <span>Upload your business documents to get started</span>
      </div>
    </div>
  )
}

export function TicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ subject: "", description: "", category: "technical" })

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = () => {
    api.getTickets().then(res => {
      setTickets(res.data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const handleSubmit = async () => {
    if (!form.subject || !form.description) {
      addToast('Please fill all fields', 'error')
      return
    }
    try {
      await api.createTicket(form)
      await loadTickets()
      setShowModal(false)
      setForm({ subject: "", description: "", category: "technical" })
      addToast('Ticket created successfully!', 'success')
    } catch (err) {
      addToast(err.message || 'Error creating ticket', 'error')
    }
  }

  return (
    <div className="pd-page">
      <div className="pd-page-header">
        <h1>Support Tickets</h1>
        <button className="pd-btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> New Ticket
        </button>
      </div>

      {loading ? (
        <div className="pd-loading-mini"><div className="pd-spinner"></div></div>
      ) : tickets.length === 0 ? (
        <div className="pd-empty">
          <FiMessageSquare />
          <p>No tickets yet</p>
          <button onClick={() => setShowModal(true)}>Create Ticket</button>
        </div>
      ) : (
        <div className="pd-tickets-list">
          {tickets.map((ticket, i) => (
            <div key={i} className="pd-ticket-card">
              <div className="pd-ticket-header">
                <span className="pd-ticket-id">{ticket.ticketId}</span>
                <span className={`pd-badge ${ticket.status}`}>{ticket.status}</span>
              </div>
              <h4>{ticket.subject}</h4>
              <p>{ticket.description?.slice(0, 150)}</p>
              <span className="pd-ticket-date">{new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="pd-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pd-modal" onClick={e => e.stopPropagation()}>
            <div className="pd-modal-header">
              <h3>Create Ticket</h3>
              <button onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            <div className="pd-modal-body">
              <div className="pd-form-group">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="technical">Technical</option>
                  <option value="payment">Payment</option>
                  <option value="account">Account</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="pd-form-group">
                <label>Subject *</label>
                <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Brief summary" />
              </div>
              <div className="pd-form-group">
                <label>Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} placeholder="Describe your issue" />
              </div>
            </div>
            <div className="pd-modal-footer">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="pd-btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function SettingsPage() {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleChangePassword = async () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      setMessage('Please fill all fields')
      return
    }
    if (passwords.newPassword.length < 6) {
      setMessage('New password must be at least 6 characters')
      return
    }
    setSaving(true)
    try {
      await api.partnerChangePassword(passwords.currentPassword, passwords.newPassword)
      setMessage('Password changed successfully!')
      setPasswords({ currentPassword: '', newPassword: '' })
      setShowPasswordModal(false)
    } catch (err) {
      setMessage(err.message || 'Error changing password')
    }
    setSaving(false)
  }

  return (
    <div className="pd-page">
      <div className="pd-page-header">
        <h1>Settings</h1>
      </div>

      {message && <div className={`pd-alert ${message.includes('Error') || message.includes('fill') || message.includes('6') ? 'error' : 'success'}`}>{message}</div>}

      <div className="pd-card">
        <h3>Account Security</h3>
        <button className="pd-btn-secondary" onClick={() => setShowPasswordModal(true)}>
          Change Password
        </button>
      </div>

      <div className="pd-card">
        <h3>Theme</h3>
        <p className="pd-text-muted">Choose your preferred theme</p>
      </div>

      {showPasswordModal && (
        <div className="pd-modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="pd-modal" onClick={e => e.stopPropagation()}>
            <div className="pd-modal-header">
              <h3>Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)}><FiX /></button>
            </div>
            <div className="pd-modal-body">
              <div className="pd-form-group">
                <label>Current Password</label>
                <div className="pd-password-input">
                  <input type={showCurrent ? 'text' : 'password'} value={passwords.currentPassword} onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })} />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)}>
                    {showCurrent ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div className="pd-form-group">
                <label>New Password</label>
                <div className="pd-password-input">
                  <input type={showNew ? 'text' : 'password'} value={passwords.newPassword} onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })} />
                  <button type="button" onClick={() => setShowNew(!showNew)}>
                    {showNew ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>
            <div className="pd-modal-footer">
              <button onClick={() => setShowPasswordModal(false)}>Cancel</button>
              <button className="pd-btn-primary" onClick={handleChangePassword} disabled={saving}>
                {saving ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
