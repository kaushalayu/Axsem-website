import { useState, useEffect } from "react"
import { FiPlus, FiTrash2, FiEdit, FiSave } from "react-icons/fi"
import { api } from "../../services/api"

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Mobile', 'AI/ML', 'Other']

export default function TechStackManager() {
  const [techs, setTechs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '', category: 'Frontend', color: '#666', order: 0, isActive: true
  })

  useEffect(() => { loadTechs() }, [])

  const loadTechs = () => api.getTechStack().then(data => {
    setTechs(data?.data || data || [])
    setLoading(false)
  }).catch(() => { setTechs([]); setLoading(false) })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editItem?._id) {
        await api.updateTechStack(editItem._id, formData)
      } else {
        await api.addTechStack(formData)
      }
      setShowForm(false)
      setEditItem(null)
      setFormData({ name: '', category: 'Frontend', color: '#666', order: 0, isActive: true })
      loadTechs()
    } catch (err) { alert('Error: ' + err.message) }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this technology?')) {
      await api.deleteTechStack(id)
      loadTechs()
    }
  }

  const handleEdit = (t) => {
    setEditItem(t)
    setFormData({ ...t })
    setShowForm(true)
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Tech Stack</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => { setShowForm(true); setEditItem(null); setFormData({ name: '', category: 'Frontend', color: '#666', order: 0, isActive: true }) }}>
          <FiPlus /> Add Technology
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <h3>{editItem?._id ? 'Edit Technology' : 'Add New Technology'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <input type="text" placeholder="Technology Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="text" placeholder="Color (e.g. #61DAFB)" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
                Active
              </label>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="admin-btn admin-btn-primary"><FiSave /> Save</button>
              <button type="button" className="admin-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        {loading ? <div className="admin-empty">Loading...</div> : techs.length === 0 ? (
          <div className="admin-empty">No technologies yet</div>
        ) : (
          <>
            {CATEGORIES.map(cat => {
              const catTechs = techs.filter(t => t.category === cat)
              if (catTechs.length === 0) return null
              return (
                <div key={cat} style={{ marginBottom: '20px' }}>
                  <h4 style={{ marginBottom: '10px', color: '#333' }}>{cat}</h4>
                  <table className="admin-table">
                    <thead><tr><th>Name</th><th>Color</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {catTechs.map(t => (
                        <tr key={t._id}>
                          <td><strong>{t.name}</strong></td>
                          <td><span style={{ display: 'inline-block', width: '20px', height: '20px', background: t.color, borderRadius: '4px' }}></span> {t.color}</td>
                          <td>{t.order}</td>
                          <td><span style={{ padding: '3px 8px', borderRadius: '4px', background: t.isActive ? '#d4edda' : '#f8d7da', color: t.isActive ? '#155724' : '#721c24' }}>{t.isActive ? 'Active' : 'Inactive'}</span></td>
                          <td>
                            <button className="admin-btn" onClick={() => handleEdit(t)}><FiEdit /></button>
                            <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(t._id)}><FiTrash2 /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}