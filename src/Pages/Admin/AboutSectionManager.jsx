import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    FiAward, FiTarget, FiEye, FiHeart, FiZap, FiShield, FiUsers, 
    FiStar, FiPlus, FiTrash2, FiEdit, FiUpload, FiX, FiCheck,
    FiImage, FiSave
} from "react-icons/fi"
import { api } from "../../services/api"
import { useToast } from "../../Components/Toast"
import "../../Styles/Admin/AboutManager.css"

const iconOptions = [
    { value: "zap", icon: FiZap, label: "Innovation" },
    { value: "shield", icon: FiShield, label: "Quality" },
    { value: "heart", icon: FiHeart, label: "Client-Centric" },
    { value: "users", icon: FiUsers, label: "Team" },
    { value: "star", icon: FiStar, label: "Star" },
]

const defaultValues = {
    aboutStory: {
        heading: "Built on Passion, Driven by Purpose",
        description1: "",
        description2: "",
        image: "",
        stats: { years: "5+", clients: "50+", satisfaction: "99%", projects: "100+" }
    },
    aboutMission: {
        title: "Empower Businesses Through Technology",
        description: ""
    },
    aboutVision: {
        title: "India's Most Trusted Software Partner",
        description: ""
    },
    aboutValues: [
        { icon: "zap", title: "Innovation First", description: "We push boundaries with cutting-edge tech.", color: "#f05a28" },
        { icon: "shield", title: "Uncompromising Quality", description: "Every line of code is crafted with precision.", color: "#3d3d9e" },
        { icon: "heart", title: "Client-Centric", description: "Your success is our success.", color: "#e63b2a" },
        { icon: "users", title: "Collaborative Spirit", description: "Transparent communication, agile execution.", color: "#6b3fa0" }
    ]
}

