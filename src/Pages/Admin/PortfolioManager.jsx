import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    FiBriefcase, FiPlus, FiTrash2, FiEdit, FiX, FiCheck, FiImage,
    FiExternalLink, FiStar, FiFilter, FiGrid, FiList
} from "react-icons/fi"
import { api } from "../../services/api"
import { useToast } from "../../Components/Toast"
import FileUpload from "../../Components/FileUpload"
import "../../Styles/Admin/PortfolioManager.css"

const categories = [
    "Web Development", "Mobile Apps", "E-Commerce", "ERP", 
    "CRM", "SaaS", "UI/UX Design", "Digital Marketing"
]

const defaultCase = {
    title: "",
    description: "",
    category: "Web Development",
    client: "",
    year: new Date().getFullYear().toString(),
    duration: "",
    industry: "",
    status: "Live",
    featured: false,
    thumbnail: "",
    gallery: [],
    overview: "",
    challenge: "",
    solution: "",
    results: [{ metric: "", label: "" }],
    techStack: [],
    liveUrl: "",
    order: 0,
    isActive: true
}

export default function PortfolioManager() {
    const [portfolio, setPortfolio] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [viewMode, setViewMode] = useState("grid")
    const [filterCategory, setFilterCategory] = useState("")
    const [editingCase, setEditingCase] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const { addToast } = useToast()

    useEffect(() => {
        fetchPortfolio()
    }, [])

    const fetchPortfolio = async () => {
        try {
            const data = await api.getPortfolio()
            setPortfolio(data || [])
        } catch (err) {
            console.error("Error:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (!editingCase.title) {
            addToast("Title is required", "error")
            return
        }
        
        setSaving(true)
        try {
            if (isCreating) {
                await api.addPortfolio(editingCase)
                addToast("Case study added!", "success")
            } else {
                await api.updatePortfolio(editingCase._id, editingCase)
                addToast("Case study updated!", "success")
            }
            setEditingCase(null)
            setIsCreating(false)
            fetchPortfolio()
        } catch (err) {
            addToast(err.message, "error")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("Delete this case study?")) return
        
        try {
            await api.deletePortfolio(id)
            addToast("Deleted successfully!", "success")
            fetchPortfolio()
        } catch (err) {
            addToast(err.message, "error")
        }
    }

    const openCreate = () => {
        setEditingCase({ ...defaultCase, order: portfolio.length })
        setIsCreating(true)
    }

    const openEdit = (item) => {
        setEditingCase({ ...item })
        setIsCreating(false)
    }

    const updateField = (field, value) => {
        setEditingCase(prev => ({ ...prev, [field]: value }))
    }

    const addResult = () => {
        setEditingCase(prev => ({
            ...prev,
            results: [...prev.results, { metric: "", label: "" }]
        }))
    }

    const updateResult = (index, field, value) => {
        setEditingCase(prev => ({
            ...prev,
            results: prev.results.map((r, i) => i === index ? { ...r, [field]: value } : r)
        }))
    }

    const removeResult = (index) => {
        setEditingCase(prev => ({
            ...prev,
            results: prev.results.filter((_, i) => i !== index)
        }))
    }

    const filteredPortfolio = filterCategory 
        ? portfolio.filter(p => p.category === filterCategory)
        : portfolio

    if (loading) return <div className="loading-screen">Loading...</div>

    return (
        <div className="portfolio-manager">
            {/* Header */}
            <div className="pm-header">
                <div>
                    <h2><FiBriefcase /> Portfolio Manager</h2>
                    <p>{portfolio.length} case studies</p>
                </div>
                <button className="create-btn" onClick={openCreate}>
                    <FiPlus /> Add Case Study
                </button>
            </div>

            {/* Filters */}
            <div className="pm-filters">
                <select 
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <div className="view-toggle">
                    <button 
                        className={viewMode === "grid" ? "active" : ""}
                        onClick={() => setViewMode("grid")}
                    >
                        <FiGrid />
                    </button>
                    <button 
                        className={viewMode === "list" ? "active" : ""}
                        onClick={() => setViewMode("list")}
                    >
                        <FiList />
                    </button>
                </div>
            </div>

            {/* Portfolio List */}
            <div className={`pm-grid ${viewMode}`}>
                {filteredPortfolio.map((item) => (
                    <motion.div 
                        key={item._id}
                        className="pm-card"
                        layout
                    >
                        <div className="pm-card-image">
                            <img 
                                src={item.thumbnail || "https://via.placeholder.com/400x300"} 
                                alt={item.title}
                            />
                            {item.featured && <span className="featured-badge"><FiStar /> Featured</span>}
                        </div>
                        <div className="pm-card-content">
                            <span className="category">{item.category}</span>
                            <h3>{item.title}</h3>
                            <p>{item.client}</p>
                            <div className="pm-card-actions">
                                <button onClick={() => openEdit(item)}>
                                    <FiEdit /> Edit
                                </button>
                                <button className="delete" onClick={() => handleDelete(item._id)}>
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingCase && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { setEditingCase(null); setIsCreating(false) }}
                    >
                        <motion.div 
                            className="modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>{isCreating ? "New Case Study" : "Edit Case Study"}</h3>
                                <button onClick={() => { setEditingCase(null); setIsCreating(false) }}>
                                    <FiX />
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Title *</label>
                                        <input 
                                            type="text"
                                            value={editingCase.title}
                                            onChange={(e) => updateField("title", e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select 
                                            value={editingCase.category}
                                            onChange={(e) => updateField("category", e.target.value)}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea 
                                        value={editingCase.description}
                                        onChange={(e) => updateField("description", e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Client</label>
                                        <input 
                                            type="text"
                                            value={editingCase.client}
                                            onChange={(e) => updateField("client", e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Year</label>
                                        <input 
                                            type="text"
                                            value={editingCase.year}
                                            onChange={(e) => updateField("year", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Duration</label>
                                        <input 
                                            type="text"
                                            value={editingCase.duration}
                                            onChange={(e) => updateField("duration", e.target.value)}
                                            placeholder="e.g., 3 months"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Industry</label>
                                        <input 
                                            type="text"
                                            value={editingCase.industry}
                                            onChange={(e) => updateField("industry", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Thumbnail URL</label>
                                    <input 
                                        type="text"
                                        value={editingCase.thumbnail}
                                        onChange={(e) => updateField("thumbnail", e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Live URL</label>
                                    <input 
                                        type="text"
                                        value={editingCase.liveUrl}
                                        onChange={(e) => updateField("liveUrl", e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tech Stack (comma separated)</label>
                                    <input 
                                        type="text"
                                        value={editingCase.techStack?.join(", ") || ""}
                                        onChange={(e) => updateField("techStack", e.target.value.split(", ").filter(Boolean))}
                                        placeholder="React, Node.js, MongoDB"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Results</label>
                                    {editingCase.results?.map((result, index) => (
                                        <div key={index} className="result-row">
                                            <input 
                                                type="text"
                                                placeholder="Metric (e.g., 50%)"
                                                value={result.metric}
                                                onChange={(e) => updateResult(index, "metric", e.target.value)}
                                            />
                                            <input 
                                                type="text"
                                                placeholder="Label (e.g., Increase in Sales)"
                                                value={result.label}
                                                onChange={(e) => updateResult(index, "label", e.target.value)}
                                            />
                                            <button type="button" onClick={() => removeResult(index)}>
                                                <FiX />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className="add-result-btn" onClick={addResult}>
                                        <FiPlus /> Add Result
                                    </button>
                                </div>

                                <div className="form-row">
                                    <div className="form-group checkbox">
                                        <label>
                                            <input 
                                                type="checkbox"
                                                checked={editingCase.featured}
                                                onChange={(e) => updateField("featured", e.target.checked)}
                                            />
                                            Featured
                                        </label>
                                    </div>
                                    <div className="form-group checkbox">
                                        <label>
                                            <input 
                                                type="checkbox"
                                                checked={editingCase.isActive}
                                                onChange={(e) => updateField("isActive", e.target.checked)}
                                            />
                                            Active
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="cancel-btn" onClick={() => { setEditingCase(null); setIsCreating(false) }}>
                                    Cancel
                                </button>
                                <button className="save-btn" onClick={handleSave} disabled={saving}>
                                    {saving ? "Saving..." : <><FiCheck /> Save</>}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}