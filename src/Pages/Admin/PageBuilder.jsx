import { useState, useEffect } from "react"
import {
  FiPlus, FiTrash2, FiEdit, FiX, FiSave, FiRefreshCw,
  FiAlertCircle, FiSearch, FiGrid, FiList, FiCopy, FiExternalLink,
  FiChevronDown, FiChevronUp, FiImage, FiFileText, FiStar, FiHelpCircle,
  FiUsers, FiCreditCard, FiBarChart2, FiShoppingBag, FiPackage, FiLink, FiToggleLeft, FiToggleRight
} from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "../../Components/Toast"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const TEMPLATES = [
  { value: 'service', label: 'Service', icon: FiPackage, description: 'Services like Web Dev, SEO' },
  { value: 'product', label: 'Product', icon: FiShoppingBag, description: 'Products like CRM, LMS' },
  { value: 'landing', label: 'Landing', icon: FiGrid, description: 'Custom landing page' },
  { value: 'content', label: 'Content', icon: FiFileText, description: 'Blog, article pages' },
  { value: 'blank', label: 'Blank', icon: FiToggleLeft, description: 'Empty custom page' }
]

const SECTION_TYPES = [
  { value: 'features', label: 'Features', icon: FiStar, defaultTitle: 'Key Features' },
  { value: 'stats', label: 'Stats/Numbers', icon: FiBarChart2, defaultTitle: 'Our Impact' },
  { value: 'testimonials', label: 'Testimonials', icon: FiUsers, defaultTitle: 'What Clients Say' },
  { value: 'faq', label: 'FAQ', icon: FiHelpCircle, defaultTitle: 'Frequently Asked Questions' },
  { value: 'gallery', label: 'Gallery', icon: FiImage, defaultTitle: 'Our Work' },
  { value: 'content', label: 'Content Block', icon: FiFileText, defaultTitle: 'Custom Content' },
  { value: 'cta', label: 'Call to Action', icon: FiExternalLink, defaultTitle: 'Get Started' },
  { value: 'pricing', label: 'Pricing', icon: FiCreditCard, defaultTitle: 'Our Pricing' }
]

const DEFAULT_SECTIONS = {
  service: ['hero', 'features', 'content', 'cta', 'faq'],
  product: ['hero', 'features', 'pricing', 'cta', 'testimonials'],
  landing: ['hero'],
  content: ['hero', 'content'],
  blank: []
}

