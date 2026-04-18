import { useState, useEffect } from "react"
import {
  FiPlus, FiTrash2, FiEdit, FiX, FiSave, FiRefreshCw, FiExternalLink,
  FiCheck, FiAlertCircle, FiGlobe, FiInfo, FiTool, FiPackage, FiLifeBuoy, 
  FiFileText, FiShare2, FiPlusCircle, FiSearch, FiGrid, FiList,
  FiPhone, FiMail, FiMapPin, FiShield, FiLink, FiHome, FiBriefcase
} from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CATEGORIES = ['Company', 'Services', 'Products', 'Support', 'Legal', 'Social', 'Contact']

const CATEGORY_CONFIG = {
  Company: { icon: FiBuilding, color: '#10b981', bg: '#ecfdf5' },
  Services: { icon: FiTool, color: '#3b82f6', bg: '#eff6ff' },
  Products: { icon: FiPackage, color: '#8b5cf6', bg: '#f3e8ff' },
  Support: { icon: FiLifeBuoy, color: '#f59e0b', bg: '#fffbeb' },
  Legal: { icon: FiShield, color: '#ef4444', bg: '#fef2f2' },
  Social: { icon: FiShare2, color: '#06b6d4', bg: '#ecfeff' },
  Contact: { icon: FiPhone, color: '#ec4899', bg: '#fdf2f8' }
}

function FiBuilding(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
}