export default function AboutSectionManager() {
    const [data, setData] = useState(defaultValues)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState("story")
    const { addToast } = useToast()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const companyInfo = await api.getCompanyInfo()
            if (companyInfo) {
                setData({
                    aboutStory: companyInfo.aboutStory || defaultValues.aboutStory,
                    aboutMission: companyInfo.aboutMission || defaultValues.aboutMission,
                    aboutVision: companyInfo.aboutVision || defaultValues.aboutVision,
                    aboutValues: companyInfo.aboutValues?.length ? companyInfo.aboutValues : defaultValues.aboutValues
                })
            }
        } catch (err) {
            console.error("Error fetching:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await api.updateAboutSection(data)
            addToast("About section saved successfully!", "success")
        } catch (err) {
            addToast(err.message, "error")
        } finally {
            setSaving(false)
        }
    }

    const updateStory = (field, value) => {
        setData(prev => ({
            ...prev,
            aboutStory: { ...prev.aboutStory, [field]: value }
        }))
    }

    const updateStoryStats = (field, value) => {
        setData(prev => ({
            ...prev,
            aboutStory: { ...prev.aboutStory, stats: { ...prev.aboutStory.stats, [field]: value } }
        }))
    }

    const updateMission = (field, value) => {
        setData(prev => ({
            ...prev,
            aboutMission: { ...prev.aboutMission, [field]: value }
        }))
    }

    const updateVision = (field, value) => {
        setData(prev => ({
            ...prev,
            aboutVision: { ...prev.aboutVision, [field]: value }
        }))
    }

    const updateValue = (index, field, value) => {
        setData(prev => {
            const newValues = [...prev.aboutValues]
            newValues[index] = { ...newValues[index], [field]: value }
            return { ...prev, aboutValues: newValues }
        })
    }

    const removeValue = (index) => {
        setData(prev => ({
            ...prev,
            aboutValues: prev.aboutValues.filter((_, i) => i !== index)
        }))
    }

    const addValue = () => {
        if (data.aboutValues.length >= 4) {
            addToast("Maximum 4 values allowed", "error")
            return
        }
        setData(prev => ({
            ...prev,
            aboutValues: [...prev.aboutValues, { 
                icon: "zap", 
                title: "New Value", 
                description: "Description here", 
                color: "#f05a28" 
            }]
        }))
    }

    if (loading) {
        return <div className="loading-screen">Loading...</div>
    }

    return (
        <div className="about-manager">
            <div className="am-header">
                <h2><FiAward /> About Section Manager</h2>
                <button className="save-btn" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : <><FiSave /> Save Changes</>}
                </button>
            </div>

            <div className="am-tabs">
                {["story", "mission", "vision", "values"].map(tab => (
                    <button 
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="am-content">
                {/* STORY TAB */}
                {activeTab === "story" && (
                    <div className="tab-panel">
                        <div className="form-group">
                            <label>Story Heading</label>
                            <input 
                                type="text"
                                value={data.aboutStory.heading}
                                onChange={(e) => updateStory("heading", e.target.value)}
                                placeholder="Built on Passion, Driven by Purpose"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description Part 1</label>
                            <textarea 
                                value={data.aboutStory.description1}
                                onChange={(e) => updateStory("description1", e.target.value)}
                                placeholder="Tell your story..."
                                rows={4}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description Part 2</label>
                            <textarea 
                                value={data.aboutStory.description2}
                                onChange={(e) => updateStory("description2", e.target.value)}
                                placeholder="Continue your story..."
                                rows={4}
                            />
                        </div>

                        <div className="form-group">
                            <label>Story Image URL</label>
                            <input 
                                type="text"
                                value={data.aboutStory.image}
                                onChange={(e) => updateStory("image", e.target.value)}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="form-section">
                            <h4>Statistics</h4>
                            <div className="stats-grid">
                                <div className="form-group">
                                    <label>Years</label>
                                    <input 
                                        type="text"
                                        value={data.aboutStory.stats.years}
                                        onChange={(e) => updateStoryStats("years", e.target.value)}
                                        placeholder="5+"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Clients</label>
                                    <input 
                                        type="text"
                                        value={data.aboutStory.stats.clients}
                                        onChange={(e) => updateStoryStats("clients", e.target.value)}
                                        placeholder="50+"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Projects</label>
                                    <input 
                                        type="text"
                                        value={data.aboutStory.stats.projects}
                                        onChange={(e) => updateStoryStats("projects", e.target.value)}
                                        placeholder="100+"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Satisfaction</label>
                                    <input 
                                        type="text"
                                        value={data.aboutStory.stats.satisfaction}
                                        onChange={(e) => updateStoryStats("satisfaction", e.target.value)}
                                        placeholder="99%"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* MISSION TAB */}
                {activeTab === "mission" && (
                    <div className="tab-panel">
                        <div className="form-group">
                            <label>Mission Title</label>
                            <input 
                                type="text"
                                value={data.aboutMission.title}
                                onChange={(e) => updateMission("title", e.target.value)}
                                placeholder="Empower Businesses Through Technology"
                            />
                        </div>
                        <div className="form-group">
                            <label>Mission Description</label>
                            <textarea 
                                value={data.aboutMission.description}
                                onChange={(e) => updateMission("description", e.target.value)}
                                placeholder="Describe your mission..."
                                rows={6}
                            />
                        </div>
                    </div>
                )}

                {/* VISION TAB */}
                {activeTab === "vision" && (
                    <div className="tab-panel">
                        <div className="form-group">
                            <label>Vision Title</label>
                            <input 
                                type="text"
                                value={data.aboutVision.title}
                                onChange={(e) => updateVision("title", e.target.value)}
                                placeholder="India's Most Trusted Software Partner"
                            />
                        </div>
                        <div className="form-group">
                            <label>Vision Description</label>
                            <textarea 
                                value={data.aboutVision.description}
                                onChange={(e) => updateVision("description", e.target.value)}
                                placeholder="Describe your vision..."
                                rows={6}
                            />
                        </div>
                    </div>
                )}

                {/* VALUES TAB */}
                {activeTab === "values" && (
                    <div className="tab-panel">
                        <div className="values-header">
                            <h4>Core Values (Max 4)</h4>
                            <button className="add-btn" onClick={addValue}>
                                <FiPlus /> Add Value
                            </button>
                        </div>

                        <AnimatePresence>
                            {data.aboutValues.map((value, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="value-card-edit"
                                >
                                    <div className="value-card-header">
                                        <span>Value {index + 1}</span>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => removeValue(index)}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>

                                    <div className="form-group">
                                        <label>Icon</label>
                                        <select 
                                            value={value.icon}
                                            onChange={(e) => updateValue(index, "icon", e.target.value)}
                                        >
                                            {iconOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Title</label>
                                        <input 
                                            type="text"
                                            value={value.title}
                                            onChange={(e) => updateValue(index, "title", e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea 
                                            value={value.description}
                                            onChange={(e) => updateValue(index, "description", e.target.value)}
                                            rows={2}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Color</label>
                                        <div className="color-input">
                                            <input 
                                                type="color"
                                                value={value.color}
                                                onChange={(e) => updateValue(index, "color", e.target.value)}
                                            />
                                            <input 
                                                type="text"
                                                value={value.color}
                                                onChange={(e) => updateValue(index, "color", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}