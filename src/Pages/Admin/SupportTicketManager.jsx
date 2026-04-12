import { useState, useEffect } from "react"
import { FiPlus, FiTrash2, FiEdit, FiX, FiCheck, FiClock, FiAlertCircle, FiUser, FiMessageSquare } from "react-icons/fi"
import { api } from "../../services/api"

function SupportTicketManager() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0, closed: 0, urgent: 0 })
  const [filter, setFilter] = useState({ status: '', priority: '', search: '' })
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [response, setResponse] = useState('')

  useEffect(() => { loadTickets() }, [filter])
  useEffect(() => { loadStats() }, [])

  const loadTickets = () => {
    const params = {}
    if (filter.status) params.status = filter.status
    if (filter.priority) params.priority = filter.priority
    
    api.getTickets(params).then(res => {
      let list = res.data || res || []
      if (filter.search) {
        const s = filter.search.toLowerCase()
        list = list.filter(t => 
          t.subject?.toLowerCase().includes(s) ||
          t.ticketId?.toLowerCase().includes(s) ||
          t.description?.toLowerCase().includes(s)
        )
      }
      setTickets(list)
      setLoading(false)
    }).catch(err => {
      setError('Failed to load tickets')
      setLoading(false)
    })
  }

  const loadStats = () => {
    api.getTicketStats().then(res => {
      if (res.data) setStats(res.data)
    }).catch(() => {})
  }

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateTicketStatus(id, status)
      loadTickets()
      loadStats()
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const handleRespond = async () => {
    if (!response.trim()) return
    try {
      await api.respondToTicket(selectedTicket._id, response)
      setResponse('')
      const updated = await api.getTicketById(selectedTicket._id)
      setSelectedTicket(updated.data)
      loadTickets()
    } catch (err) {
      alert('Failed to respond')
    }
  }

  const openTicketDetail = async (ticket) => {
    try {
      const res = await api.getTicketById(ticket._id)
      setSelectedTicket(res.data)
    } catch (err) {
      setSelectedTicket(ticket)
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      open: { bg: '#fff3cd', color: '#856404' },
      in_progress: { bg: '#cce5ff', color: '#004085' },
      resolved: { bg: '#d4edda', color: '#155724' },
      closed: { bg: '#6c757d', color: '#fff' }
    }
    const style = colors[status] || colors.open
    const label = status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)
    return <span style={{ padding: '2px 8px', borderRadius: '3px', fontSize: '11px', background: style.bg, color: style.color }}>{label}</span>
  }

  const getPriorityBadge = (priority) => {
    const colors = {
      low: '#6c757d',
      medium: '#007bff',
      high: '#fd7e14',
      urgent: '#dc3545'
    }
    return <span style={{ color: colors[priority] || colors.medium, fontWeight: 'bold', fontSize: '11px' }}>{priority?.toUpperCase()}</span>
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Support Tickets</h1>
      </div>

      <div className="admin-stats" style={{ marginBottom: '20px' }}>
        <div className="stat-card">
          <h4>Total</h4>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h4>Open</h4>
          <div className="stat-number">{stats.open}</div>
        </div>
        <div className="stat-card">
          <h4>In Progress</h4>
          <div className="stat-number">{stats.inProgress}</div>
        </div>
        <div className="stat-card">
          <h4>Resolved</h4>
          <div className="stat-number">{stats.resolved}</div>
        </div>
        <div className="stat-card">
          <h4>Urgent</h4>
          <div className="stat-number" style={{ color: '#dc3545' }}>{stats.urgent}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search ticket ID, subject..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', minWidth: '200px' }}
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="admin-card">
        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : tickets.length === 0 ? (
          <div className="admin-empty">No tickets found</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket._id}>
                  <td><strong>{ticket.ticketId}</strong></td>
                  <td style={{ maxWidth: '200px' }}>{ticket.subject?.substring(0, 40)}{ticket.subject?.length > 40 ? '...' : ''}</td>
                  <td>{ticket.category}</td>
                  <td>{getPriorityBadge(ticket.priority)}</td>
                  <td>{getStatusBadge(ticket.status)}</td>
                  <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => openTicketDetail(ticket)}>
                      <FiMessageSquare />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedTicket && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="admin-modal-header">
              <h3>{selectedTicket.ticketId} - {selectedTicket.subject}</h3>
              <button className="admin-modal-close" onClick={() => setSelectedTicket(null)}><FiX /></button>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#666' }}>Priority</label>
                  <div>{getPriorityBadge(selectedTicket.priority)}</div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#666' }}>Category</label>
                  <div>{selectedTicket.category}</div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#666' }}>User Type</label>
                  <div>{selectedTicket.userType}</div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#666' }}>Created</label>
                  <div>{new Date(selectedTicket.createdAt).toLocaleString()}</div>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Description</label>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                  {selectedTicket.description}
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Status</label>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '5px' }}>
                  {['open', 'in_progress', 'resolved', 'closed'].map(s => (
                    <button
                      key={s}
                      className={`admin-btn admin-btn-sm ${selectedTicket.status === s ? 'admin-btn-primary' : 'admin-btn-outline'}`}
                      onClick={() => handleStatusChange(selectedTicket._id, s)}
                    >
                      {s === 'in_progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {selectedTicket.responses?.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '12px', color: '#666' }}>Responses</label>
                  <div style={{ marginTop: '10px' }}>
                    {selectedTicket.responses.map((r, i) => (
                      <div key={i} style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px', marginBottom: '10px' }}>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                          {r.userType} • {new Date(r.createdAt).toLocaleString()}
                        </div>
                        <div>{r.message}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label style={{ fontSize: '12px', color: '#666' }}>Add Response</label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={3}
                  placeholder="Type your response..."
                  style={{ width: '100%', marginTop: '5px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={handleRespond}
                  disabled={!response.trim()}
                  style={{ marginTop: '10px' }}
                >
                  <FiSend /> Send Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupportTicketManager