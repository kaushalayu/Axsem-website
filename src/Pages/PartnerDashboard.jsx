import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom"
import { 
  FiHome, FiUser, FiUsers, FiDollarSign, FiFileText, 
  FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX,
  FiSun, FiMoon, FiUserPlus, FiClock, FiBell, FiPlus, FiFile as FiFileIcon
} from "react-icons/fi"
import { api } from "../services/api"
import "../Styles/PartnerDashboard.css"

const NAV_ITEMS = [
  { path: "/partner/dashboard", icon: <FiHome />, label: "Dashboard" },
  { path: "/partner/profile", icon: <FiUser />, label: "My Profile" },
  { path: "/partner/clients", icon: <FiUsers />, label: "My Clients" },
  { path: "/partner/commissions", icon: <FiDollarSign />, label: "Earnings" },
  { path: "/partner/documents", icon: <FiFile />, label: "Documents" },
  { path: "/partner/tickets", icon: <FiMessageSquare />, label: "Support" },
  { path: "/partner/settings", icon: <FiSettings />, label: "Settings" },
]

export default function PartnerDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [partner, setPartner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => localStorage.getItem('partnerTheme') || 'light')

  useEffect(() => {
    const token = localStorage.getItem("partnerToken")
    if (!token) {
      navigate("/partner/login")
      return
    }
    
    api.partnerVerify().then(response => {
      if (response.success && response.data) {
        setPartner(response.data)
      }
      setLoading(false)
    }).catch(() => {
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
    api.partnerLogout()
    navigate("/partner/login")
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const isActive = (path) => location.pathname === path

  if (loading) {
    return (
      <div className="partner-loading">
        <div className="partner-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="partner-layout">
      {/* Mobile Header */}
      <header className="partner-mobile-header">
        <button className="partner-menu-btn" onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>
        <Link to="/partner/dashboard" className="partner-mobile-logo">
          <span>AXSEM</span>
        </Link>
        <button className="partner-notify-btn">
          <FiBell />
        </button>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="partner-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`partner-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="partner-sidebar-header">
          <Link to="/partner/dashboard" className="partner-logo">
            <div className="partner-logo-icon">AX</div>
            <span>Partner</span>
          </Link>
          <button className="partner-close-btn" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="partner-user-card">
          <div className="partner-avatar">
            {partner?.contactPerson?.charAt(0) || partner?.companyName?.charAt(0) || 'P'}
          </div>
          <div className="partner-user-info">
            <h4>{partner?.contactPerson || partner?.companyName}</h4>
            <span>{partner?.email}</span>
          </div>
        </div>

        <nav className="partner-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={isActive(item.path) ? 'active' : ''}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="partner-sidebar-footer">
          <button onClick={toggleTheme}>
            {theme === 'light' ? <FiMoon /> : <FiSun />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          <button onClick={handleLogout} className="logout">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="partner-main">
        <Outlet context={{ partner }} />
      </main>
    </div>
  )
}

// Dashboard Page
export function DashboardPage() {
  const [stats, setStats] = useState({ clients: 0, earnings: 0, pending: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.partnerGetClients().catch(() => []),
      api.partnerGetCommissions().catch(() => ({}))
    ]).then(([clients, commissions]) => {
      setStats({
        clients: clients.length || 0,
        earnings: commissions?.totalEarned || 0,
        pending: commissions?.pending || 0
      })
      setLoading(false)
    })
  }, [])

  const cards = [
    { label: "Total Clients", value: stats.clients, icon: <FiUsers />, color: "#3b82f6" },
    { label: "Total Earnings", value: `₹${stats.earnings}`, icon: <FiDollarSign />, color: "#10b981" },
    { label: "Pending Commission", value: `₹${stats.pending}`, icon: <FiClock />, color: "#f59e0b" },
  ]

  return (
    <div className="partner-dashboard">
      <div className="partner-page-header">
        <h1>Dashboard</h1>
        <Link to="/partner/clients" className="partner-add-btn">
          <FiPlus /> Add Client
        </Link>
      </div>

      {loading ? (
        <div className="partner-loading-mini"><div className="partner-spinner"></div></div>
      ) : (
        <div className="partner-stats-grid">
          {cards.map((card, i) => (
            <div key={i} className="partner-stat-card" style={{ '--accent': card.color }}>
              <div className="partner-stat-icon">{card.icon}</div>
              <div className="partner-stat-info">
                <span className="partner-stat-label">{card.label}</span>
                <span className="partner-stat-value">{card.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="partner-quick-actions">
        <h3>Quick Actions</h3>
        <div className="partner-actions-grid">
          <Link to="/partner/clients" className="partner-action-card">
            <FiUserPlus />
            <span>Add Client</span>
          </Link>
          <Link to="/partner/tickets" className="partner-action-card">
            <FiMessageSquare />
            <span>Support Ticket</span>
          </Link>
          <Link to="/partner/documents" className="partner-action-card">
            <FiFileText />
            <span>Documents</span>
          </Link>
          <Link to="/partner/profile" className="partner-action-card">
            <FiSettings />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Clients Page
export function ClientsPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" })

  useEffect(() => {
    api.partnerGetClients().then(res => {
      setClients(res.data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleAdd = async () => {
    if (!form.name || !form.email) return
    try {
      await api.partnerAddClient(form)
      const res = await api.partnerGetClients()
      setClients(res.data || [])
      setShowModal(false)
      setForm({ name: "", email: "", phone: "", company: "" })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="partner-dashboard">
      <div className="partner-page-header">
        <h1>My Clients</h1>
        <button className="partner-add-btn" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Client
        </button>
      </div>

      {loading ? (
        <div className="partner-loading-mini"><div className="partner-spinner"></div></div>
      ) : clients.length === 0 ? (
        <div className="partner-empty">
          <FiUsers />
          <p>No clients yet</p>
          <button onClick={() => setShowModal(true)}>Add First Client</button>
        </div>
      ) : (
        <div className="partner-table">
          <div className="partner-table-header">
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Status</span>
          </div>
          {clients.map((client, i) => (
            <div key={i} className="partner-table-row">
              <span>{client.name}</span>
              <span>{client.email}</span>
              <span>{client.phone || '-'}</span>
              <span className="status">{client.status || 'Active'}</span>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="partner-modal">
          <div className="partner-modal-content">
            <h3>Add New Client</h3>
            <div className="partner-form-group">
              <label>Name *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Client name" />
            </div>
            <div className="partner-form-group">
              <label>Email *</label>
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" />
            </div>
            <div className="partner-form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="9876543210" />
            </div>
            <div className="partner-form-group">
              <label>Company</label>
              <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Company name" />
            </div>
            <div className="partner-modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="primary" onClick={handleAdd}>Add Client</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Profile Page
export function ProfilePage() {
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // API call would go here
    setTimeout(() => {
      setSaving(false)
      alert("Profile updated!")
    }, 1000)
  }

  return (
    <div className="partner-dashboard">
      <div className="partner-page-header">
        <h1>My Profile</h1>
      </div>

      <div className="partner-profile-card">
        <div className="partner-form-row">
          <div className="partner-form-group">
            <label>Company Name</label>
            <input value={form.companyName || ""} onChange={e => setForm({...form, companyName: e.target.value})} />
          </div>
          <div className="partner-form-group">
            <label>Contact Person</label>
            <input value={form.contactPerson || ""} onChange={e => setForm({...form, contactPerson: e.target.value})} />
          </div>
        </div>
        <div className="partner-form-row">
          <div className="partner-form-group">
            <label>Email</label>
            <input value={form.email || ""} disabled />
          </div>
          <div className="partner-form-group">
            <label>Phone</label>
            <input value={form.phone || ""} onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
        </div>
        <div className="partner-form-group">
          <label>City</label>
          <input value={form.city || ""} onChange={e => setForm({...form, city: e.target.value})} />
        </div>
        <button className="partner-save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}

// Earnings Page
export function EarningsPage() {
  const [commissions, setCommissions] = useState({})

  useEffect(() => {
    api.partnerGetCommissions().then(res => {
      setCommissions(res || {})
    }).catch(() => ({}))
  }, [])

  return (
    <div className="partner-dashboard">
      <div className="partner-page-header">
        <h1>My Earnings</h1>
      </div>

      <div className="partner-earnings-grid">
        <div className="partner-earn-card">
          <span>Total Earned</span>
          <h2>₹{commissions.totalEarned || 0}</h2>
        </div>
        <div className="partner-earn-card">
          <span>Pending</span>
          <h2>₹{commissions.pending || 0}</h2>
        </div>
        <div className="partner-earn-card">
          <span>Paid</span>
          <h2>₹{commissions.paid || 0}</h2>
        </div>
      </div>
    </div>
  )
}

// Tickets Page
export function TicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ subject: "", description: "", category: "technical" })

  useEffect(() => {
    api.getTickets().then(res => {
      setTickets(res.data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleSubmit = async () => {
    if (!form.subject || !form.description) return
    try {
      await api.createTicket(form)
      const res = await api.getTickets()
      setTickets(res.data || [])
      setShowModal(false)
      setForm({ subject: "", description: "", category: "technical" })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="partner-dashboard">
      <div className="partner-page-header">
        <h1>Support Tickets</h1>
        <button className="partner-add-btn" onClick={() => setShowModal(true)}>
          <FiPlus /> New Ticket
        </button>
      </div>

      {loading ? (
        <div className="partner-loading-mini"><div className="partner-spinner"></div></div>
      ) : tickets.length === 0 ? (
        <div className="partner-empty">
          <FiMessageSquare />
          <p>No tickets yet</p>
          <button onClick={() => setShowModal(true)}>Create Ticket</button>
        </div>
      ) : (
        <div className="partner-tickets-list">
          {tickets.map((ticket, i) => (
            <div key={i} className="partner-ticket-card">
              <div className="partner-ticket-header">
                <span className="partner-ticket-id">{ticket.ticketId}</span>
                <span className={`partner-ticket-status ${ticket.status}`}>{ticket.status}</span>
              </div>
              <h4>{ticket.subject}</h4>
              <p>{ticket.description?.slice(0, 100)}</p>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="partner-modal">
          <div className="partner-modal-content">
            <h3>Create Ticket</h3>
            <div className="partner-form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="technical">Technical</option>
                <option value="payment">Payment</option>
                <option value="account">Account</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="partner-form-group">
              <label>Subject *</label>
              <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Brief summary" />
            </div>
            <div className="partner-form-group">
              <label>Description *</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} placeholder="Details" />
            </div>
            <div className="partner-modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Documents Page
export function DocumentsPage() {
  return (
    <div className="partner-dashboard">
      <div className="partner-page-header">
        <h1>Documents</h1>
      </div>
      <div className="partner-empty">
        <FiFileIcon />
        <p>No documents uploaded</p>
      </div>
    </div>
  )
}

// Settings Page  
export function SettingsPage() {
  return (
    <div className="partner-dashboard">
      <div className="partner-page-header">
        <h1>Settings</h1>
      </div>
      <div className="partner-empty">
        <FiSettings />
        <p>Settings coming soon</p>
      </div>
    </div>
  )
}