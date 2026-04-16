import { useState, useEffect } from "react"
import {
  FiPlus, FiTrash2, FiEdit, FiX, FiSave, FiChevronDown,
  FiMenu, FiLink, FiExternalLink, FiCheck, FiAlertCircle, FiRefreshCw,
  FiArrowUp, FiArrowDown, FiHome, FiInfo, FiSettings, FiPackage, FiFolder,
  FiCpu, FiFileText, FiBriefcase, FiMail, FiUsers, FiCode, FiSmartphone,
  FiLayout, FiTrendingUp, FiGlobe, FiShield, FiShoppingCart, FiBook,
  FiTarget, FiDollarSign, FiCloud, FiTool, FiSearch, FiPlusCircle,
  FiMinusCircle, FiToggleLeft, FiToggleRight, FiList, FiGrid
} from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CATEGORIES = ['Services', 'Products', 'Company', 'Quick Links', 'Packages', 'Resources']

const CATEGORY_CONFIG = {
  Services: { icon: FiTool, color: '#3b82f6', bg: '#eff6ff' },
  Products: { icon: FiPackage, color: '#8b5cf6', bg: '#f3e8ff' },
  Company: { icon: FiBuilding, color: '#10b981', bg: '#ecfdf5' },
  'Quick Links': { icon: FiLink, color: '#f59e0b', bg: '#fffbeb' },
  Packages: { icon: FiShoppingCart, color: '#ef4444', bg: '#fef2f2' },
  Resources: { icon: FiBook, color: '#06b6d4', bg: '#ecfeff' }
}

const ICON_OPTIONS = [
  { name: 'FiHome', label: 'Home', icon: <FiHome size={18} /> },
  { name: 'FiInfo', label: 'Info', icon: <FiInfo size={18} /> },
  { name: 'FiSettings', label: 'Settings', icon: <FiSettings size={18} /> },
  { name: 'FiPackage', label: 'Package', icon: <FiPackage size={18} /> },
  { name: 'FiFolder', label: 'Folder', icon: <FiFolder size={18} /> },
  { name: 'FiCpu', label: 'CPU', icon: <FiCpu size={18} /> },
  { name: 'FiFileText', label: 'File', icon: <FiFileText size={18} /> },
  { name: 'FiBriefcase', label: 'Briefcase', icon: <FiBriefcase size={18} /> },
  { name: 'FiMail', label: 'Mail', icon: <FiMail size={18} /> },
  { name: 'FiUsers', label: 'Users', icon: <FiUsers size={18} /> },
  { name: 'FiCode', label: 'Code', icon: <FiCode size={18} /> },
  { name: 'FiSmartphone', label: 'Mobile', icon: <FiSmartphone size={18} /> },
  { name: 'FiLayout', label: 'Layout', icon: <FiLayout size={18} /> },
  { name: 'FiTrendingUp', label: 'Trend', icon: <FiTrendingUp size={18} /> },
  { name: 'FiGlobe', label: 'Globe', icon: <FiGlobe size={18} /> },
  { name: 'FiShield', label: 'Shield', icon: <FiShield size={18} /> },
  { name: 'FiShoppingCart', label: 'Cart', icon: <FiShoppingCart size={18} /> },
  { name: 'FiBook', label: 'Book', icon: <FiBook size={18} /> },
  { name: 'FiTarget', label: 'Target', icon: <FiTarget size={18} /> },
  { name: 'FiDollarSign', label: 'Money', icon: <FiDollarSign size={18} /> },
  { name: 'FiCloud', label: 'Cloud', icon: <FiCloud size={18} /> },
  { name: 'FiSearch', label: 'Search', icon: <FiSearch size={18} /> },
]

function FiBuilding(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
}

