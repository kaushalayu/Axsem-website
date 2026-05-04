import { useState, useEffect } from "react"
import { FiPlus, FiTrash2, FiEdit, FiSave, FiVideo, FiMessageSquare, FiX, FiUpload } from "react-icons/fi"
import { api } from "../../services/api"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const BASE_URL = API_URL.replace('/api', '')

const emptyText = { name: '', role: '', color: '#f05a28', review: '', location: '', order: 0, isActive: true, type: 'text' }
const emptyVideo = { name: '', role: '', color: '#f05a28', review: '', location: '', order: 0, isActive: true, type: 'video', videoUrl: '', thumbnail: '' }

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('text') // 'text' | 'video'
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [formData, setFormData] = useState(emptyText)
  const [videoFile, setVideoFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')

  useEffect(() => { loadTestimonials() }, [])

  const loadTestimonials = () => {
    api.getTestimonials().then(data => {
      setTestimonials(data?.data || data || [])
      setLoading(false)
    }).catch(() => { setTestimonials([]); setLoading(false) })
  }

  const openAdd = () => {
    setEditItem(null)
    setFormData(tab === 'text' ? { ...emptyText } : { ...emptyVideo })
    setVideoFile(null)
    setUploadProgress('')
    setShowForm(true)
  }

  const openEdit = (t) => {
    setEditItem(t)
    setFormData({ ...t })
    setVideoFile(null)
    setUploadProgress('')
    setTab(t.type === 'video' ? 'video' : 'text')
    setShowForm(true)
  }

  const closeForm = () => { setShowForm(false); setEditItem(null); setVideoFile(null); setUploadProgress('') }

  const handleVideoUpload = async () => {
    if (!videoFile) return formData.videoUrl
    setUploading(true)
    setUploadProgress('Uploading...')
    try {
      const fd = new FormData()
      fd.append('video', videoFile)
      const res = await fetch(`${BASE_URL}/api/upload/video`, { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setUploadProgress('✅ Uploaded!')
      return data.url
    } catch (err) {
      setUploadProgress('❌ Upload failed: ' + err.message)
      throw err
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let finalData = { ...formData }
      if (tab === 'video' && videoFile) {
        finalData.videoUrl = await handleVideoUpload()
      }
      if (editItem?._id) {
        await api.updateTestimonial(editItem._id, finalData)
      } else {
        await api.addTestimonial(finalData)
      }
      closeForm()
      loadTestimonials()
    } catch (err) {
      if (!uploadProgress.includes('failed')) alert('Error: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this testimonial?')) {
      await api.deleteTestimonial(id)
      loadTestimonials()
    }
  }

  const set = (key, val) => setFormData(p => ({ ...p, [key]: val }))

  const filtered = testimonials.filter(t => (tab === 'video' ? t.type === 'video' : t.type !== 'video'))

  const inputStyle = { padding: '9px 12px', border: '1px solid #ddd', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }
  const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }

  return (
    <div>
      <div className="admin-header">
        <h1>Testimonials</h1>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}><FiPlus /> Add {tab === 'text' ? 'Text' : 'Video'}</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          className={`admin-btn ${tab === 'text' ? 'admin-btn-primary' : ''}`}
          onClick={() => { setTab('text'); setShowForm(false) }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <FiMessageSquare /> Text Reviews ({testimonials.filter(t => t.type !== 'video').length})
        </button>
        <button
          className={`admin-btn ${tab === 'video' ? 'admin-btn-primary' : ''}`}
          onClick={() => { setTab('video'); setShowForm(false) }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <FiVideo /> Video Testimonials ({testimonials.filter(t => t.type === 'video').length})
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0 }}>{editItem ? 'Edit' : 'Add'} {tab === 'text' ? 'Text Review' : 'Video Testimonial'}</h3>
            <button className="admin-btn" onClick={closeForm}><FiX /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={gridStyle}>
              <input style={inputStyle} placeholder="Name *" value={formData.name} onChange={e => set('name', e.target.value)} required />
              <input style={inputStyle} placeholder="Role (e.g. CEO, Company Name)" value={formData.role} onChange={e => set('role', e.target.value)} />
              <input style={inputStyle} placeholder="Location" value={formData.location} onChange={e => set('location', e.target.value)} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '13px', color: '#666' }}>Color:</label>
                <input type="color" value={formData.color} onChange={e => set('color', e.target.value)} style={{ width: '50px', height: '36px', border: 'none', cursor: 'pointer' }} />
                <input style={{ ...inputStyle, flex: 1 }} placeholder="#f05a28" value={formData.color} onChange={e => set('color', e.target.value)} />
              </div>
              <input type="number" style={inputStyle} placeholder="Order" value={formData.order} onChange={e => set('order', parseInt(e.target.value) || 0)} />
            </div>

            <textarea
              style={{ ...inputStyle, marginBottom: '12px', resize: 'vertical' }}
              placeholder="Review text..."
              value={formData.review}
              onChange={e => set('review', e.target.value)}
              rows={3}
            />

            {/* Video specific fields */}
            {tab === 'video' && (
              <div style={{ background: '#f8f4ff', border: '1px solid #e0d4ff', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
                <p style={{ margin: '0 0 10px', fontWeight: '600', color: '#6b21a8', fontSize: '14px' }}>📹 Video Upload</p>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '6px' }}>Upload Video File (mp4, webm, mov — max 100MB)</label>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/avi"
                    onChange={e => { setVideoFile(e.target.files[0]); setUploadProgress('') }}
                    style={{ ...inputStyle, padding: '6px' }}
                  />
                  {videoFile && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6b21a8' }}>Selected: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(1)} MB)</p>}
                  {uploadProgress && <p style={{ margin: '4px 0 0', fontSize: '12px', color: uploadProgress.includes('❌') ? 'red' : '#0e9e6e' }}>{uploadProgress}</p>}
                </div>
                {!videoFile && (
                  <div>
                    <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '6px' }}>Or paste Video URL</label>
                    <input style={inputStyle} placeholder="https://... (existing video URL)" value={formData.videoUrl} onChange={e => set('videoUrl', e.target.value)} />
                  </div>
                )}
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '6px' }}>Thumbnail URL (optional)</label>
                  <input style={inputStyle} placeholder="https://... thumbnail image" value={formData.thumbnail} onChange={e => set('thumbnail', e.target.value)} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={uploading}>
                {uploading ? <><FiUpload /> Uploading...</> : <><FiSave /> Save</>}
              </button>
              <button type="button" className="admin-btn" onClick={closeForm}>Cancel</button>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.isActive} onChange={e => set('isActive', e.target.checked)} />
                Active
              </label>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="admin-card">
        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">No {tab === 'text' ? 'text reviews' : 'video testimonials'} yet</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>{tab === 'video' ? 'Video' : 'Review'}</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color || '#f05a28', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>
                        {t.name?.slice(0, 2).toUpperCase()}
                      </span>
                      <div>
                        <strong>{t.name}</strong><br />
                        <small style={{ color: '#666' }}>{t.role}</small>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: '250px' }}>
                    {tab === 'video' ? (
                      t.videoUrl ? (
                        <video src={t.videoUrl} style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '4px', background: '#000' }} controls={false} muted />
                      ) : <span style={{ color: '#999', fontSize: '13px' }}>No video</span>
                    ) : (
                      <span style={{ fontSize: '13px', color: '#444' }}>{t.review?.slice(0, 80)}{t.review?.length > 80 ? '...' : ''}</span>
                    )}
                  </td>
                  <td>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '12px', background: t.isActive ? '#d4edda' : '#f8d7da', color: t.isActive ? '#155724' : '#721c24' }}>
                      {t.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="admin-btn" onClick={() => openEdit(t)}><FiEdit /></button>
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
