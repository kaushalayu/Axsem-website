import { useState, useEffect } from "react"
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import {
  FiUsers, FiBriefcase, FiMessageSquare, FiFileText,
  FiHome, FiPlus, FiTrash2, FiEdit, FiX, FiFolder, FiSave,
  FiSettings, FiUpload, FiLogOut, FiDollarSign
} from "react-icons/fi"
import { api } from "../../services/api"
import "../../Styles/Admin/Admin.css"
import logo from "../../assets/logo-full.jpeg"
import PricingManager from "./PricingManager"

function Dashboard() {
  const [stats, setStats] = useState({ team: 0, careers: 0, contacts: 0, blogs: 0, projects: 0, inquiries: 0 })
  const [unreadContacts, setUnreadContacts] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      api.getTeam().catch(() => []),
      api.getCareers().catch(() => []),
      api.getContacts().catch(() => []),
      api.getBlogs().catch(() => []),
      api.getProjects().catch(() => []),
      api.getInquiries().catch(() => [])
    ]).then(([team, careers, contacts, blogs, projects, inquiries]) => {
      setStats({
        team: team.length || 0,
        careers: careers.length || 0,
        contacts: contacts.length || 0,
        blogs: blogs.length || 0,
        projects: projects.length || 0,
        inquiries: inquiries?.data?.length || inquiries?.length || 0
      })
      setUnreadContacts(contacts.filter(c => !c.isRead).length)
    }).catch(err => {
      setError('Failed to load dashboard data')
    })

    const handleFocus = () => {
      Promise.all([
        api.getTeam().catch(() => []),
        api.getCareers().catch(() => []),
        api.getContacts().catch(() => []),
        api.getBlogs().catch(() => []),
        api.getProjects().catch(() => []),
        api.getInquiries().catch(() => [])
      ]).then(([team, careers, contacts, blogs, projects, inquiries]) => {
        setStats({
          team: team.length || 0,
          careers: careers.length || 0,
          contacts: contacts.length || 0,
          blogs: blogs.length || 0,
          projects: projects.length || 0,
          inquiries: inquiries?.data?.length || inquiries?.length || 0
        })
        setUnreadContacts(contacts.filter(c => !c.isRead).length)
      })
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>

      {error && <div className="admin-error" style={{ padding: '15px', background: '#fee', color: '#c00', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}

      <div className="admin-stats">
        <div className="stat-card">
          <h4>Projects</h4>
          <div className="stat-number">{stats.projects}</div>
        </div>
        <div className="stat-card">
          <h4>Team Members</h4>
          <div className="stat-number">{stats.team}</div>
        </div>
        <div className="stat-card">
          <h4>Open Jobs</h4>
          <div className="stat-number">{stats.careers}</div>
        </div>
        <div className="stat-card">
          <h4>Inquiries</h4>
          <div className="stat-number">{stats.inquiries}</div>
        </div>
        <div className="stat-card">
          <h4>Messages</h4>
          <div className="stat-number">{unreadContacts > 0 && <span className="unread-badge">{unreadContacts}</span>} {stats.contacts}</div>
        </div>
        <div className="stat-card">
          <h4>Blog Posts</h4>
          <div className="stat-number">{stats.blogs}</div>
        </div>
      </div>
    </div>
  )
}

function TeamManager() {
  const [team, setTeam] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', department: 'Team', image: '', experience: '', video: '', linkedin: '', twitter: '', instagram: '', bio: '' })
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => { loadTeam() }, [])

  const loadTeam = () => api.getTeam().then(data => {
    setTeam(data || [])
    setLoading(false)
  }).catch(err => {
    setError('Failed to load team')
    setLoading(false)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...form }
    delete data.image
    if (editId) {
      await api.updateTeam(editId, data, imageFile)
    } else {
      await api.addTeam(data, imageFile)
    }
    setShowModal(false)
    setEditId(null)
    setForm({ name: '', role: '', image: '', experience: '', video: '', linkedin: '', twitter: '', instagram: '', bio: '' })
    setImageFile(null)
    loadTeam()
  }

  const handleEdit = (member) => {
    setEditId(member._id)
    setForm({
      name: member.name || '',
      role: member.role || '',
      department: member.department || 'Team',
      image: member.image || '',
      experience: member.experience || '',
      video: member.video || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      instagram: member.instagram || '',
      bio: member.bio || ''
    })
    setImageFile(null)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this team member?')) {
      await api.deleteTeam(id)
      loadTeam()
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setForm({ name: '', role: '', department: 'Team', image: '', experience: '', video: '', linkedin: '', twitter: '', instagram: '', bio: '' })
    setImageFile(null)
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Team Members</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Member
        </button>
      </div>

      <div className="admin-card">
        {team.length === 0 ? (
          <div className="admin-empty">No team members yet</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map(m => (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td>{m.role}</td>
                  <td>{m.department || 'Team'}</td>
                  <td>{m.experience || '-'}</td>
                  <td>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleEdit(m)} style={{ marginRight: '5px' }}>
                      <FiEdit />
                    </button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(m._id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>{editId ? 'Edit Team Member' : 'Add Team Member'}</h3>
              <button className="admin-modal-close" onClick={closeModal}><FiX /></button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Role *</label>
                <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Department</label>
                <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
                  <option value="Team">Team</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="AI">AI</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Experience</label>
                <input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 5+ Years" />
              </div>
              <div className="admin-form-group">
                <label>Photo</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {uploading && <span>Uploading...</span>}
                {form.image && (
                  <div style={{ marginTop: '10px' }}>
                    <img src={form.image} alt="Preview" style={{ height: '80px', borderRadius: '4px', objectFit: 'cover' }} />
                    <button type="button" onClick={() => { setForm({ ...form, image: '' }); setImageFile(null) }} style={{ marginLeft: '10px' }}>Remove</button>
                  </div>
                )}
              </div>
              <div className="admin-form-group">
                <label>Video URL</label>
                <input value={form.video} onChange={e => setForm({ ...form, video: e.target.value })} placeholder="YouTube embed URL" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>LinkedIn</label>
                  <input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Twitter</label>
                  <input value={form.twitter} onChange={e => setForm({ ...form, twitter: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Bio</label>
                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3} />
              </div>
              <button type="submit" className="admin-btn admin-btn-primary">{editId ? <><FiSave /> Save Changes</> : 'Add Member'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function CareersManager() {
  const [jobs, setJobs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' })

  useEffect(() => { loadJobs() }, [])

  const loadJobs = () => api.getCareers().then(data => {
    setJobs(data || [])
    setLoading(false)
  }).catch(err => {
    setError('Failed to load jobs')
    setLoading(false)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...form,
      requirements: form.requirements.split(',').map(r => r.trim()).filter(r => r)
    }
    await api.addCareer(data)
    setShowModal(false)
    setForm({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' })
    loadJobs()
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this job?')) {
      await api.deleteCareer(id)
      loadJobs()
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Job Openings</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Job
        </button>
      </div>

      <div className="admin-card">
        {jobs.length === 0 ? (
          <div className="admin-empty">No job openings yet</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(j => (
                <tr key={j._id}>
                  <td>{j.title}</td>
                  <td>{j.department}</td>
                  <td>{j.location}</td>
                  <td>{j.type}</td>
                  <td>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(j._id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>Add Job</h3>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Job Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Department</label>
                  <input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Location</label>
                  <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Intern</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="admin-form-group">
                <label>Requirements (comma separated)</label>
                <input value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} placeholder="React, Node.js, MongoDB" />
              </div>
              <button type="submit" className="admin-btn admin-btn-primary">Add Job</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ContactsManager() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { loadContacts() }, [])

  const loadContacts = () => api.getContacts().then(data => {
    setContacts(data || [])
    setLoading(false)
  }).catch(err => {
    setError('Failed to load contacts')
    setLoading(false)
  })

  const handleDelete = async (id) => {
    if (confirm('Delete this message?')) {
      await api.deleteContact(id)
      loadContacts()
    }
  }

  const handleMarkRead = async (id) => {
    await api.markContactRead(id)
    loadContacts()
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Contact Messages</h1>
      </div>

      <div className="admin-card">
        {contacts.length === 0 ? (
          <div className="admin-empty">No messages yet</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c._id} style={{ background: c.isRead ? 'white' : '#f0f8ff' }}>
                  <td>
                    {c.name}
                    {!c.isRead && <span className="unread-badge">New</span>}
                  </td>
                  <td>{c.email}</td>
                  <td>{c.subject || '-'}</td>
                  <td>{c.message.substring(0, 50)}...</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    {!c.isRead && <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleMarkRead(c._id)} style={{ marginRight: '5px' }}>Read</button>}
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(c._id)}>
                      <FiTrash2 />
                    </button>
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

function BlogsManager() {
  const [blogs, setBlogs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', image: '', author: '', category: '', tags: '' })
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => { loadBlogs() }, [])

  const loadBlogs = () => api.getAllBlogs().then(data => {
    setBlogs(data || [])
    setLoading(false)
  }).catch(err => {
    setError('Failed to load blogs')
    setLoading(false)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(t => t)
    }
    if (editId) {
      await api.updateBlog(editId, data, imageFile)
    } else {
      await api.addBlog(data, imageFile)
    }
    setShowModal(false)
    setEditId(null)
    setForm({ title: '', slug: '', excerpt: '', content: '', image: '', author: '', category: '', tags: '' })
    setImageFile(null)
    loadBlogs()
  }

  const handleEdit = (blog) => {
    setEditId(blog.slug || blog._id)
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      image: blog.image || '',
      author: blog.author || '',
      category: blog.category || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : ''
    })
    setImageFile(null)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this blog post?')) {
      await api.deleteBlog(id)
      loadBlogs()
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setForm({ title: '', slug: '', excerpt: '', content: '', image: '', author: '', category: '', tags: '' })
    setImageFile(null)
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Blog Posts</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Blog
        </button>
      </div>

      <div className="admin-card">
        {blogs.length === 0 ? (
          <div className="admin-empty">No blog posts yet</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Author</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
              <tbody>
              {blogs.map(b => (
                <tr key={b._id}>
                  <td>{b.title}</td>
                  <td>{b.slug}</td>
                  <td>{b.author || '-'}</td>
                  <td>{b.category || '-'}</td>
                  <td>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleEdit(b)} style={{ marginRight: '5px' }}>
                      <FiEdit />
                    </button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(b.slug || b._id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ width: '600px' }}>
            <div className="admin-modal-header">
              <h3>{editId ? 'Edit Blog Post' : 'Add Blog Post'}</h3>
              <button className="admin-modal-close" onClick={closeModal}><FiX /></button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} required />
              </div>
              <div className="admin-form-group">
                <label>Slug *</label>
                <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Excerpt</label>
                <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} />
              </div>
              <div className="admin-form-group">
                <label>Content *</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} required />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  {uploading && <span>Uploading...</span>}
                  {form.image && (
                    <div style={{ marginTop: '10px' }}>
                      <img src={form.image} alt="Preview" style={{ height: '80px', borderRadius: '4px' }} />
                      <button type="button" onClick={() => { setForm({ ...form, image: '' }); setImageFile(null) }} style={{ marginLeft: '10px' }}>Remove</button>
                    </div>
                  )}
                </div>
                <div className="admin-form-group">
                  <label>Author</label>
                  <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Category</label>
                  <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="tech, news, tutorial" />
                </div>
              </div>
              <button type="submit" className="admin-btn admin-btn-primary">{editId ? <><FiSave /> Save Changes</> : 'Add Blog'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectsManager() {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [form, setForm] = useState({
    title: '', tagline: '', category: 'Web App', tags: '', color: '#f05a28',
    year: new Date().getFullYear().toString(), duration: '', client: '', industry: '',
    status: 'Live', overview: '', description: '', challenge: '', solution: '',
    results: '', techStack: '', gallery: '', testimonialQuote: '', testimonialAuthor: '', testimonialRole: '',
    linksLive: '', linksGithub: '', featured: false
  })

  useEffect(() => { loadProjects() }, [])

  const loadProjects = () => api.getProjects().then(data => {
    setProjects(data || [])
    setLoading(false)
  }).catch(err => {
    setError('Failed to load projects')
    setLoading(false)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      id: form.title.toLowerCase().replace(/\s+/g, '-'),
      title: form.title,
      tagline: form.tagline,
      category: form.category,
      tags: form.tags.split(',').map(t => t.trim()).filter(t => t),
      color: form.color,
      year: form.year,
      duration: form.duration,
      client: form.client,
      industry: form.industry,
      status: form.status,
      featured: form.featured,
      links: {
        live: form.linksLive || null,
        github: form.linksGithub || null
      },
      overview: form.overview,
      description: form.description,
      challenge: form.challenge,
      solution: form.solution,
      results: form.results ? form.results.split('\n').filter(r => r).map(r => {
        const [metric, label] = r.split(':').map(s => s.trim())
        return { metric: metric || '', label: label || r }
      }) : [],
      techStack: form.techStack ? form.techStack.split('\n').filter(t => t).map(t => {
        const [category, items] = t.split(':').map(s => s.trim())
        return { category: category || t, items: items ? items.split(',').map(i => i.trim()) : [t] }
      }) : [],
      gallery: form.gallery ? form.gallery.split(',').map(g => g.trim()).filter(g => g) : [],
      testimonial: form.testimonialQuote ? {
        quote: form.testimonialQuote,
        author: form.testimonialAuthor,
        role: form.testimonialRole
      } : null
    }
    
    if (editId) {
      await api.updateProject(editId, data, galleryFiles)
    } else {
      await api.addProject(data, galleryFiles)
    }
    
    setShowModal(false)
    setEditId(null)
    setGalleryFiles([])
    setForm({
      title: '', tagline: '', category: 'Web App', tags: '', color: '#f05a28',
      year: new Date().getFullYear().toString(), duration: '', client: '', industry: '',
      status: 'Live', overview: '', description: '', challenge: '', solution: '',
      results: '', techStack: '', gallery: '', testimonialQuote: '', testimonialAuthor: '', testimonialRole: '',
      linksLive: '', linksGithub: '', featured: false
    })
    loadProjects()
  }

  const handleEdit = (project) => {
    const p = project
    setEditId(p.id || p._id)
    setForm({
      title: p.title || '',
      tagline: p.tagline || '',
      category: p.category || 'Web App',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
      color: p.color || '#f05a28',
      year: p.year || new Date().getFullYear().toString(),
      duration: p.duration || '',
      client: p.client || '',
      industry: p.industry || '',
      status: p.status || 'Live',
      overview: p.overview || '',
      description: p.description || '',
      challenge: p.challenge || '',
      solution: p.solution || '',
      results: Array.isArray(p.results) ? p.results.map(r => `${r.metric}: ${r.label}`).join('\n') : '',
      techStack: Array.isArray(p.techStack) ? p.techStack.map(t => `${t.category}: ${t.items.join(', ')}`).join('\n') : '',
      gallery: Array.isArray(p.gallery) ? p.gallery.join(', ') : '',
      testimonialQuote: p.testimonial?.quote || '',
      testimonialAuthor: p.testimonial?.author || '',
      testimonialRole: p.testimonial?.role || '',
      linksLive: p.links?.live || '',
      linksGithub: p.links?.github || '',
      featured: p.featured || false
    })
    setGalleryFiles([])
    setShowModal(true)
  }

  const handleDelete = async (project) => {
    const projectId = project._id || project.id
    if (!projectId) {
      alert("Invalid project ID")
      return
    }

    if (!window.confirm(`Delete project "${project.title}"?`)) return

    try {
      await api.deleteProject(projectId)
      setProjects(prev => prev.filter(p => (p._id || p.id) !== projectId))
    } catch (err) {
      console.error("Delete failed:", err)
      alert("Failed to delete project. Please try again.")
    }
  }

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files)
    setGalleryFiles(files)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setGalleryFiles([])
    setForm({
      title: '', tagline: '', category: 'Web App', tags: '', color: '#f05a28',
      year: new Date().getFullYear().toString(), duration: '', client: '', industry: '',
      status: 'Live', overview: '', description: '', challenge: '', solution: '',
      results: '', techStack: '', gallery: '', testimonialQuote: '', testimonialAuthor: '', testimonialRole: '',
      linksLive: '', linksGithub: '', featured: false
    })
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Projects</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Project
        </button>
      </div>

      <div className="admin-card">
        {projects.length === 0 ? (
          <div className="admin-empty">No projects yet</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Client</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p._id || p.id}>
                  <td>{p.title}</td>
                  <td>{p.category}</td>
                  <td>{p.client}</td>
                  <td>{p.status}</td>
                  <td>{p.featured ? '★' : '-'}</td>
                  <td>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleEdit(p)} style={{ marginRight: '5px' }}>
                      <FiEdit />
                    </button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(p)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="admin-modal-header">
              <h3>{editId ? 'Edit Project' : 'Add Project'}</h3>
              <button className="admin-modal-close" onClick={closeModal}><FiX /></button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Tagline</label>
                <input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} placeholder="Brief description" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option>Web App</option>
                    <option>Mobile</option>
                    <option>ERP</option>
                    <option>UI/UX</option>
                    <option>Cloud</option>
                    <option>E-Commerce</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    <option>Live</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Client</label>
                  <input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Industry</label>
                  <input value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Year</label>
                  <input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Duration</label>
                  <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 4 months" />
                </div>
                <div className="admin-form-group">
                  <label>Color</label>
                  <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ height: '40px', padding: '2px' }} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Tags (comma separated)</label>
                <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="React, Node.js, MongoDB" />
              </div>
              <div className="admin-form-group">
                <label>Overview</label>
                <textarea value={form.overview} onChange={e => setForm({ ...form, overview: e.target.value })} rows={2} placeholder="Short description for card" />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Full description for detail page" />
              </div>
              <div className="admin-form-group">
                <label>Challenge</label>
                <textarea value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} rows={2} placeholder="Problem statement" />
              </div>
              <div className="admin-form-group">
                <label>Solution</label>
                <textarea value={form.solution} onChange={e => setForm({ ...form, solution: e.target.value })} rows={2} placeholder="What was built" />
              </div>
              <div className="admin-form-group">
                <label>Results (one per line, format: metric: label)</label>
                <textarea value={form.results} onChange={e => setForm({ ...form, results: e.target.value })} rows={3} placeholder="40%: Reduction in stockouts&#10;3x: Faster billing" />
              </div>
              <div className="admin-form-group">
                <label>Tech Stack (one per line, format: Category: item1, item2)</label>
                <textarea value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} rows={3} placeholder="Frontend: React, TypeScript&#10;Backend: Node.js, Express" />
              </div>
              <div className="admin-form-group">
                <label>Gallery (select multiple images)</label>
                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
                {galleryFiles.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <span>{galleryFiles.length} file(s) selected</span>
                    <button type="button" onClick={() => setGalleryFiles([])} style={{ marginLeft: '10px' }}>Clear</button>
                  </div>
                )}
                {form.gallery && (
                  <div style={{ marginTop: '10px' }}>
                    <small>Existing: {form.gallery.split(',').length} images</small>
                  </div>
                )}
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Live URL</label>
                  <input value={form.linksLive} onChange={e => setForm({ ...form, linksLive: e.target.value })} placeholder="https://..." />
                </div>
                <div className="admin-form-group">
                  <label>GitHub URL</label>
                  <input value={form.linksGithub} onChange={e => setForm({ ...form, linksGithub: e.target.value })} placeholder="https://github.com/..." />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Testimonial Quote</label>
                <textarea value={form.testimonialQuote} onChange={e => setForm({ ...form, testimonialQuote: e.target.value })} rows={2} placeholder="Client feedback" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Testimonial Author</label>
                  <input value={form.testimonialAuthor} onChange={e => setForm({ ...form, testimonialAuthor: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Testimonial Role</label>
                  <input value={form.testimonialRole} onChange={e => setForm({ ...form, testimonialRole: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                  {' '}Featured Project
                </label>
              </div>
              <button type="submit" className="admin-btn admin-btn-primary">{editId ? <><FiSave /> Save Changes</> : 'Add Project'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function CompanyInfoManager() {
  const [company, setCompany] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [logoFile, setLogoFile] = useState(null)
  const [form, setForm] = useState({
    companyName: '', tagline: '', email: '', phone: '', address: '',
    facebook: '', twitter: '', instagram: '', linkedin: '', github: '', youtube: '',
    workingHours: '', foundedYear: '', seoTitle: '', seoDescription: '', logo: ''
  })

  useEffect(() => { loadCompany() }, [])

  const loadCompany = () => api.getCompanyInfo().then(data => {
    setCompany(data || {})
    setForm({
      companyName: data?.companyName || '',
      tagline: data?.tagline || '',
      email: data?.email || '',
      phone: data?.phone || '',
      address: data?.address || '',
      logo: data?.logo || '',
      facebook: data?.facebook || '',
      twitter: data?.twitter || '',
      instagram: data?.instagram || '',
      linkedin: data?.linkedin || '',
      github: data?.github || '',
      youtube: data?.youtube || '',
      workingHours: data?.workingHours || '',
      foundedYear: data?.foundedYear || '',
      seoTitle: data?.seoTitle || '',
      seoDescription: data?.seoDescription || ''
    })
    setLoading(false)
  }).catch(() => setLoading(false))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const data = { ...form }
    delete data.logo
    await api.updateCompanyInfo(data, logoFile)
    setSaving(false)
    setSaved(true)
    setLogoFile(null)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, logo: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Company Information</h1>
      </div>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Company Name</label>
            <input value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Tagline</label>
            <input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Address</label>
            <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Logo</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="file" accept="image/*" onChange={handleLogoChange} style={{ maxWidth: '200px' }} />
              {form.logo && <img src={form.logo} alt="Logo" style={{ height: '40px' }} />}
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Working Hours</label>
              <input value={form.workingHours} onChange={e => setForm({ ...form, workingHours: e.target.value })} placeholder="Mon - Sat: 9:00 AM - 7:00 PM" />
            </div>
            <div className="admin-form-group">
              <label>Founded Year</label>
              <input value={form.foundedYear} onChange={e => setForm({ ...form, foundedYear: e.target.value })} />
            </div>
          </div>
          <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>Social Links</h3>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Facebook</label>
              <input value={form.facebook} onChange={e => setForm({ ...form, facebook: e.target.value })} placeholder="https://facebook.com/..." />
            </div>
            <div className="admin-form-group">
              <label>Twitter</label>
              <input value={form.twitter} onChange={e => setForm({ ...form, twitter: e.target.value })} placeholder="https://twitter.com/..." />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Instagram</label>
              <input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="https://instagram.com/..." />
            </div>
            <div className="admin-form-group">
              <label>LinkedIn</label>
              <input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/..." />
            </div>
          </div>
          <div className="admin-form-group">
            <label>GitHub</label>
            <input value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." />
          </div>
          <div className="admin-form-group">
            <label>YouTube</label>
            <input value={form.youtube} onChange={e => setForm({ ...form, youtube: e.target.value })} placeholder="https://youtube.com/..." />
          </div>
          <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>SEO Settings</h3>
          <div className="admin-form-group">
            <label>SEO Title</label>
            <input value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>SEO Description</label>
            <textarea value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} rows={3} />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : saved ? '✓ Saved!' : <><FiSave /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  )
}

function ServicesManager() {
  const [services, setServices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    id: '', icon: 'FiCode', color: '#f05a28', tag: '', title: '', description: '',
    points: '', stat: '', statLabel: '', order: 0, isActive: true
  })

  useEffect(() => { loadServices() }, [])

  const loadServices = () => api.getServices().then(data => {
    setServices(data || [])
    setLoading(false)
  }).catch(() => setLoading(false))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...form,
      id: form.id || form.title.toLowerCase().replace(/\s+/g, '-'),
      points: form.points.split(',').map(p => p.trim()).filter(p => p)
    }
    if (editId) {
      await api.updateService(editId, data)
    } else {
      await api.addService(data)
    }
    setShowModal(false)
    setEditId(null)
    setForm({ id: '', icon: 'FiCode', color: '#f05a28', tag: '', title: '', description: '', points: '', stat: '', statLabel: '', order: 0, isActive: true })
    loadServices()
  }

  const handleEdit = (service) => {
    setEditId(service.id)
    setForm({
      id: service.id || '',
      icon: service.icon || 'FiCode',
      color: service.color || '#f05a28',
      tag: service.tag || '',
      title: service.title || '',
      description: service.description || '',
      points: Array.isArray(service.points) ? service.points.join(', ') : '',
      stat: service.stat || '',
      statLabel: service.statLabel || '',
      order: service.order || 0,
      isActive: service.isActive !== false
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this service?')) {
      await api.deleteService(id)
      loadServices()
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setForm({ id: '', icon: 'FiCode', color: '#f05a28', tag: '', title: '', description: '', points: '', stat: '', statLabel: '', order: 0, isActive: true })
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Services</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Service
        </button>
      </div>

      <div className="admin-card">
        {services.length === 0 ? (
          <div className="admin-empty">No services yet</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Tag</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td>{s.order}</td>
                  <td>{s.title}</td>
                  <td>{s.tag}</td>
                  <td>{s.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleEdit(s)} style={{ marginRight: '5px' }}>
                      <FiEdit />
                    </button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(s.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>{editId ? 'Edit Service' : 'Add Service'}</h3>
              <button className="admin-modal-close" onClick={closeModal}><FiX /></button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Tag *</label>
                  <input value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} placeholder="e.g. Web Development" required />
                </div>
                <div className="admin-form-group">
                  <label>Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) })} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} required />
              </div>
              <div className="admin-form-group">
                <label>Points (comma separated)</label>
                <input value={form.points} onChange={e => setForm({ ...form, points: e.target.value })} placeholder="React, Node.js, MongoDB" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Icon</label>
                  <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}>
                    <option value="FiCode">Code</option>
                    <option value="FiSmartphone">Smartphone</option>
                    <option value="FiCloud">Cloud</option>
                    <option value="FiLayers">Layers</option>
                    <option value="FiDatabase">Database</option>
                    <option value="FiShield">Shield</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Color</label>
                  <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ height: '40px', padding: '2px' }} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Stat Number</label>
                  <input value={form.stat} onChange={e => setForm({ ...form, stat: e.target.value })} placeholder="80+" />
                </div>
                <div className="admin-form-group">
                  <label>Stat Label</label>
                  <input value={form.statLabel} onChange={e => setForm({ ...form, statLabel: e.target.value })} placeholder="Web Projects" />
                </div>
              </div>
              <div className="admin-form-group">
                <label>
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                  {' '}Active
                </label>
              </div>
              <button type="submit" className="admin-btn admin-btn-primary">{editId ? <><FiSave /> Save Changes</> : 'Add Service'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function InquiriesManager() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { loadInquiries() }, [])

  const loadInquiries = () => api.getInquiries().then(data => {
    setInquiries(data?.data || data || [])
    setLoading(false)
  }).catch(err => {
    setError('Failed to load inquiries')
    setLoading(false)
  })

  const handleDelete = async (id) => {
    if (confirm('Delete this inquiry?')) {
      await api.deleteInquiry(id)
      loadInquiries()
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Service Inquiries</h1>
      </div>

      <div className="admin-card">
        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : inquiries.length === 0 ? (
          <div className="admin-empty">No inquiries yet</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Service</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.email || '-'}</td>
                  <td>{item.service || '-'}</td>
                  <td>{item.message?.substring(0, 50)}{item.message?.length > 50 ? '...' : ''}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item._id)}>
                      <FiTrash2 />
                    </button>
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

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    api.logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/admin', icon: <FiHome />, label: 'Dashboard' },
    { path: '/admin/pricing', icon: <FiDollarSign />, label: 'Pricing' },
    { path: '/admin/company', icon: <FiSettings />, label: 'Company Info' },
    { path: '/admin/services', icon: <FiSettings />, label: 'Services' },
    { path: '/admin/projects', icon: <FiFolder />, label: 'Projects' },
    { path: '/admin/team', icon: <FiUsers />, label: 'Team' },
    { path: '/admin/careers', icon: <FiBriefcase />, label: 'Careers' },
    { path: '/admin/inquiries', icon: <FiMessageSquare />, label: 'Inquiries' },
    { path: '/admin/contacts', icon: <FiMessageSquare />, label: 'Contact Us' },
    { path: '/admin/blogs', icon: <FiFileText />, label: 'Blogs' },
  ]

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src={logo} alt="AXSEM" />
        </div>
        <nav>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <button onClick={handleLogout} className="admin-nav-item admin-logout-btn">
            <FiLogOut />
            Logout
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/pricing" element={<PricingManager />} />
          <Route path="/admin/company" element={<CompanyInfoManager />} />
          <Route path="/admin/services" element={<ServicesManager />} />
          <Route path="/admin/projects" element={<ProjectsManager />} />
          <Route path="/admin/team" element={<TeamManager />} />
          <Route path="/admin/careers" element={<CareersManager />} />
          <Route path="/admin/inquiries" element={<InquiriesManager />} />
          <Route path="/admin/contacts" element={<ContactsManager />} />
          <Route path="/admin/blogs" element={<BlogsManager />} />
        </Routes>
      </main>
    </div>
  )
}