export default function FooterManager() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    category: 'Company',
    title: '',
    url: '',
    order: 0,
    isActive: true,
    openInNewTab: false
  })
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadLinks()
  }, [])

  const loadLinks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/footer/all`)
      if (!response.ok) throw new Error('Failed to load links')
      const data = await response.json()
      setLinks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      
      const url = editId 
        ? `${API_URL}/footer/${editId}`
        : `${API_URL}/footer`
      
      const method = editId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      if (!response.ok) throw new Error('Failed to save')
      
      await loadLinks()
      closeModal()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this link?')) return
    
    try {
      const response = await fetch(`${API_URL}/footer/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete')
      
      await loadLinks()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (link) => {
    setEditId(link._id)
    setForm({
      category: link.category,
      title: link.title,
      url: link.url,
      order: link.order,
      isActive: link.isActive,
      openInNewTab: link.openInNewTab || false
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setForm({
      category: 'Company',
      title: '',
      url: '',
      order: 0,
      isActive: true,
      openInNewTab: false
    })
  }

  const openAddModal = (category = 'Company') => {
    const maxOrder = links.filter(l => l.category === category).length
    setForm(prev => ({ ...prev, category, order: maxOrder }))
    setShowModal(true)
  }

  const filteredLinks = activeCategory === 'All' 
    ? links 
    : links.filter(l => l.category === activeCategory)

  const searchedLinks = searchQuery
    ? filteredLinks.filter(l => 
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.url.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredLinks

  const groupedLinks = {}
  CATEGORIES.forEach(cat => {
    groupedLinks[cat] = searchedLinks.filter(l => l.category === cat)
  })

  const getCategoryConfig = (category) => {
    return CATEGORY_CONFIG[category] || { icon: FiLink, color: '#6b7280', bg: '#f3f4f6' }
  }

  return (
    <div className="footer-manager">
      {/* Header */}
      <div className="fm-header">
        <div className="fm-header-left">
          <div className="fm-header-icon">
            <FiGlobe size={24} />
          </div>
          <div>
            <h1>Footer Manager</h1>
            <p>Manage your website footer links</p>
          </div>
        </div>
        <div className="fm-header-actions">
          <button className="fm-btn fm-btn-secondary" onClick={loadLinks}>
            <FiRefreshCw size={18} /> Refresh
          </button>
          <button className="fm-btn fm-btn-primary" onClick={() => openAddModal()}>
            <FiPlusCircle size={18} /> Add Link
          </button>
        </div>
      </div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="fm-alert fm-alert-error"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FiAlertCircle size={18} /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Bar */}
      <div className="fm-filters">
        <div className="fm-search">
          <FiSearch className="fm-search-icon" />
          <input 
            type="text" 
            placeholder="Search links..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="fm-category-tabs">
          <button 
            className={`fm-tab ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => setActiveCategory('All')}
          >
            <FiGrid size={16} /> All
          </button>
          {CATEGORIES.map(cat => {
            const config = getCategoryConfig(cat)
            return (
              <button 
                key={cat}
                className={`fm-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                style={{ '--tab-color': config.color, '--tab-bg': config.bg }}
              >
                <config.icon size={16} /> {cat}
              </button>
            )
          })}
        </div>
        <div className="fm-view-toggle">
          <button 
            className={`fm-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FiGrid size={18} />
          </button>
          <button 
            className={`fm-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FiList size={18} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="fm-stats">
        <div className="fm-stat">
          <span className="fm-stat-value">{links.length}</span>
          <span className="fm-stat-label">Total Links</span>
        </div>
        <div className="fm-stat">
          <span className="fm-stat-value">{links.filter(l => l.isActive).length}</span>
          <span className="fm-stat-label">Active</span>
        </div>
        <div className="fm-stat">
          <span className="fm-stat-value">{CATEGORIES.length}</span>
          <span className="fm-stat-label">Categories</span>
        </div>
      </div>

      {/* Content */}
      <div className="fm-content">
        {loading ? (
          <div className="fm-loading">
            <div className="fm-spinner"></div>
            <p>Loading links...</p>
          </div>
        ) : searchedLinks.length === 0 ? (
          <div className="fm-empty">
            <div className="fm-empty-icon">
              <FiGlobe size={48} />
            </div>
            <h3>No Links Found</h3>
            <p>{searchQuery ? 'Try a different search term' : 'Start by adding your first footer link'}</p>
            {!searchQuery && (
              <button className="fm-btn fm-btn-primary" onClick={() => openAddModal()}>
                <FiPlusCircle size={18} /> Add First Link
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'fm-grid' : 'fm-list'}>
            {CATEGORIES.map(category => {
              const categoryLinks = groupedLinks[category]
              if (activeCategory !== 'All' && activeCategory !== category) return null
              if (categoryLinks.length === 0) return null
              
              const config = getCategoryConfig(category)
              
              return (
                <div key={category} className="fm-category">
                  <div className="fm-category-header" style={{ background: config.bg }}>
                    <div className="fm-category-title">
                      <config.icon style={{ color: config.color }} />
                      <h3>{category}</h3>
                      <span className="fm-count">{categoryLinks.length}</span>
                    </div>
                    <button 
                      className="fm-btn fm-btn-sm fm-btn-secondary"
                      onClick={() => openAddModal(category)}
                    >
                      <FiPlus size={14} /> Add
                    </button>
                  </div>
                  
                  <div className="fm-links">
                    {categoryLinks.sort((a, b) => a.order - b.order).map(link => (
                      <motion.div 
                        key={link._id} 
                        className={`fm-link-card ${!link.isActive ? 'inactive' : ''}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <div className="fm-link-icon" style={{ background: config.bg, color: config.color }}>
                          <config.icon size={18} />
                        </div>
                        <div className="fm-link-info">
                          <h4>{link.title}</h4>
                          <p>{link.url}</p>
                        </div>
                        <div className="fm-link-meta">
                          <span className="fm-badge">#{link.order}</span>
                          {link.isActive ? (
                            <span className="fm-status fm-status-active">
                              <FiCheck size={14} /> Active
                            </span>
                          ) : (
                            <span className="fm-status fm-status-inactive">
                              <FiX size={14} /> Inactive
                            </span>
                          )}
                          {link.openInNewTab && (
                            <span className="fm-badge fm-badge-external">
                              <FiExternalLink size={12} />
                            </span>
                          )}
                        </div>
                        <div className="fm-link-actions">
                          <button 
                            className="fm-action-btn fm-action-edit"
                            onClick={() => handleEdit(link)}
                            title="Edit"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button 
                            className="fm-action-btn fm-action-delete"
                            onClick={() => handleDelete(link._id)}
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fm-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div 
              className="fm-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="fm-modal-header">
                <h2>{editId ? 'Edit Link' : 'Add New Link'}</h2>
                <button className="fm-modal-close" onClick={closeModal}>
                  <FiX size={20} />
                </button>
              </div>
              
              <form className="fm-form" onSubmit={handleSubmit}>
                <div className="fm-form-group">
                  <label>Category</label>
                  <select 
                    value={form.category} 
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    {CATEGORIES.map(cat => {
                      const config = getCategoryConfig(cat)
                      return (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      )
                    })}
                  </select>
                </div>

                <div className="fm-form-row">
                  <div className="fm-form-group">
                    <label>Title *</label>
                    <input 
                      type="text"
                      value={form.title} 
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g., About Us"
                      required
                    />
                  </div>
                  <div className="fm-form-group">
                    <label>URL *</label>
                    <input 
                      type="text"
                      value={form.url} 
                      onChange={e => setForm({ ...form, url: e.target.value })}
                      placeholder="e.g., /about or https://..."
                      required
                    />
                  </div>
                </div>

                <div className="fm-form-group">
                  <label>Display Order</label>
                  <input 
                    type="number"
                    value={form.order} 
                    onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                  <small>Lower numbers appear first</small>
                </div>

                <div className="fm-form-toggles">
                  <label className="fm-toggle">
                    <input 
                      type="checkbox"
                      checked={form.isActive}
                      onChange={e => setForm({ ...form, isActive: e.target.checked })}
                    />
                    <span className="fm-toggle-slider"></span>
                    <span>Active</span>
                  </label>
                  <label className="fm-toggle">
                    <input 
                      type="checkbox"
                      checked={form.openInNewTab}
                      onChange={e => setForm({ ...form, openInNewTab: e.target.checked })}
                    />
                    <span className="fm-toggle-slider"></span>
                    <span>Open in New Tab</span>
                  </label>
                </div>

                <div className="fm-form-actions">
                  <button type="button" className="fm-btn fm-btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="fm-btn fm-btn-primary" disabled={saving}>
                    {saving ? (
                      <>
                        <span className="fm-spinner-sm"></span> Saving...
                      </>
                    ) : (
                      <>
                        <FiSave size={18} /> Save
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .footer-manager {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Header */
        .fm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .fm-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .fm-header-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
        }

        .fm-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .fm-header p {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 4px 0 0 0;
        }

        .fm-header-actions {
          display: flex;
          gap: 12px;
        }

        /* Buttons */
        .fm-btn {
          padding: 12px 20px;
          border: none;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .fm-btn-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
        }

        .fm-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .fm-btn-secondary {
          background: #f3f4f6;
          color: #4b5563;
        }

        .fm-btn-secondary:hover {
          background: #e5e7eb;
        }

        .fm-btn-sm {
          padding: 8px 14px;
          font-size: 0.8rem;
        }

        /* Alert */
        .fm-alert {
          padding: 14px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .fm-alert-error {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        /* Stats */
        .fm-stats {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .fm-stat {
          background: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .fm-stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #10b981;
        }

        .fm-stat-label {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 500;
        }

        /* Filters */
        .fm-filters {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .fm-search {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .fm-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .fm-search input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .fm-search input:focus {
          outline: none;
          border-color: #10b981;
        }

        .fm-category-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .fm-tab {
          padding: 10px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          background: white;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          color: #6b7280;
        }

        .fm-tab:hover {
          border-color: #d1d5db;
          background: #f9fafb;
        }

        .fm-tab.active {
          border-color: var(--tab-color, #10b981);
          background: var(--tab-bg, #ecfdf5);
          color: var(--tab-color, #10b981);
        }

        .fm-view-toggle {
          display: flex;
          background: #f3f4f6;
          border-radius: 10px;
          padding: 4px;
        }

        .fm-view-btn {
          padding: 8px 12px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .fm-view-btn.active {
          background: white;
          color: #10b981;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Content */
        .fm-content {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }

        /* Loading */
        .fm-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px;
          gap: 16px;
        }

        .fm-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5e7eb;
          border-top-color: #10b981;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .fm-spinner-sm {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .fm-loading p {
          color: #6b7280;
          font-size: 0.9rem;
        }

        /* Empty State */
        .fm-empty {
          text-align: center;
          padding: 60px;
        }

        .fm-empty-icon {
          width: 80px;
          height: 80px;
          background: #ecfdf5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #10b981;
        }

        .fm-empty h3 {
          font-size: 1.25rem;
          color: #1a1a2e;
          margin: 0 0 8px 0;
        }

        .fm-empty p {
          color: #6b7280;
          margin: 0 0 20px 0;
        }

        /* Grid View */
        .fm-grid {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .fm-category {
          background: #f9fafb;
          border-radius: 16px;
          padding: 20px;
        }

        .fm-category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .fm-category-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .fm-category-title h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .fm-count {
          background: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
        }

        .fm-links {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 12px;
        }

        .fm-link-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          background: white;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .fm-link-card:hover {
          border-color: #10b981;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.1);
        }

        .fm-link-card.inactive {
          opacity: 0.6;
          background: #fef2f2;
        }

        .fm-link-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .fm-link-info {
          flex: 1;
          min-width: 0;
        }

        .fm-link-info h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .fm-link-info p {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .fm-link-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-end;
        }

        .fm-badge {
          padding: 4px 8px;
          background: #f3f4f6;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .fm-badge-external {
          background: #eff6ff;
          color: #3b82f6;
        }

        .fm-status {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .fm-status-active {
          color: #10b981;
        }

        .fm-status-inactive {
          color: #ef4444;
        }

        .fm-link-actions {
          display: flex;
          gap: 8px;
        }

        .fm-action-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .fm-action-edit {
          background: #eff6ff;
          color: #3b82f6;
        }

        .fm-action-edit:hover {
          background: #3b82f6;
          color: white;
        }

        .fm-action-delete {
          background: #fef2f2;
          color: #ef4444;
        }

        .fm-action-delete:hover {
          background: #ef4444;
          color: white;
        }

        /* Modal */
        .fm-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }

        .fm-modal {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
        }

        .fm-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 28px;
          border-bottom: 1px solid #e5e7eb;
        }

        .fm-modal-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .fm-modal-close {
          width: 40px;
          height: 40px;
          border: none;
          background: #f3f4f6;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: all 0.2s;
        }

        .fm-modal-close:hover {
          background: #fee2e2;
          color: #ef4444;
        }

        .fm-form {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .fm-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .fm-form-group label {
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
        }

        .fm-form-group input,
        .fm-form-group select {
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .fm-form-group input:focus,
        .fm-form-group select:focus {
          outline: none;
          border-color: #10b981;
        }

        .fm-form-group small {
          color: #9ca3af;
          font-size: 0.75rem;
        }

        .fm-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .fm-form-toggles {
          display: flex;
          gap: 24px;
        }

        .fm-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-weight: 500;
          color: #374151;
        }

        .fm-toggle input {
          display: none;
        }

        .fm-toggle-slider {
          width: 48px;
          height: 26px;
          background: #d1d5db;
          border-radius: 13px;
          position: relative;
          transition: all 0.3s;
        }

        .fm-toggle-slider::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          top: 3px;
          left: 3px;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .fm-toggle input:checked + .fm-toggle-slider {
          background: #10b981;
        }

        .fm-toggle input:checked + .fm-toggle-slider::before {
          transform: translateX(22px);
        }

        .fm-form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 8px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .fm-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          
          .fm-header-actions {
            width: 100%;
          }
          
          .fm-filters {
            flex-direction: column;
            align-items: stretch;
          }
          
          .fm-category-tabs {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
          }
          
          .fm-stats {
            flex-wrap: wrap;
          }
          
          .fm-form-row {
            grid-template-columns: 1fr;
          }
          
          .fm-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
