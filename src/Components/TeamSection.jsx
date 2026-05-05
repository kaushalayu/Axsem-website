import { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { normalizeText } from "../utils/textUtils";
import "../Styles/TeamSection.css";

const normalizeTeamMember = (member) => ({
    ...member,
    name: normalizeText(member.name),
    role: normalizeText(member.role),
    bio: normalizeText(member.bio),
    quote: normalizeText(member.quote),
    description: normalizeText(member.description),
    experience: normalizeText(member.experience),
    department: normalizeText(member.department),
});

const TeamFallback = () => (
    <div className="team-fallback">
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="team-fallback-card" />
        ))}
    </div>
)

const TeamCard = ({ member }) => {
    const cardRef = useRef(null);
    const [tiltStyle, setTiltStyle] = useState({});
    const [glareStyle, setGlareStyle] = useState({});
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setTiltStyle({
            transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.06, 1.06, 1.06)`,
            transition: 'transform 0.05s ease-out'
        });

        setGlareStyle({
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
            opacity: 1
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTiltStyle({
            transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
        });
        setGlareStyle({ opacity: 0, transition: 'opacity 0.5s ease' });
    };

    const handleMouseEnter = () => setIsHovered(true);

    const imageUrl = typeof member.image === 'string' 
        ? member.image 
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(typeof member.name === 'string' ? member.name : 'Team')}&background=f05a28&color=fff&size=400`;

    return (
        <Link to="/about/team" className="team-card-link">
            <div
                ref={cardRef}
                className="team-card"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={tiltStyle}
            >
                <div className="team-image-wrapper">
                    <div className="team-image-inner">
                        <img src={imageUrl} alt={typeof member.name === 'string' ? member.name : 'Team Member'} className="team-image" loading="lazy" />
                    </div>

                    <div className="team-glare" style={glareStyle} />

                    <div className={`team-3d-overlay ${isHovered ? 'active' : ''}`}>
                        <div className="team-3d-content">
                            <span className="team-dept-badge">{typeof member.department === 'string' ? member.department : ''}</span>
                            <h4>{typeof member.name === 'string' ? member.name : 'Team Member'}</h4>
                            <p className="team-role">{typeof member.role === 'string' ? member.role : ''}</p>
                            {member.experience && <p className="team-experience">{member.experience}</p>}
                            {member.quote && <p className="team-quote">"{member.quote}"</p>}
                        </div>
                    </div>

                    <div className="team-shimmer" />
                </div>
            </div>
        </Link>
    );
};

const TeamSection = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getTeam()
            .then(data => {
                const normalized = Array.isArray(data) ? data.map(normalizeTeamMember) : [];
                setMembers(normalized);
            })
            .catch(() => setMembers([]))
            .finally(() => setLoading(false));
    }, []);

    const teamData = [...members, ...members];

    return (
        <section className="team-section">
            <div className="team-container">
                <div className="team-header">
                    <span className="team-label">OUR TEAM</span>
                    <h2>Meet the People Behind Axsem</h2>
                    <p>A team of senior engineers and designers building scalable, secure, enterprise-grade software products.</p>
                    <Link to="/about/team" className="team-global-btn">
                        Know More About Our Team →
                    </Link>
                </div>

                {loading ? (
                    <TeamFallback />
                ) : members.length > 0 ? (
                    <div className="team-slider-wrapper">
                        <div className="team-slider">
                            {teamData.map((member, index) => (
                                <TeamCard key={index} member={member} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="team-empty">
                        <p>No team members available</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TeamSection;