export default function NavbarManager() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    category: 'Services',
    title: '',
    url: '',
    icon: '',
    order: 0,
    isActive: true,
    openInNewTab: false,
    parentId: ''
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
      const response = await fetch(`${API_URL}/api/navbar/all`)
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
        ? `${API_URL}/api/navbar/${editId}`
        : `${API_URL}/api/navbar`
      
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
    if (!confirm('Delete this link? It will also delete any child links.')) return
    
    try {
      const response = await fetch(`${API_URL}/api/navbar/${id}`, {
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
      icon: link.icon || '',
      order: link.order,
      isActive: link.isActive,
      openInNewTab: link.openInNewTab || false,
      parentId: link.parentId || ''
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setForm({
      category: 'Services',
      title: '',
      url: '',
      icon: '',
      order: 0,
      isActive: true,
      openInNewTab: false,
      parentId: ''
    })
  }

  const openAddModal = (category = 'Services') => {
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

  const getIconComponent = (iconName) => {
    const icon = ICON_OPTIONS.find(i => i.name === iconName)
    return icon ? icon.icon : <FiLink size={18} />
  }

  const getCategoryConfig = (category) => {
    return CATEGORY_CONFIG[category] || { icon: FiLink, color: '#6b7280', bg: '#f3f4f6' }
  }

  return (
    <div className="navbar-manager">
      {/* Header */}
      <div className="nm-header">
        <div className="nm-header-left">
          <div className="nm-header-icon">
            <FiMenu size={24} />
          </div>
          <div>
            <h1>Navbar Manager</h1>
            <p>Manage your website navigation links</p>
          </div>
        </div>
        <div className="nm-header-actions">
          <button className="nm-btn nm-btn-secondary" onClick={loadLinks}>
            <FiRefreshCw size={18} /> Refresh
          </button>
          <button className="nm-btn nm-btn-primary" onClick={() => openAddModal()}>
            <FiPlusCircle size={18} /> Add Link
          </button>
        </div>
      </div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="nm-alert nm-alert-error"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FiAlertCircle size={18} /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Bar */}
      <div className="nm-filters">
        <div className="nm-search">
          <FiSearch className="nm-search-icon" />
          <input 
            type="text" 
            placeholder="Search links..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="nm-category-tabs">
          <button 
            className={`nm-tab ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => setActiveCategory('All')}
          >
            <FiGrid size={16} /> All
          </button>
          {CATEGORIES.map(cat => {
            const config = getCategoryConfig(cat)
            return (
              <button 
                key={cat}
                className={`nm-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                style={{ '--tab-color': config.color, '--tab-bg': config.bg }}
              >
                <config.icon size={16} /> {cat}
              </button>
            )
          })}
        </div>
        <div className="nm-view-toggle">
          <button 
            className={`nm-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FiGrid size={18} />
          </button>
          <button 
            className={`nm-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FiList size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="nm-content">
        {loading ? (
          <div className="nm-loading">
            <div className="nm-spinner"></div>
            <p>Loading links...</p>
          </div>
        ) : searchedLinks.length === 0 ? (
          <div className="nm-empty">
            <div className="nm-empty-icon">
              <FiMenu size={48} />
            </div>
            <h3>No Links Found</h3>
            <p>{searchQuery ? 'Try a different search term' : 'Start by adding your first navigation link'}</p>
            {!searchQuery && (
              <button className="nm-btn nm-btn-primary" onClick={() => openAddModal()}>
                <FiPlusCircle size={18} /> Add First Link
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'nm-grid' : 'nm-list'}>
            {CATEGORIES.map(category => {
              const categoryLinks = groupedLinks[category]
              if (activeCategory !== 'All' && activeCategory !== category) return null
              if (categoryLinks.length === 0) return null
              
              const config = getCategoryConfig(category)
              
              return (
                <div key={category} className="nm-category">
                  <div className="nm-category-header" style={{ background: config.bg }}>
                    <div className="nm-category-title">
                      <config.icon style={{ color: config.color }} />
                      <h3>{category}</h3>
                      <span className="nm-count">{categoryLinks.length}</span>
                    </div>
                    <button 
                      className="nm-btn nm-btn-sm nm-btn-secondary"
                      onClick={() => openAddModal(category)}
                    >
                      <FiPlus size={14} /> Add
                    </button>
                  </div>
                  
                  <div className="nm-links">
                    {categoryLinks.sort((a, b) => a.order - b.order).map(link => (
                      <motion.div 
                        key={link._id} 
                        className={`nm-link-card ${!link.isActive ? 'inactive' : ''}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <div className="nm-link-icon" style={{ background: config.bg, color: config.color }}>
                          {getIconComponent(link.icon)}
                        </div>
                        <div className="nm-link-info">
                          <h4>{link.title}</h4>
                          <p>{link.url}</p>
                        </div>
                        <div className="nm-link-meta">
                          <span className="nm-badge">#{link.order}</span>
                          {link.isActive ? (
                            <span className="nm-status nm-status-active">
                              <FiCheck size={14} /> Active
                            </span>
                          ) : (
                            <span className="nm-status nm-status-inactive">
                              <FiX size={14} /> Inactive
                            </span>
                          )}
                          {link.openInNewTab && (
                            <span className="nm-badge nm-badge-external">
                              <FiExternalLink size={12} />
                            </span>
                          )}
                        </div>
                        <div className="nm-link-actions">
                          <button 
                            className="nm-action-btn nm-action-edit"
                            onClick={() => handleEdit(link)}
                            title="Edit"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button 
                            className="nm-action-btn nm-action-delete"
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
            className="nm-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div 
              className="nm-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="nm-modal-header">
                <h2>{editId ? 'Edit Link' : 'Add New Link'}</h2>
                <button className="nm-modal-close" onClick={closeModal}>
                  <FiX size={20} />
                </button>
              </div>
              
              <form className="nm-form" onSubmit={handleSubmit}>
                <div className="nm-form-group">
                  <label>Category</label>
                  <select 
                    value={form.category} 
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="nm-form-row">
                  <div className="nm-form-group">
                    <label>Title *</label>
                    <input 
                      type="text"
                      value={form.title} 
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g., Web Development"
                      required
                    />
                  </div>
                  <div className="nm-form-group">
                    <label>URL *</label>
                    <input 
                      type="text"
                      value={form.url} 
                      onChange={e => setForm({ ...form, url: e.target.value })}
                      placeholder="e.g., /services/web"
                      required
                    />
                  </div>
                </div>

                <div className="nm-form-group">
                  <label>Icon</label>
                  <div className="nm-icon-grid">
                    <button
                      type="button"
                      className={`nm-icon-btn ${!form.icon ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, icon: '' })}
                    >
                      <FiLink size={18} />
                    </button>
                    {ICON_OPTIONS.map(icon => (
                      <button
                        key={icon.name}
                        type="button"
                        className={`nm-icon-btn ${form.icon === icon.name ? 'active' : ''}`}
                        onClick={() => setForm({ ...form, icon: icon.name })}
                        title={icon.label}
                      >
                        {icon.icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="nm-form-row">
                  <div className="nm-form-group">
                    <label>Order</label>
                    <input 
                      type="number"
                      value={form.order} 
                      onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                  <div className="nm-form-group">
                    <label>Parent Link</label>
                    <select 
                      value={form.parentId} 
                      onChange={e => setForm({ ...form, parentId: e.target.value})}
                    >
                      <option value="">None (Main Link)</option>
                      {links
                        .filter(l => l.category === form.category && !l.parentId && l._id !== editId)
                        .map(l => (
                          <option key={l._id} value={l._id}>{l.title}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="nm-form-toggles">
                  <label className="nm-toggle">
                    <input 
                      type="checkbox"
                      checked={form.isActive}
                      onChange={e => setForm({ ...form, isActive: e.target.checked })}
                    />
                    <span className="nm-toggle-slider"></span>
                    <span>Active</span>
                  </label>
                  <label className="nm-toggle">
                    <input 
                      type="checkbox"
                      checked={form.openInNewTab}
                      onChange={e => setForm({ ...form, openInNewTab: e.target.checked })}
                    />
                    <span className="nm-toggle-slider"></span>
                    <span>Open in New Tab</span>
                  </label>
                </div>

                <div className="nm-form-actions">
                  <button type="button" className="nm-btn nm-btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="nm-btn nm-btn-primary" disabled={saving}>
                    {saving ? (
                      <>
                        <span className="nm-spinner-sm"></span> Saving...
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
        .navbar-manager {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Header */
        .nm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .nm-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nm-header-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #f05a28 0%, #ff7a45 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 16px rgba(240, 90, 40, 0.3);
        }

        .nm-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .nm-header p {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 4px 0 0 0;
        }

        .nm-header-actions {
          display: flex;
          gap: 12px;
        }

        /* Buttons */
        .nm-btn {
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

        .nm-btn-primary {
          background: linear-gradient(135deg, #f05a28 0%, #ff7a45 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(240, 90, 40, 0.3);
        }

        .nm-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(240, 90, 40, 0.4);
        }

        .nm-btn-secondary {
          background: #f3f4f6;
          color: #4b5563;
        }

        .nm-btn-secondary:hover {
          background: #e5e7eb;
        }

        .nm-btn-sm {
          padding: 8px 14px;
          font-size: 0.8rem;
        }

        /* Alert */
        .nm-alert {
          padding: 14px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .nm-alert-error {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        /* Filters */
        .nm-filters {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .nm-search {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .nm-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .nm-search input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .nm-search input:focus {
          outline: none;
          border-color: #f05a28;
        }

        .nm-category-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .nm-tab {
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

        .nm-tab:hover {
          border-color: #d1d5db;
          background: #f9fafb;
        }

        .nm-tab.active {
          border-color: var(--tab-color, #f05a28);
          background: var(--tab-bg, #fff4f0);
          color: var(--tab-color, #f05a28);
        }

        .nm-view-toggle {
          display: flex;
          background: #f3f4f6;
          border-radius: 10px;
          padding: 4px;
        }

        .nm-view-btn {
          padding: 8px 12px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .nm-view-btn.active {
          background: white;
          color: #f05a28;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Content */
        .nm-content {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }

        /* Loading */
        .nm-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px;
          gap: 16px;
        }

        .nm-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5e7eb;
          border-top-color: #f05a28;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .nm-spinner-sm {
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

        .nm-loading p {
          color: #6b7280;
          font-size: 0.9rem;
        }

        /* Empty State */
        .nm-empty {
          text-align: center;
          padding: 60px;
        }

        .nm-empty-icon {
          width: 80px;
          height: 80px;
          background: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #9ca3af;
        }

        .nm-empty h3 {
          font-size: 1.25rem;
          color: #1a1a2e;
          margin: 0 0 8px 0;
        }

        .nm-empty p {
          color: #6b7280;
          margin: 0 0 20px 0;
        }

        /* Grid View */
        .nm-grid {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .nm-category {
          background: #f9fafb;
          border-radius: 16px;
          padding: 20px;
        }

        .nm-category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .nm-category-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nm-category-title h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .nm-count {
          background: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
        }

        .nm-links {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 12px;
        }

        .nm-link-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          background: white;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .nm-link-card:hover {
          border-color: #f05a28;
          box-shadow: 0 4px 16px rgba(240, 90, 40, 0.1);
        }

        .nm-link-card.inactive {
          opacity: 0.6;
          background: #fef2f2;
        }

        .nm-link-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nm-link-info {
          flex: 1;
          min-width: 0;
        }

        .nm-link-info h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nm-link-info p {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nm-link-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-end;
        }

        .nm-badge {
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

        .nm-badge-external {
          background: #eff6ff;
          color: #3b82f6;
        }

        .nm-status {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .nm-status-active {
          color: #10b981;
        }

        .nm-status-inactive {
          color: #ef4444;
        }

        .nm-link-actions {
          display: flex;
          gap: 8px;
        }

        .nm-action-btn {
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

        .nm-action-edit {
          background: #eff6ff;
          color: #3b82f6;
        }

        .nm-action-edit:hover {
          background: #3b82f6;
          color: white;
        }

        .nm-action-delete {
          background: #fef2f2;
          color: #ef4444;
        }

        .nm-action-delete:hover {
          background: #ef4444;
          color: white;
        }

        /* Modal */
        .nm-modal-overlay {
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

        .nm-modal {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
        }

        .nm-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 28px;
          border-bottom: 1px solid #e5e7eb;
        }

        .nm-modal-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .nm-modal-close {
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

        .nm-modal-close:hover {
          background: #fee2e2;
          color: #ef4444;
        }

        .nm-form {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .nm-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nm-form-group label {
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
        }

        .nm-form-group input,
        .nm-form-group select {
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .nm-form-group input:focus,
        .nm-form-group select:focus {
          outline: none;
          border-color: #f05a28;
        }

        .nm-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .nm-icon-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
        }

        .nm-icon-btn {
          width: 44px;
          height: 44px;
          border: 2px solid #e5e7eb;
          background: #f9fafb;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: all 0.2s;
        }

        .nm-icon-btn:hover {
          border-color: #d1d5db;
          background: white;
        }

        .nm-icon-btn.active {
          border-color: #f05a28;
          background: #fff4f0;
          color: #f05a28;
        }

        .nm-form-toggles {
          display: flex;
          gap: 24px;
        }

        .nm-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-weight: 500;
          color: #374151;
        }

        .nm-toggle input {
          display: none;
        }

        .nm-toggle-slider {
          width: 48px;
          height: 26px;
          background: #d1d5db;
          border-radius: 13px;
          position: relative;
          transition: all 0.3s;
        }

        .nm-toggle-slider::before {
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

        .nm-toggle input:checked + .nm-toggle-slider {
          background: #f05a28;
        }

        .nm-toggle input:checked + .nm-toggle-slider::before {
          transform: translateX(22px);
        }

        .nm-form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 8px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nm-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          
          .nm-header-actions {
            width: 100%;
          }
          
          .nm-filters {
            flex-direction: column;
            align-items: stretch;
          }
          
          .nm-category-tabs {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
          }
          
          .nm-form-row {
            grid-template-columns: 1fr;
          }
          
          .nm-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
