import { useState, useEffect } from "react"
import { api } from "../../services/api"

const BUSINESS_TYPES = {
  individual: "Individual / Freelancer",
  proprietorship: "Sole Proprietorship",
  partnership: "Partnership Firm",
  private_ltd: "Private Limited",
  llp: "LLP",
  corporate: "Corporate"
}

const PARTNERSHIP_AREAS = {
  web_development: "Web Development",
  mobile_apps: "Mobile Apps",
  digital_marketing: "Digital Marketing",
  seo: "SEO",
  it_services: "IT Services",
  consulting: "Consulting",
  design: "Design",
  hosting: "Hosting"
}

export default function PartnerManager() {
  const [partners, setPartners] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, totalEarnings: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showCommissionModal, setShowCommissionModal] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ password: "", confirmPassword: "" })
  const [commissionForm, setCommissionForm] = useState({ clientName: "", amount: "", type: "referral", notes: "" })
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    loadPartners()
    loadStats()
  }, [statusFilter, search])

  const loadPartners = async () => {
    try {
      setLoading(true)
      const params = {}
      if (statusFilter) params.status = statusFilter
      if (search) params.search = search
      
      const response = await api.getPartners(params)
      setPartners(response.data || [])
      setError(null)
    } catch (err) {
      setError('Failed to load partners: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await api.getPartnerStats()
      setStats(response.data || stats)
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }

  const handleStatusChange = async (partnerId, newStatus) => {
    if (!confirm(`Change partner status to "${newStatus}"?`)) return
    
    setActionLoading(true)
    try {
      await api.updatePartnerStatus(partnerId, newStatus)
      await loadPartners()
      await loadStats()
      if (selectedPartner?._id === partnerId) {
        const response = await api.getPartnerById(partnerId)
        setSelectedPartner(response.data)
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleSetPassword = async () => {
    if (passwordForm.password !== passwordForm.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    if (passwordForm.password.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }
    
    setActionLoading(true)
    try {
      await api.setPartnerPassword(selectedPartner._id, passwordForm.password)
      alert("Password set successfully!")
      setShowPasswordModal(false)
      setPasswordForm({ password: "", confirmPassword: "" })
    } catch (err) {
      alert('Failed to set password: ' + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleAddCommission = async () => {
    if (!commissionForm.clientName || !commissionForm.amount) {
      alert("Please fill required fields")
      return
    }
    
    setActionLoading(true)
    try {
      await api.addPartnerCommission(selectedPartner._id, {
        clientName: commissionForm.clientName,
        amount: parseFloat(commissionForm.amount),
        type: commissionForm.type,
        notes: commissionForm.notes
      })
      alert("Commission added successfully!")
      setShowCommissionModal(false)
      setCommissionForm({ clientName: "", amount: "", type: "referral", notes: "" })
      
      const response = await api.getPartnerById(selectedPartner._id)
      setSelectedPartner(response.data)
      await loadStats()
    } catch (err) {
      alert('Failed to add commission: ' + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleMarkPaid = async (txnId) => {
    if (!confirm("Mark this commission as paid?")) return
    
    setActionLoading(true)
    try {
      await api.markCommissionPaid(selectedPartner._id, txnId)
      const response = await api.getPartnerById(selectedPartner._id)
      setSelectedPartner(response.data)
      await loadStats()
    } catch (err) {
      alert('Failed to mark as paid: ' + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async (partnerId) => {
    if (!confirm("Are you sure? This cannot be undone.")) return
    
    setActionLoading(true)
    try {
      await api.deletePartner(partnerId)
      await loadPartners()
      await loadStats()
      setSelectedPartner(null)
      setShowModal(false)
    } catch (err) {
      alert('Failed to delete: ' + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const openPartnerDetails = async (partner) => {
    try {
      const response = await api.getPartnerById(partner._id)
      setSelectedPartner(response.data)
      setShowModal(true)
    } catch (err) {
      alert('Failed to load details: ' + err.message)
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Partner Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats" style={{ marginBottom: '20px' }}>
        <div className="stat-card" style={{ background: '#f0f0f0' }}>
          <h4>Total Partners</h4>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card" style={{ background: '#fff3cd' }}>
          <h4>Pending</h4>
          <div className="stat-number">{stats.pending}</div>
        </div>
        <div className="stat-card" style={{ background: '#d4edda' }}>
          <h4>Approved</h4>
          <div className="stat-number">{stats.approved}</div>
        </div>
        <div className="stat-card" style={{ background: '#f8d7da' }}>
          <h4>Rejected</h4>
          <div className="stat-number">{stats.rejected}</div>
        </div>
        <div className="stat-card" style={{ background: '#cce5ff' }}>
          <h4>Total Earnings</h4>
          <div className="stat-number">₹{stats.totalEarnings?.toLocaleString() || 0}</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name, email, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', flex: 1, minWidth: '200px' }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="suspended">Suspended</option>
        </select>
        <button
          onClick={loadPartners}
          style={{ padding: '8px 16px', background: '#f05a28', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Refresh
        </button>
      </div>

      {error && <div className="admin-error" style={{ padding: '15px', background: '#fee', color: '#c00', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}

      {/* Partners Table */}
      <div className="admin-card">
        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : partners.length === 0 ? (
          <div className="admin-empty">No partners found</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Partner</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Business</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map(p => (
                <tr key={p._id}>
                  <td>
                    {p.profilePhoto ? (
                      <img 
                        src={p.profilePhoto} 
                        alt={p.contactPerson} 
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #f05a28, #e04a18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                        {p.contactPerson?.charAt(0) || 'P'}
                      </div>
                    )}
                  </td>
                  <td>
                    <strong>{p.partnerId}</strong>
                    <br />
                    <small style={{color: '#666'}}>{p.companyName}</small>
                  </td>
                  <td>{p.contactPerson}</td>
                  <td>{p.email}</td>
                  <td>{BUSINESS_TYPES[p.businessType] || p.businessType}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: p.status === 'approved' ? '#d4edda' : 
                                 p.status === 'pending' ? '#fff3cd' : 
                                 p.status === 'rejected' ? '#f8d7da' : '#e2e3e5',
                      color: p.status === 'approved' ? '#155724' : 
                             p.status === 'pending' ? '#856404' : 
                             p.status === 'rejected' ? '#721c24' : '#383d41'
                    }}>
                      {p.status?.toUpperCase()}
                    </span>
                  </td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="admin-btn admin-btn-primary admin-btn-sm"
                      onClick={() => openPartnerDetails(p)}
                      style={{ marginRight: '5px' }}
                    >
                      View
                    </button>
                    {p.status === 'pending' && (
                      <>
                        <button
                          className="admin-btn admin-btn-sm"
                          onClick={() => handleStatusChange(p._id, 'approved')}
                          disabled={actionLoading}
                          style={{ background: '#28a745', color: 'white', marginRight: '5px' }}
                        >
                          Approve
                        </button>
                        <button
                          className="admin-btn admin-btn-sm"
                          onClick={() => handleStatusChange(p._id, 'rejected')}
                          disabled={actionLoading}
                          style={{ background: '#dc3545', color: 'white' }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Partner Details Modal */}
      {showModal && selectedPartner && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="admin-modal-header" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {selectedPartner.profilePhoto ? (
                <img 
                  src={selectedPartner.profilePhoto} 
                  alt={selectedPartner.contactPerson}
                  style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f05a28, #e04a18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '20px'
                }}>
                  {selectedPartner.contactPerson?.charAt(0) || 'P'}
                </div>
              )}
              <div>
                <h3 style={{ margin: 0 }}>{selectedPartner.companyName}</h3>
                <small style={{ color: '#666' }}>{selectedPartner.partnerId}</small>
              </div>
              <button className="admin-modal-close" onClick={() => { setShowModal(false); setSelectedPartner(null) }} style={{ marginLeft: 'auto' }}>
                ×
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              {/* Status & Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    background: selectedPartner.status === 'approved' ? '#d4edda' : 
                               selectedPartner.status === 'pending' ? '#fff3cd' : 
                               selectedPartner.status === 'rejected' ? '#f8d7da' : '#e2e3e5',
                  }}>
                    {selectedPartner.status?.toUpperCase()}
                  </span>
                  <span style={{ color: '#666' }}>Contact: {selectedPartner.contactPerson}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button className="admin-btn admin-btn-sm" onClick={() => setShowPasswordModal(true)} style={{ background: '#007bff', color: 'white' }}>
                    Set Password
                  </button>
                  <button className="admin-btn admin-btn-sm" onClick={() => setShowCommissionModal(true)} style={{ background: '#28a745', color: 'white' }}>
                    Add Commission
                  </button>
                  {selectedPartner.status !== 'suspended' && (
                    <button className="admin-btn admin-btn-sm" onClick={() => handleStatusChange(selectedPartner._id, 'suspended')} style={{ background: '#dc3545', color: 'white' }}>
                      Suspend
                    </button>
                  )}
                  {selectedPartner.status === 'suspended' && (
                    <button className="admin-btn admin-btn-sm" onClick={() => handleStatusChange(selectedPartner._id, 'approved')} style={{ background: '#28a745', color: 'white' }}>
                      Reactivate
                    </button>
                  )}
                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(selectedPartner._id)}>
                    Delete
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Basic Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div><strong>Company:</strong> {selectedPartner.companyName}</div>
                  <div><strong>Contact Person:</strong> {selectedPartner.contactPerson}</div>
                  <div><strong>Email:</strong> {selectedPartner.email}</div>
                  <div><strong>Mobile:</strong> {selectedPartner.mobile}</div>
                  <div><strong>Business Type:</strong> {BUSINESS_TYPES[selectedPartner.businessType] || selectedPartner.businessType}</div>
                  <div><strong>City:</strong> {selectedPartner.city}, {selectedPartner.state}</div>
                  <div><strong>GSTIN:</strong> {selectedPartner.gstin || 'N/A'}</div>
                  <div><strong>Aadhar/PAN:</strong> {selectedPartner.aadharPan || 'N/A'}</div>
                </div>
              </div>

              {/* Partnership Areas */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Partnership Areas</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedPartner.partnershipAreas?.map(area => (
                    <span key={area} style={{ padding: '4px 12px', background: '#e9ecef', borderRadius: '4px', fontSize: '13px' }}>
                      {PARTNERSHIP_AREAS[area] || area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Statistics</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                  <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f05a28' }}>{selectedPartner.stats?.totalClients || 0}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>Total Clients</div>
                  </div>
                  <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{selectedPartner.stats?.activeClients || 0}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>Active Clients</div>
                  </div>
                  <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>₹{selectedPartner.stats?.totalEarnings?.toLocaleString() || 0}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>Total Earnings</div>
                  </div>
                  <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>₹{selectedPartner.stats?.pendingPayout?.toLocaleString() || 0}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>Pending Payout</div>
                  </div>
                </div>
              </div>

              {/* Clients */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                  Clients ({selectedPartner.clients?.length || 0})
                </h4>
                {selectedPartner.clients?.length > 0 ? (
                  <table className="admin-table" style={{ fontSize: '13px' }}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Registered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPartner.clients.map(client => (
                        <tr key={client.clientId}>
                          <td>{client.clientId}</td>
                          <td>{client.clientName}</td>
                          <td>{client.companyName}</td>
                          <td>{client.product}</td>
                          <td>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '3px',
                              fontSize: '11px',
                              background: client.status === 'active' ? '#d4edda' : '#e9ecef',
                              color: client.status === 'active' ? '#155724' : '#383d41'
                            }}>
                              {client.status}
                            </span>
                          </td>
                          <td>{new Date(client.registeredAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: '#666' }}>No clients yet</p>
                )}
              </div>

              {/* Commissions */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                  Commissions ({selectedPartner.commissions?.length || 0})
                </h4>
                {selectedPartner.commissions?.length > 0 ? (
                  <table className="admin-table" style={{ fontSize: '13px' }}>
                    <thead>
                      <tr>
                        <th>TXN ID</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPartner.commissions.map(comm => (
                        <tr key={comm.transactionId}>
                          <td>{comm.transactionId}</td>
                          <td>{comm.clientName}</td>
                          <td><strong>₹{comm.amount?.toLocaleString()}</strong></td>
                          <td>{comm.type}</td>
                          <td>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '3px',
                              fontSize: '11px',
                              background: comm.status === 'paid' ? '#d4edda' : 
                                         comm.status === 'pending' ? '#fff3cd' : '#e9ecef',
                              color: comm.status === 'paid' ? '#155724' : 
                                     comm.status === 'pending' ? '#856404' : '#383d41'
                            }}>
                              {comm.status}
                            </span>
                          </td>
                          <td>{new Date(comm.createdAt).toLocaleDateString()}</td>
                          <td>
                            {comm.status === 'pending' && (
                              <button
                                className="admin-btn admin-btn-sm"
                                onClick={() => handleMarkPaid(comm.transactionId)}
                                style={{ background: '#28a745', color: 'white', fontSize: '11px', padding: '4px 8px' }}
                              >
                                Mark Paid
                              </button>
                            )}
                            {comm.status === 'paid' && comm.paidAt && (
                              <span style={{ color: '#666', fontSize: '11px' }}>
                                Paid: {new Date(comm.paidAt).toLocaleDateString()}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: '#666' }}>No commissions yet</p>
                )}
              </div>

              {/* Bank Details */}
              {selectedPartner.bankDetails && (
                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Bank Details</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    <div><strong>Account Holder:</strong> {selectedPartner.bankDetails.accountHolder || 'N/A'}</div>
                    <div><strong>Account Number:</strong> {selectedPartner.bankDetails.accountNumber ? '****' + selectedPartner.bankDetails.accountNumber.slice(-4) : 'N/A'}</div>
                    <div><strong>Bank:</strong> {selectedPartner.bankDetails.bankName || 'N/A'}</div>
                    <div><strong>IFSC:</strong> {selectedPartner.bankDetails.ifsc || 'N/A'}</div>
                  </div>
                </div>
              )}

              {/* Activity */}
              <div>
                <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Activity</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', color: '#666', fontSize: '13px' }}>
                  <div>Created: {new Date(selectedPartner.createdAt).toLocaleString()}</div>
                  <div>Updated: {new Date(selectedPartner.updatedAt).toLocaleString()}</div>
                  {selectedPartner.lastLogin && <div>Last Login: {new Date(selectedPartner.lastLogin).toLocaleString()}</div>}
                  <div>Login Count: {selectedPartner.loginCount || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '400px' }}>
            <div className="admin-modal-header">
              <h3>Set Partner Password</h3>
              <button className="admin-modal-close" onClick={() => { setShowPasswordModal(false); setPasswordForm({ password: "", confirmPassword: "" }) }}>×</button>
            </div>
            <div className="admin-form" style={{ padding: '20px' }}>
              <div className="admin-form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={passwordForm.password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                  placeholder="Min 6 characters"
                />
              </div>
              <div className="admin-form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                />
              </div>
              <button
                className="admin-btn admin-btn-primary"
                onClick={handleSetPassword}
                disabled={actionLoading}
                style={{ marginTop: '10px' }}
              >
                {actionLoading ? 'Setting...' : 'Set Password'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Commission Modal */}
      {showCommissionModal && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '400px' }}>
            <div className="admin-modal-header">
              <h3>Add Commission</h3>
              <button className="admin-modal-close" onClick={() => { setShowCommissionModal(false); setCommissionForm({ clientName: "", amount: "", type: "referral", notes: "" }) }}>×</button>
            </div>
            <div className="admin-form" style={{ padding: '20px' }}>
              <div className="admin-form-group">
                <label>Client Name *</label>
                <input
                  type="text"
                  value={commissionForm.clientName}
                  onChange={(e) => setCommissionForm({ ...commissionForm, clientName: e.target.value })}
                  placeholder="Enter client name"
                />
              </div>
              <div className="admin-form-group">
                <label>Amount (₹) *</label>
                <input
                  type="number"
                  value={commissionForm.amount}
                  onChange={(e) => setCommissionForm({ ...commissionForm, amount: e.target.value })}
                  placeholder="Enter amount"
                />
              </div>
              <div className="admin-form-group">
                <label>Type</label>
                <select
                  value={commissionForm.type}
                  onChange={(e) => setCommissionForm({ ...commissionForm, type: e.target.value })}
                >
                  <option value="referral">Referral</option>
                  <option value="bonus">Bonus</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Notes</label>
                <textarea
                  value={commissionForm.notes}
                  onChange={(e) => setCommissionForm({ ...commissionForm, notes: e.target.value })}
                  placeholder="Optional notes"
                  rows={3}
                />
              </div>
              <button
                className="admin-btn admin-btn-primary"
                onClick={handleAddCommission}
                disabled={actionLoading}
                style={{ marginTop: '10px' }}
              >
                {actionLoading ? 'Adding...' : 'Add Commission'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
