import { useState, useEffect, useRef } from "react"
import { FiArrowRight, FiLinkedin, FiTwitter, FiMail, FiInstagram, FiAward, FiUsers, FiTarget, FiHeart, FiX, FiMessageCircle } from "react-icons/fi"
import { api } from "../services/api"
import PageHero from "../Components/PageHero"
import { normalizeText } from "../utils/textUtils"
import "../Styles/Team.css"

const normalizeTeamMember = (member) => ({
  ...member,
  name: normalizeText(member.name),
  role: normalizeText(member.role),
  bio: normalizeText(member.bio),
  quote: normalizeText(member.quote),
  description: normalizeText(member.description),
  department: normalizeText(member.department),
});

const INTRO_CONTENT = {
    title: "Meet Our Team",
    subtitle: "The brilliant minds behind AXSEM's success. We're a diverse group of innovators, problem-solvers, and tech enthusiasts dedicated to transforming ideas into powerful digital solutions.",
    stats: [
        { icon: <FiUsers />, number: 15, label: "Team Members", color: "#f05a28" },
        { icon: <FiAward />, number: 5, label: "Years Experience", color: "#3d3d9e" },
        { icon: <FiTarget />, number: 50, label: "Projects Delivered", color: "#0e9e6e" },
        { icon: <FiHeart />, number: 99, label: "Client Satisfaction %", color: "#6b3fa0" },
    ]
}

const DEPARTMENTS = ["All", "Leadership", "Engineering", "Design", "Marketing", "AI"]

/* ── Intersection Observer Hook ── */
function useReveal(threshold = 0.1) {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { 
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    el.classList.add("revealed")
                }
            },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return { ref, isVisible }
}

