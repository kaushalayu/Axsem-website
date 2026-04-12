import { useState, useEffect } from "react"
import { api } from "../../services/api"
import { FiPlus, FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar, FiX, FiCheck } from "react-icons/fi"

const DEPARTMENTS = [
  "Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Operations", "Support"
]

export default function EmployeeManager() {
  const [employees, setEmployees] = useState([])
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 })
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [form, setForm] = useState({
    name: "", email: "", phone: "", designation: "", department: "", joiningDate: "", location: "", status: "active"
  })
  const [filter, setFilter] = useState({ status: "", department: "", search: "" })

  useEffect(() => {
    loadEmployees()
    loadStats()
  }, [filter])

  const loadEmployees = async () => {
    try {
      const params = new URLSearchParams()
      if (filter.status) params.append('status', filter.status)
      if (filter.department) params.append('department', filter.department)
      if (filter.search) params.append('search', filter.search)
      
      const response = await api.getEmployees()
      let data = response.data || []
      
      if (filter.status) data = data.filter(e => e.status === filter.status)
      if (filter.department) data = data.filter(e => e.department === filter.department)
      if (filter.search) {
        const s = filter.search.toLowerCase()
        data = data.filter(e => 
          e.name?.toLowerCase().includes(s) || 
          e.employeeId?.toLowerCase().includes(s) ||
          e.email?.toLowerCase().includes(s)
        )
      }
      
      setEmployees(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await api.getEmployeeStats()
      if (response.data) setStats(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.designation || !form.department || !form.joiningDate) {
      alert("Please fill required fields")
      return
    }
    
    try {
      await api.addEmployee(form)
      alert("Employee added!")
      setShowModal(false)
      setForm({ name: "", email: "", phone: "", designation: "", department: "", joiningDate: "", location: "", status: "active" })
      loadEmployees()
      loadStats()
    } catch (err) {
      alert("Error: " + err.message)
    }
  }

  const handleEdit = (emp) => {
    setForm({
      name: emp.name || "",
      email: emp.email || "",
      phone: emp.phone || "",
      designation: emp.designation || "",
      department: emp.department || "",
      joiningDate: emp.joiningDate ? emp.joiningDate.split('T')[0] : "",
      location: emp.location || "",
      status: emp.status || "active"
    })
    setSelectedEmployee(emp)
    setShowModal(true)
  }

  const handleUpdate = async () => {
    if (!form.name || !form.email || !form.designation || !form.department) {
      alert("Please fill required fields")
      return
    }
    try {
      await api.updateEmployee(selectedEmployee._id, form)
      alert("Employee updated!")
      setShowModal(false)
      setForm({ name: "", email: "", phone: "", designation: "", department: "", joiningDate: "", location: "", status: "active" })
      setSelectedEmployee(null)
      loadEmployees()
      loadStats()
    } catch (err) {
      alert("Error: " + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this employee?")) return
    try {
      await api.deleteEmployee(id)
      loadEmployees()
      loadStats()
    } catch (err) {
      alert("Error: " + err.message)
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Employee Management</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="admin-stats" style={{ marginBottom: '20px' }}>
        <div className="stat-card" style={{ background: '#e3f2fd' }}>
          <h4>Total Employees</h4>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card" style={{ background: '#d4edda' }}>
          <h4>Active</h4>
          <div className="stat-number">{stats.active}</div>
        </div>
        <div className="stat-card" style={{ background: '#fff3cd' }}>
          <h4>Inactive</h4>
          <div className="stat-number">{stats.inactive}</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search name, ID, email..."
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="left">Left</option>
        </select>
        <select
          value={filter.department}
          onChange={(e) => setFilter({ ...filter, department: e.target.value })}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="admin-card">
        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : employees.length === 0 ? (
          <div className="admin-empty">No employees found</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id}>
                  <td><strong>{emp.employeeId}</strong></td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.department}</td>
                  <td>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      background: emp.status === 'active' ? '#d4edda' : '#fff3cd',
                      color: emp.status === 'active' ? '#155724' : '#856404'
                    }}>
                      {emp.status}
                    </span>
                  </td>
                  <td>{emp.joiningDate ? new Date(emp.joiningDate).toLocaleDateString() : '-'}</td>
                  <td>
                    <button
                      className="admin-btn admin-btn-sm"
                      onClick={() => { setSelectedEmployee(emp); setShowViewModal(true) }}
                      style={{ marginRight: '5px' }}
                    >
                      View
                    </button>
                    <button
                      className="admin-btn admin-btn-outline admin-btn-sm"
                      onClick={() => handleEdit(emp)}
                      style={{ marginRight: '5px' }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => handleDelete(emp._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '500px' }}>
            <div className="admin-modal-header">
              <h3>{selectedEmployee ? 'Update Employee' : 'Add New Employee'}</h3>
              <button className="admin-modal-close" onClick={() => { setShowModal(false); setSelectedEmployee(null); setForm({ name: "", email: "", phone: "", designation: "", department: "", joiningDate: "", location: "", status: "active" }) }}>×</button>
            </div>
            <div className="admin-form" style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="admin-form-group">
                  <label>Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="email@axsem.com"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Phone</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="9876543210"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Designation *</label>
                  <input
                    value={form.designation}
                    onChange={e => setForm({ ...form, designation: e.target.value })}
                    placeholder="e.g. Developer"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Department *</label>
                  <select
                    value={form.department}
                    onChange={e => setForm({ ...form, department: e.target.value })}
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Joining Date *</label>
                  <input
                    type="date"
                    value={form.joiningDate}
                    onChange={e => setForm({ ...form, joiningDate: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Location</label>
                  <input
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <button className="admin-btn admin-btn-primary" onClick={selectedEmployee ? handleUpdate : handleSubmit} style={{ marginTop: '15px' }}>
                {selectedEmployee ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedEmployee && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '450px' }}>
            <div className="admin-modal-header">
              <h3>Employee Details</h3>
              <button className="admin-modal-close" onClick={() => setShowViewModal(false)}>×</button>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f05a28', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  {selectedEmployee.name?.charAt(0)}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{selectedEmployee.name}</h3>
                  <span style={{ color: '#666' }}>{selectedEmployee.employeeId}</span>
                </div>
              </div>
              
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Designation:</span>
                  <strong>{selectedEmployee.designation}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Department:</span>
                  <strong>{selectedEmployee.department}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Email:</span>
                  <strong>{selectedEmployee.email}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Phone:</span>
                  <strong>{selectedEmployee.phone || '-'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Location:</span>
                  <strong>{selectedEmployee.location || '-'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Joined:</span>
                  <strong>{selectedEmployee.joiningDate ? new Date(selectedEmployee.joiningDate).toLocaleDateString() : '-'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Status:</span>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: selectedEmployee.status === 'active' ? '#d4edda' : '#fff3cd',
                    color: selectedEmployee.status === 'active' ? '#155724' : '#856404'
                  }}>
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}