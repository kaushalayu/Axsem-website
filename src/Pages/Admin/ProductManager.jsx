import { useState, useEffect } from "react"
import { FiPlus, FiTrash2, FiEdit, FiX, FiSave, FiCpu } from "react-icons/fi"
import { api } from "../../services/api"

export default function ProductManager() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '', tagline: '', description: '', icon: 'FiCpu', color: '#f05a28', 
    category: 'Business', tag: '', path: '', order: 0, isActive: true
  })

  useEffect(() => { loadProducts() }, [])

  const loadProducts = () => api.getProducts().then(data => {
    setProducts(data?.data || data || [])
    setLoading(false)
  }).catch(() => { setProducts([]); setLoading(false) })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editItem?._id) {
        await api.updateProduct(editItem._id, formData)
      } else {
        await api.addProduct(formData)
      }
      setShowForm(false)
      setEditItem(null)
      setFormData({ name: '', tagline: '', description: '', icon: 'FiCpu', color: '#f05a28', category: 'Business', tag: '', path: '', order: 0, isActive: true })
      loadProducts()
    } catch (err) { alert('Error: ' + err.message) }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this product?')) {
      await api.deleteProduct(id)
      loadProducts()
    }
  }

  const handleEdit = (p) => {
    setEditItem(p)
    setFormData({ ...p })
    setShowForm(true)
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Products</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => { setShowForm(true); setEditItem(null); setFormData({ name: '', tagline: '', description: '', icon: 'FiCpu', color: '#f05a28', category: 'Business', tag: '', path: '', order: 0, isActive: true }) }}>
          <FiPlus /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <h3>{editItem?._id ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="text" placeholder="Tagline" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="text" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="text" placeholder="Icon Name (e.g. FiCpu)" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="text" placeholder="Color (e.g. #f05a28)" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
                <option value="Business">Business</option>
                <option value="Industry">Industry</option>
                <option value="Education">Education</option>
              </select>
              <input type="text" placeholder="Tag (e.g. 50+ Agencies)" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="text" placeholder="Path (e.g. /products/tour)" value={formData.path} onChange={e => setFormData({...formData, path: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
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
        {loading ? <div className="admin-empty">Loading...</div> : products.length === 0 ? (
          <div className="admin-empty">No products yet</div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Category</th><th>Tag</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td><strong>{p.name}</strong><br/><small>{p.tagline}</small></td>
                  <td>{p.category}</td>
                  <td>{p.tag}</td>
                  <td>{p.order}</td>
                  <td><span style={{ padding: '3px 8px', borderRadius: '4px', background: p.isActive ? '#d4edda' : '#f8d7da', color: p.isActive ? '#155724' : '#721c24' }}>{p.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <button className="admin-btn" onClick={() => handleEdit(p)}><FiEdit /></button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(p._id)}><FiTrash2 /></button>
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