export default function PageBuilder() {
  const { addToast } = useToast()
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [filterStatus, setFilterStatus] = useState('all')

  const [form, setForm] = useState({
    slug: '',
    title: '',
    template: 'content',
    status: 'draft',
    seo: { title: '', description: '', keywords: '', ogImage: '' },
    hero: { heading: '', subheading: '', backgroundImage: '', ctaText: '', ctaLink: '', enabled: true },
    sections: [],
    sidebar: { enabled: false, links: [] },
    content: { description: '', body: '' }
  })

  useEffect(() => { loadPages() }, [])

  useEffect(() => {
    if (form.template && !editId) {
      const defaultSections = DEFAULT_SECTIONS[form.template] || []
      setForm(prev => ({
        ...prev,
        sections: defaultSections.map((type, index) => ({
          type,
          title: SECTION_TYPES.find(s => s.value === type)?.defaultTitle || '',
          enabled: true,
          order: index,
          content: { items: [], description: '' }
        }))
      }))
    }
  }, [form.template])

  const loadPages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/pages/all`)
      const data = await response.json()
      setPages(data)
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
      const url = editId ? `${API_URL}/pages/${editId}` : `${API_URL}/pages`
      const method = editId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      if (!response.ok) throw new Error('Failed to save')
      
      addToast(editId ? 'Page updated successfully!' : 'Page created successfully!', 'success')
      await loadPages()
      closeModal()
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this page?')) return
    try {
      await fetch(`${API_URL}/pages/${id}`, { method: 'DELETE' })
      addToast('Page deleted successfully!', 'success')
      await loadPages()
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  const handleEdit = async (page) => {
    setEditId(page._id)
    setForm({
      slug: page.slug,
      title: page.title,
      template: page.template,
      status: page.status,
      seo: page.seo || { title: '', description: '', keywords: '', ogImage: '' },
      hero: page.hero || { heading: '', subheading: '', backgroundImage: '', ctaText: '', ctaLink: '', enabled: true },
      sections: page.sections || [],
      sidebar: page.sidebar || { enabled: false, links: [] },
      content: page.content || { description: '', body: '' }
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setForm({
      slug: '',
      title: '',
      template: 'content',
      status: 'draft',
      seo: { title: '', description: '', keywords: '', ogImage: '' },
      hero: { heading: '', subheading: '', backgroundImage: '', ctaText: '', ctaLink: '', enabled: true },
      sections: [],
      sidebar: { enabled: false, links: [] },
      content: { description: '', body: '' }
    })
  }

  const addSection = (type) => {
    const sectionType = SECTION_TYPES.find(s => s.value === type)
    setForm(prev => ({
      ...prev,
      sections: [...prev.sections, {
        type,
        title: sectionType?.defaultTitle || '',
        enabled: true,
        order: prev.sections.length,
        content: { items: [], description: '' }
      }]
    }))
  }

  const updateSection = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      sections: prev.sections.map((s, i) => i === index ? { ...s, [field]: value } : s)
    }))
  }

  const updateSectionContent = (index, content) => {
    setForm(prev => ({
      ...prev,
      sections: prev.sections.map((s, i) => i === index ? { ...s, content } : s)
    }))
  }

  const removeSection = (index) => {
    setForm(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }))
  }

  const moveSection = (index, direction) => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === form.sections.length - 1) return
    
    setForm(prev => {
      const newSections = [...prev.sections]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      const temp = newSections[index]
      newSections[index] = newSections[targetIndex]
      newSections[targetIndex] = temp
      return { ...prev, sections: newSections }
    })
  }

  const filteredPages = pages.filter(p => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false
    if (searchQuery) {
      return p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true
  })

  const getTemplateIcon = (template) => TEMPLATES.find(t => t.value === template)?.icon || FiFileText

  return (
    <div className="page-builder">
      <div className="pb-header">
        <div className="pb-header-left">
          <div className="pb-header-icon">
            <FiFileText size={24} />
          </div>
          <div>
            <h1>Page Builder</h1>
            <p>Create and manage dynamic pages</p>
          </div>
        </div>
        <div className="pb-header-actions">
          <button className="pb-btn pb-btn-secondary" onClick={loadPages}>
            <FiRefreshCw size={18} /> Refresh
          </button>
          <button className="pb-btn pb-btn-primary" onClick={() => setShowModal(true)}>
            <FiPlus size={18} /> New Page
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div className="pb-alert pb-alert-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FiAlertCircle size={18} /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pb-filters">
        <div className="pb-search">
          <FiSearch className="pb-search-icon" />
          <input type="text" placeholder="Search pages..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <div className="pb-status-filters">
          <button className={`pb-status-btn ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}>All</button>
          <button className={`pb-status-btn ${filterStatus === 'published' ? 'active' : ''}`} onClick={() => setFilterStatus('published')}>Published</button>
          <button className={`pb-status-btn ${filterStatus === 'draft' ? 'active' : ''}`} onClick={() => setFilterStatus('draft')}>Draft</button>
        </div>
        <div className="pb-view-toggle">
          <button className={`pb-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><FiGrid size={18} /></button>
          <button className={`pb-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><FiList size={18} /></button>
        </div>
      </div>

      <div className="pb-content">
        {loading ? (
          <div className="pb-loading"><div className="pb-spinner"></div><p>Loading pages...</p></div>
        ) : filteredPages.length === 0 ? (
          <div className="pb-empty">
            <FiFileText size={48} />
            <h3>No Pages Found</h3>
            <p>{searchQuery ? 'Try a different search' : 'Create your first page'}</p>
            {!searchQuery && <button className="pb-btn pb-btn-primary" onClick={() => setShowModal(true)}><FiPlus size={18} /> Create Page</button>}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'pb-grid' : 'pb-list'}>
            {filteredPages.map(page => {
              const Icon = getTemplateIcon(page.template)
              return (
                <motion.div key={page._id} className={`pb-page-card ${page.status === 'draft' ? 'draft' : ''}`} layout>
                  <div className="pb-page-icon"><Icon size={20} /></div>
                  <div className="pb-page-info">
                    <h4>{page.title}</h4>
                    <p>{page.slug}</p>
                  </div>
                  <div className="pb-page-meta">
                    <span className={`pb-status-badge ${page.status}`}>{page.status}</span>
                    <span className="pb-template-badge">{page.template}</span>
                  </div>
                  <div className="pb-page-actions">
                    <button className="pb-action-btn" onClick={() => handleEdit(page)} title="Edit"><FiEdit size={16} /></button>
                    <button className="pb-action-btn pb-action-delete" onClick={() => handleDelete(page._id)} title="Delete"><FiTrash2 size={16} /></button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="pb-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.target === e.currentTarget && closeModal()}>
            <motion.div className="pb-modal" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div className="pb-modal-header">
                <h2>{editId ? 'Edit Page' : 'Create New Page'}</h2>
                <button className="pb-modal-close" onClick={closeModal}><FiX size={20} /></button>
              </div>

              <form className="pb-form" onSubmit={handleSubmit}>
                <div className="pb-form-section">
                  <h3>Basic Information</h3>
                  <div className="pb-form-row">
                    <div className="pb-form-group">
                      <label>Page Title *</label>
                      <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: form.slug || `/${e.target.value.toLowerCase().replace(/\s+/g, '-')}` })} required />
                    </div>
                    <div className="pb-form-group">
                      <label>URL Slug *</label>
                      <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required placeholder="/page-url" />
                    </div>
                  </div>
                  <div className="pb-form-row">
                    <div className="pb-form-group">
                      <label>Template</label>
                      <select value={form.template} onChange={e => setForm({ ...form, template: e.target.value })}>
                        {TEMPLATES.map(t => (
                          <option key={t.value} value={t.value}>{t.label} - {t.description}</option>
                        ))}
                      </select>
                    </div>
                    <div className="pb-form-group">
                      <label>Status</label>
                      <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pb-form-section">
                  <h3>SEO Settings</h3>
                  <div className="pb-form-group">
                    <label>SEO Title</label>
                    <input type="text" value={form.seo.title} onChange={(e) => { setForm({ ...form, seo: { ...form.seo, title: e.target.value }}) }} placeholder="Meta title for search engines" />
                  </div>
                  <div className="pb-form-group">
                    <label>SEO Description</label>
                    <textarea value={form.seo.description} onChange={(e) => { setForm({ ...form, seo: { ...form.seo, description: e.target.value }}) }} rows={2} placeholder="Meta description" />
                  </div>
                  <div className="pb-form-group">
                    <label>Keywords</label>
                    <input type="text" value={form.seo.keywords} onChange={(e) => { setForm({ ...form, seo: { ...form.seo, keywords: e.target.value }}) }} placeholder="keyword1, keyword2, keyword3" />
                  </div>
                </div>

                <div className="pb-form-section">
                  <h3>Hero Section</h3>
                  <div className="pb-form-group">
                    <label>
                      <input type="checkbox" checked={form.hero.enabled} onChange={(e) => { setForm({ ...form, hero: { ...form.hero, enabled: e.target.checked } }) }} />
                      {' '}Enable Hero Section
                    </label>
                  </div>
                  {form.hero.enabled && (
                    <>
                      <div className="pb-form-group">
                        <label>Heading</label>
                        <input type="text" value={form.hero.heading} onChange={(e) => { setForm({ ...form, hero: { ...form.hero, heading: e.target.value }}) }} placeholder="Main heading" />
                      </div>
                      <div className="pb-form-group">
                        <label>Subheading</label>
                        <input type="text" value={form.hero.subheading} onChange={(e) => { setForm({ ...form, hero: { ...form.hero, subheading: e.target.value }}) }} placeholder="Tagline or description" />
                      </div>
                      <div className="pb-form-row">
                        <div className="pb-form-group">
                          <label>CTA Text</label>
                          <input type="text" value={form.hero.ctaText} onChange={(e) => { setForm({ ...form, hero: { ...form.hero, ctaText: e.target.value }}) }} placeholder="Get Started" />
                        </div>
                        <div className="pb-form-group">
                          <label>CTA Link</label>
                          <input type="text" value={form.hero.ctaLink} onChange={(e) => { setForm({ ...form, hero: { ...form.hero, ctaLink: e.target.value }}) }} placeholder="/contact" />
                        </div>
                      </div>
                      <div className="pb-form-group">
                        <label>Background Image URL</label>
                        <input type="text" value={form.hero.backgroundImage} onChange={(e) => { setForm({ ...form, hero: { ...form.hero, backgroundImage: e.target.value }}) }} placeholder="https://..." />
                      </div>
                    </>
                  )}
                </div>

                <div className="pb-form-section">
                  <h3>Page Sections</h3>
                  <div className="pb-section-list">
                    {form.sections.map((section, index) => {
                      const SectionIcon = SECTION_TYPES.find(s => s.value === section.type)?.icon || FiFileText
                      return (
                        <div key={index} className="pb-section-card">
                          <div className="pb-section-header">
                            <div className="pb-section-title">
                              <SectionIcon size={18} />
                              <span>{SECTION_TYPES.find(s => s.value === section.type)?.label}</span>
                            </div>
                            <div className="pb-section-actions">
                              <button type="button" className="pb-section-move" onClick={() => moveSection(index, 'up')} disabled={index === 0}><FiChevronUp size={16} /></button>
                              <button type="button" className="pb-section-move" onClick={() => moveSection(index, 'down')} disabled={index === form.sections.length - 1}><FiChevronDown size={16} /></button>
                              <label className="pb-section-toggle">
                                <input type="checkbox" checked={section.enabled} onChange={e => updateSection(index, 'enabled', e.target.checked)} />
                              </label>
                              <button type="button" className="pb-section-remove" onClick={() => removeSection(index)}><FiTrash2 size={16} /></button>
                            </div>
                          </div>
                          <div className="pb-section-content">
                            <div className="pb-form-group">
                              <label>Section Title</label>
                              <input type="text" value={section.title} onChange={e => updateSection(index, 'title', e.target.value)} />
                            </div>
                            
                            {(section.type === 'faq' || section.type === 'gallery' || section.type === 'features' || section.type === 'stats') ? (
                              <div className="pb-items-editor">
                                <label>Items ({section.content?.items?.length || 0})</label>
                                <div className="pb-items-list">
                                  {(section.content?.items || []).map((item, itemIdx) => (
                                    <div key={itemIdx} className="pb-item-row">
                                      <div className="pb-item-fields">
                                        {section.type === 'faq' && (
                                          <>
                                            <input type="text" placeholder="Question" value={item.question || ''} onChange={e => {
                                              const newItems = [...section.content.items];
                                              newItems[itemIdx] = { ...item, question: e.target.value };
                                              updateSectionContent(index, { ...section.content, items: newItems });
                                            }} />
                                            <textarea placeholder="Answer" value={item.answer || ''} onChange={e => {
                                              const newItems = [...section.content.items];
                                              newItems[itemIdx] = { ...item, answer: e.target.value };
                                              updateSectionContent(index, { ...section.content, items: newItems });
                                            }} rows={2} />
                                          </>
                                        )}
                                        {section.type === 'gallery' && (
                                          <>
                                            <input type="text" placeholder="Image URL" value={item.url || ''} onChange={e => {
                                              const newItems = [...section.content.items];
                                              newItems[itemIdx] = { ...item, url: e.target.value };
                                              updateSectionContent(index, { ...section.content, items: newItems });
                                            }} />
                                            <input type="text" placeholder="Alt Text" value={item.alt || ''} onChange={e => {
                                              const newItems = [...section.content.items];
                                              newItems[itemIdx] = { ...item, alt: e.target.value };
                                              updateSectionContent(index, { ...section.content, items: newItems });
                                            }} />
                                          </>
                                        )}
                                        {section.type === 'features' && (
                                          <>
                                            <input type="text" placeholder="Feature Title" value={item.title || ''} onChange={e => {
                                              const newItems = [...section.content.items];
                                              newItems[itemIdx] = { ...item, title: e.target.value };
                                              updateSectionContent(index, { ...section.content, items: newItems });
                                            }} />
                                            <textarea placeholder="Description" value={item.description || ''} onChange={e => {
                                              const newItems = [...section.content.items];
                                              newItems[itemIdx] = { ...item, description: e.target.value };
                                              updateSectionContent(index, { ...section.content, items: newItems });
                                            }} rows={2} />
                                          </>
                                        )}
                                        {section.type === 'stats' && (
                                          <>
                                            <input type="text" placeholder="Metric (e.g. 500+)" value={item.metric || ''} onChange={e => {
                                              const newItems = [...section.content.items];
                                              newItems[itemIdx] = { ...item, metric: e.target.value };
                                              updateSectionContent(index, { ...section.content, items: newItems });
                                            }} />
                                            <input type="text" placeholder="Label" value={item.label || ''} onChange={e => {
                                              const newItems = [...section.content.items];
                                              newItems[itemIdx] = { ...item, label: e.target.value };
                                              updateSectionContent(index, { ...section.content, items: newItems });
                                            }} />
                                          </>
                                        )}
                                      </div>
                                      <button type="button" className="pb-item-remove" onClick={() => {
                                        const newItems = section.content.items.filter((_, i) => i !== itemIdx);
                                        updateSectionContent(index, { ...section.content, items: newItems });
                                      }}><FiTrash2 size={14} /></button>
                                    </div>
                                  ))}
                                </div>
                                <button type="button" className="pb-add-item-btn" onClick={() => {
                                  const newItems = [...(section.content?.items || []), {}];
                                  updateSectionContent(index, { ...section.content, items: newItems });
                                }}>
                                  <FiPlus size={14} /> Add Item
                                </button>
                              </div>
                            ) : (
                              <div className="pb-form-group">
                                <label>Content</label>
                                <textarea 
                                  value={section.content?.description || ''} 
                                  onChange={e => updateSectionContent(index, { ...section.content, description: e.target.value })}
                                  rows={3}
                                  placeholder="Section content description or body"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="pb-add-section">
                    <label>Add Section:</label>
                    <div className="pb-add-section-btns">
                      {SECTION_TYPES.map(s => (
                        <button
                          key={s.value}
                          type="button"
                          className="pb-add-section-btn"
                          onClick={() => addSection(s.value)}
                        >
                          <s.icon size={14} /> {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pb-form-section">
                  <h3>Content</h3>
                  <div className="pb-form-group">
                    <label>Description</label>
                    <textarea value={form.content.description} onChange={(e) => { setForm({ ...form, content: { ...form.content, description: e.target.value }}) }} rows={3} placeholder="Short description" />
                  </div>
                  <div className="pb-form-group">
                    <label>Body Content</label>
                    <textarea value={form.content.body} onChange={(e) => { setForm({ ...form, content: { ...form.content, body: e.target.value }}) }} rows={6} placeholder="Main content" />
                  </div>
                </div>

                <div className="pb-form-actions">
                  <button type="button" className="pb-btn pb-btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="pb-btn pb-btn-primary" disabled={saving}>
                    {saving ? <><span className="pb-spinner-sm"></span> Saving...</> : <><FiSave size={18} /> Save Page</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .page-builder { font-family: system-ui, -apple-system, sans-serif; }
        .pb-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e5e7eb; }
        .pb-header-left { display: flex; align-items: center; gap: 16px; }
        .pb-header-icon { width: 56px; height: 56px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; }
        .pb-header h1 { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin: 0; }
        .pb-header p { color: #6b7280; font-size: 0.875rem; margin: 4px 0 0 0; }
        .pb-header-actions { display: flex; gap: 12px; }
        .pb-btn { padding: 12px 20px; border: none; border-radius: 12px; font-size: 0.875rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .pb-btn-primary { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; }
        .pb-btn-secondary { background: #f3f4f6; color: #4b5563; }
        .pb-alert { padding: 14px 20px; border-radius: 12px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; font-weight: 500; }
        .pb-alert-error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
        .pb-filters { display: flex; gap: 16px; align-items: center; margin-bottom: 24px; flex-wrap: wrap; }
        .pb-search { position: relative; flex: 1; min-width: 200px; }
        .pb-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .pb-search input { width: 100%; padding: 12px 14px 12px 42px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 0.875rem; }
        .pb-search input:focus { outline: none; border-color: #6366f1; }
        .pb-status-filters { display: flex; gap: 8px; }
        .pb-status-btn { padding: 10px 16px; border: 2px solid #e5e7eb; border-radius: 10px; background: white; font-size: 0.8rem; font-weight: 600; cursor: pointer; color: #6b7280; }
        .pb-status-btn.active { border-color: #6366f1; background: #eef2ff; color: #6366f1; }
        .pb-view-toggle { display: flex; background: #f3f4f6; border-radius: 10px; padding: 4px; }
        .pb-view-btn { padding: 8px 12px; border: none; background: transparent; border-radius: 8px; cursor: pointer; color: #6b7280; }
        .pb-view-btn.active { background: white; color: #6366f1; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .pb-content { background: white; border-radius: 20px; padding: 24px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .pb-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px; gap: 16px; }
        .pb-spinner { width: 40px; height: 40px; border: 3px solid #e5e7eb; border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite; }
        .pb-spinner-sm { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .pb-empty { text-align: center; padding: 60px; }
        .pb-empty svg { width: 80px; height: 80px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #9ca3af; }
        .pb-empty h3 { font-size: 1.25rem; color: #1a1a2e; margin: 0 0 8px 0; }
        .pb-empty p { color: #6b7280; margin: 0 0 20px 0; }
        .pb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .pb-list { display: flex; flex-direction: column; gap: 12px; }
        .pb-page-card { display: flex; align-items: center; gap: 14px; padding: 16px; background: white; border-radius: 14px; border: 1px solid #e5e7eb; transition: all 0.2s; }
        .pb-page-card:hover { border-color: #6366f1; box-shadow: 0 4px 16px rgba(99,102,241,0.1); }
        .pb-page-card.draft { background: #fef9c3; }
        .pb-page-icon { width: 44px; height: 44px; background: #eef2ff; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #6366f1; }
        .pb-page-info { flex: 1; min-width: 0; }
        .pb-page-info h4 { font-size: 0.9rem; font-weight: 600; color: #1a1a2e; margin: 0 0 4px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pb-page-info p { font-size: 0.75rem; color: #6b7280; margin: 0; }
        .pb-page-meta { display: flex; gap: 8px; }
        .pb-status-badge { padding: 4px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }
        .pb-status-badge.published { background: #dcfce7; color: #16a34a; }
        .pb-status-badge.draft { background: #fef9c3; color: #ca8a04; }
        .pb-template-badge { padding: 4px 8px; background: #f3f4f6; border-radius: 6px; font-size: 0.7rem; font-weight: 600; color: #6b7280; }
        .pb-page-actions { display: flex; gap: 8px; }
        .pb-action-btn { width: 36px; height: 36px; border: none; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; background: #eff6ff; color: #3b82f6; }
        .pb-action-btn:hover { background: #3b82f6; color: white; }
        .pb-action-delete { background: #fef2f2; color: #ef4444; }
        .pb-action-delete:hover { background: #ef4444; color: white; }
        .pb-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 1000; overflow-y: auto; }
        .pb-modal { background: white; border-radius: 24px; width: 100%; max-width: 700px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 80px rgba(0,0,0,0.3); }
        .pb-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 24px 28px; border-bottom: 1px solid #e5e7eb; }
        .pb-modal-header h2 { font-size: 1.25rem; font-weight: 700; color: #1a1a2e; margin: 0; }
        .pb-modal-close { width: 40px; height: 40px; border: none; background: #f3f4f6; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #6b7280; }
        .pb-modal-close:hover { background: #fee2e2; color: #ef4444; }
        .pb-form { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .pb-form-section { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; }
        .pb-form-section h3 { font-size: 1rem; font-weight: 600; color: #1a1a2e; margin: 0 0 16px 0; }
        .pb-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pb-form-group { display: flex; flex-direction: column; gap: 8px; }
        .pb-form-group label { font-weight: 600; color: #374151; font-size: 0.875rem; }
        .pb-form-group input, .pb-form-group select, .pb-form-group textarea { padding: 14px 16px; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 0.95rem; }
        .pb-form-group input:focus, .pb-form-group select:focus, .pb-form-group textarea:focus { outline: none; border-color: #6366f1; }
        .pb-section-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
        .pb-section-card { border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
        .pb-section-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f9fafb; }
        .pb-section-title { display: flex; align-items: center; gap: 8px; font-weight: 600; color: #1a1a2e; }
        .pb-section-actions { display: flex; align-items: center; gap: 8px; }
        .pb-section-move { width: 28px; height: 28px; border: none; background: white; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #6b7280; }
        .pb-section-move:disabled { opacity: 0.3; }
        .pb-section-toggle input { width: 16px; height: 16px; }
        .pb-section-remove { width: 28px; height: 28px; border: none; background: #fef2f2; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #ef4444; }
        .pb-section-content { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .pb-add-section { display: flex; flex-direction: column; gap: 12px; }
        .pb-add-section label { font-weight: 600; color: #374151; font-size: 0.875rem; }
        .pb-add-section-btns { display: flex; flex-wrap: wrap; gap: 8px; }
        .pb-add-section-btn { padding: 8px 12px; border: 2px solid #e5e7eb; border-radius: 8px; background: white; font-size: 0.8rem; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 6px; color: #6b7280; }
        .pb-add-section-btn:hover { border-color: #6366f1; color: #6366f1; }
        .pb-form-actions { display: flex; gap: 12px; justify-content: flex-end; padding-top: 8px; }
        @media (max-width: 768px) {
          .pb-header { flex-direction: column; gap: 16px; }
          .pb-form-row { grid-template-columns: 1fr; }
          .pb-modal { max-width: 100%; }
        }

        .pb-items-editor { margin-top: 10px; border-top: 1px dashed #e5e7eb; padding-top: 15px; }
        .pb-items-editor > label { font-size: 0.8rem; color: #6b7280; margin-bottom: 10px; display: block; }
        .pb-items-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
        .pb-item-row { display: flex; gap: 10px; align-items: flex-start; background: #f9fafb; padding: 12px; border-radius: 8px; }
        .pb-item-fields { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .pb-item-fields input, .pb-item-fields textarea { padding: 8px 12px !important; font-size: 0.85rem !important; }
        .pb-item-remove { padding: 8px; background: #fee2e2; color: #ef4444; border: none; border-radius: 6px; cursor: pointer; }
        .pb-item-remove:hover { background: #ef4444; color: white; }
        .pb-add-item-btn { padding: 8px 16px; background: white; border: 1px solid #6366f1; color: #6366f1; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }
        .pb-add-item-btn:hover { background: #eef2ff; }
      `}</style>
    </div>
  )
}