import { useState, useEffect } from "react"
import { FiPlus, FiTrash2, FiEdit, FiSave, FiVideo, FiMessageSquare } from "react-icons/fi"
import { api } from "../../services/api"

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '', role: '', company: '', color: '#f05a28', rating: 5,
    review: '', type: 'text', videoUrl: '', thumbnail: '', project: '',
    location: '', order: 0, isActive: true
  })

  useEffect(() => { loadTestimonials() }, [])

  const loadTestimonials = () => api.getTestimonials().then(data => {
    setTestimonials(data?.data || data || [])
    setLoading(false)
  }).catch(() => { setTestimonials([]); setLoading(false) })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editItem?._id) {
        await api.updateTestimonial(editItem._id, formData)
      } else {
        await api.addTestimonial(formData)
      }
      setShowForm(false)
      setEditItem(null)
      setFormData({ name: '', role: '', company: '', color: '#f05a28', rating: 5, review: '', type: 'text', videoUrl: '', thumbnail: '', project: '', location: '', order: 0, isActive: true })
      loadTestimonials()
    } catch (err) { alert('Error: ' + err.message) }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this testimonial?')) {
      await api.deleteTestimonial(id)
      loadTestimonials()
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
        <h1>Testimonials</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => { setShowForm(true); setEditItem(null); setFormData({ name: '', role: '', company: '', color: '#f05a28', rating: 5, review: '', type: 'text', videoUrl: '', thumbnail: '', project: '', location: '', order: 0, isActive: true }) }}>
          <FiPlus /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <h3>{editItem?._id ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="text" placeholder="Role (e.g. CEO, Company Name)" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="text" placeholder="Color (e.g. #f05a28)" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
                <option value="text">Text Review</option>
                <option value="video">Video Testimonial</option>
              </select>
              {formData.type === 'video' && (
                <>
                  <input type="text" placeholder="Video URL (mp4 link)" value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', gridColumn: 'span 2' }} />
                  <input type="text" placeholder="Thumbnail URL" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', gridColumn: 'span 2' }} />
                </>
              )}
              <textarea placeholder="Review Text" value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})} rows="3" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', gridColumn: 'span 2' }} />
              <input type="text" placeholder="Project" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="text" placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
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
        {loading ? <div className="admin-empty">Loading...</div> : testimonials.length === 0 ? (
          <div className="admin-empty">No testimonials yet</div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Type</th><th>Review</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {testimonials.map(t => (
                <tr key={t._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color || '#f05a28', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>{t.name?.slice(0,2).toUpperCase()}</span>
                      <div>
                        <strong>{t.name}</strong><br/>
                        <small>{t.role}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    {t.type === 'video' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '4px', background: '#ede9fe', color: '#6b21a8' }}>
                        <FiVideo size={14} /> Video
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '4px', background: '#d1fae5', color: '#065f46' }}>
                        <FiMessageSquare size={14} /> Text
                      </span>
                    )}
                  </td>
                  <td style={{ maxWidth: '200px' }}>{t.review?.slice(0, 60)}{t.review?.length > 60 ? '...' : ''}</td>
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
        )}
      </div>
    </div>
  )
}