/* ── Intro Section ── */
function TeamIntro() {
    const { ref } = useReveal()
    
    return (
        <div className="team-intro" ref={ref}>
            <div className="team-intro-content">
                <h2 className="team-intro-title">{INTRO_CONTENT.title}</h2>
                <p className="team-intro-subtitle">{INTRO_CONTENT.subtitle}</p>
            </div>
            <div className="team-intro-stats">
                {INTRO_CONTENT.stats.map((stat, i) => (
                    <div key={i} className="team-intro-stat" style={{ "--accent": stat.color, "--delay": `${i * 0.1}s` }}>
                        <div className="team-intro-stat-icon">{stat.icon}</div>
                        <div className="team-intro-stat-number">
                            <span className="stat-number">{stat.number}</span>
                            <span className="stat-suffix">+</span>
                        </div>
                        <div className="team-intro-stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ── Department Filter ── */
function DepartmentFilter({ active, onChange }) {
    return (
        <div className="team-filter-wrap">
            <div className="team-filter-bar">
                {DEPARTMENTS.map((dept) => (
                    <button
                        key={dept}
                        className={`team-filter-btn ${active === dept ? "active" : ""}`}
                        onClick={() => onChange(dept)}
                    >
                        {dept}
                    </button>
                ))}
            </div>
        </div>
    )
}

/* ── Team Member Card ── */
function TeamMemberCard({ member, onSelect }) {
    const { ref } = useReveal()
    
    return (
        <div 
            className="team-member-card"
            ref={ref}
            onClick={() => onSelect(member)}
            style={{ "--delay": `${member.index * 0.08}s` }}
        >
            <div className="member-card-inner">
                <div className="member-image-container">
                    <img 
                        src={typeof member.image === 'string' ? member.image : `https://ui-avatars.com/api/?name=${encodeURIComponent(typeof member.name === 'string' ? member.name : 'Team')}&background=f05a28&color=fff&size=300`} 
                        alt={typeof member.name === 'string' ? member.name : 'Team Member'}
                        className="member-card-image"
                    />
                    <div className="member-card-overlay">
                        <span className="view-profile-btn">
                            <FiMessageCircle /> View Profile
                        </span>
                    </div>
                </div>
                <div className="member-card-content">
                    <span className="member-card-dept">{typeof member.department === 'string' ? member.department : "Team"}</span>
                    <h3 className="member-card-name">{typeof member.name === 'string' ? member.name : 'Team Member'}</h3>
                    <p className="member-card-role">{typeof member.role === 'string' ? member.role : ''}</p>
                    <p className="member-card-quote">{typeof member.quote === 'string' ? member.quote : "Innovation is our passion"}</p>
                </div>
            </div>
        </div>
    )
}

/* ── Member Detail Modal ── */
function MemberDetail({ member, onClose }) {
    const { ref } = useReveal()
    
    if (!member) return null
    
    return (
        <div className="team-modal-overlay" onClick={onClose}>
            <div className="team-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <FiX />
                </button>
                
                <div className="modal-header">
                    <div className="modal-image-wrapper">
                        <img 
                            src={typeof member.image === 'string' ? member.image : `https://ui-avatars.com/api/?name=${encodeURIComponent(typeof member.name === 'string' ? member.name : 'Team')}&background=f05a28&color=fff&size=400`} 
                            alt={typeof member.name === 'string' ? member.name : 'Team Member'}
                            className="modal-image"
                        />
                    </div>
                    <div className="modal-header-content">
                        <span className="modal-dept">{typeof member.department === 'string' ? member.department : "Team"}</span>
                        <h2 className="modal-name">{typeof member.name === 'string' ? member.name : 'Team Member'}</h2>
                        <p className="modal-role">{typeof member.role === 'string' ? member.role : ''}</p>
                        <div className="modal-socials">
                            {member.linkedin && (
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="modal-social">
                                    <FiLinkedin />
                                </a>
                            )}
                            {member.twitter && (
                                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="modal-social">
                                    <FiTwitter />
                                </a>
                            )}
                            {member.instagram && (
                                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="modal-social">
                                    <FiInstagram />
                                </a>
                            )}
                            {member.email && (
                                <a href={`mailto:${member.email}`} className="modal-social">
                                    <FiMail />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="modal-body">
                    {member.bio && (
                        <div className="modal-section">
                            <h4>About</h4>
                            <p className="modal-bio">{typeof member.bio === 'string' ? member.bio : ''}</p>
                        </div>
                    )}
                    
                    {member.quote && (
                        <div className="modal-section">
                            <blockquote className="modal-quote">
                                <FiMessageCircle className="quote-icon" />
                                {typeof member.quote === 'string' ? member.quote : ''}
                            </blockquote>
                        </div>
                    )}
                    
                    {member.description && (
                        <div className="modal-section">
                            <h4>Description</h4>
                            <p className="modal-description">{typeof member.description === 'string' ? member.description : ''}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

/* ── CTA Section ── */
function TeamCTA() {
    return (
        <div className="team-cta-section">
            <div className="team-cta-bg">
                <div className="cta-shape cta-shape-1"></div>
                <div className="cta-shape cta-shape-2"></div>
            </div>
            <div className="team-cta-content">
                <h3>Want to Join Our Team?</h3>
                <p>We're always looking for talented individuals. Check out our open positions and become part of something great.</p>
                <a href="/about/careers" className="team-cta-button">
                    View Careers <FiArrowRight />
                </a>
            </div>
        </div>
    )
}

/* ── Main Component ── */
export default function TeamPage() {
    const [activeDept, setActiveDept] = useState("All")
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedMember, setSelectedMember] = useState(null)

    const FALLBACK_TEAM = [
        { _id: "1", name: "Arjun Sharma", role: "Founder & CEO", department: "Leadership", quote: "Building software that solves real Indian problems.", bio: "With over 10 years of experience in software development, Arjun leads AXSEM with a vision to democratize enterprise-grade solutions.", skills: ["Leadership", "Strategy", "React", "Node.js"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
        { _id: "2", name: "Priya Nair", role: "CTO", department: "Engineering", quote: "Clean code is not a luxury, it's a discipline.", bio: "Priya brings 8+ years of technical expertise and leads our engineering team with passion for clean architecture.", skills: ["System Design", "Python", "AWS", "DevOps"], image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
        { _id: "3", name: "Rohan Gupta", role: "Lead Designer", department: "Design", quote: "Design is the silent ambassador of your brand.", bio: "Rohan is an award-winning designer with a passion for creating intuitive and beautiful user experiences.", skills: ["UI/UX", "Figma", "Adobe XD", "Animation"], image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
        { _id: "4", name: "Sarah Johnson", role: "Senior Developer", department: "Engineering", quote: "Every bug is an opportunity to learn.", bio: "Sarah specializes in full-stack development and has delivered 20+ projects across various domains.", skills: ["React", "Node.js", "MongoDB", "TypeScript"], image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
        { _id: "5", name: "Mike Chen", role: "Marketing Head", department: "Marketing", quote: "Data-driven marketing is the future.", bio: "Mike leads our marketing initiatives with innovative strategies that drive real results.", skills: ["SEO", "Content Strategy", "Analytics", "PPC"], image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
    ]

    useEffect(() => {
        api.getTeam()
            .then(data => {
                const teamData = Array.isArray(data) && data.length > 0 
                    ? data.map((m, i) => ({ ...normalizeTeamMember(m), index: i }))
                    : FALLBACK_TEAM.map((m, i) => ({ ...m, index: i }))
                setMembers(teamData)
            })
            .catch(() => {
                setMembers(FALLBACK_TEAM.map((m, i) => ({ ...m, index: i })))
            })
            .finally(() => setLoading(false))
    }, [])

    const filteredMembers = activeDept === "All" 
        ? members 
        : members.filter(m => m.department?.toLowerCase() === activeDept.toLowerCase())

    return (
        <div className="team-page">
            <PageHero
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Team" }
                ]}
                pill="Meet Our Team"
                title={
                    <>
                        The Minds Behind<br />
                        <span className="ph-gradient">Axsem Softwares</span>
                    </>
                }
                subtitle="Engineers, designers, strategists, and problem-solvers building powerful digital experiences."
                tag="15+ Team Members"
            />

            <TeamIntro />
            
            <DepartmentFilter active={activeDept} onChange={setActiveDept} />

            <div className="team-content">
                {loading ? (
                    <div className="team-loading">
                        <div className="team-spinner"></div>
                    </div>
                ) : filteredMembers.length > 0 ? (
                    <div className="team-grid">
                        {filteredMembers.map((member, i) => (
                            <TeamMemberCard 
                                key={member._id || member.id || i} 
                                member={member}
                                onSelect={setSelectedMember}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="team-empty">
                        <p>No team members found in this department.</p>
                    </div>
                )}
            </div>

            <TeamCTA />

            {selectedMember && (
                <MemberDetail 
                    member={selectedMember} 
                    onClose={() => setSelectedMember(null)} 
                />
            )}
        </div>
    )
}
