import { useState, useEffect, memo } from "react";
import { X, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useToast } from "../Components/Toast";
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
    <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', padding: '40px', flexWrap: 'wrap' }}>
        {[1, 2, 3].map(i => (
            <div key={i} style={{ width: '280px', height: '350px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', opacity: 0.5 }} />
        ))}
    </div>
)

const TeamSection = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeMember, setActiveMember] = useState(null);
    const { addToast } = useToast();

    useEffect(() => {
        api.getTeam()
            .then(data => {
                const normalized = Array.isArray(data) ? data.map(normalizeTeamMember) : [];
                setMembers(normalized);
            })
            .catch(() => {
                setMembers([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const teamData = [...members, ...members];

    return (
        <section className="team-section">
            <div className="team-container">

                {/* HEADER */}
                <div className="team-header">
                    <span className="team-label">OUR TEAM</span>
                    <h2>Meet the People Behind Axsem</h2>
                    <p>
                        A team of senior engineers and designers building scalable,
                        secure, enterprise-grade software products.
                    </p>

                    {/* GLOBAL CTA */}
                    <Link to="/about/team" className="team-global-btn">
                        Know More About Our Team →
                    </Link>
                </div>

                {/* AUTO SLIDER */}
                {loading ? (
                    <TeamFallback />
                ) : members.length > 0 ? (
                    <div className="team-slider-wrapper">
                        <div className="team-slider">
                            {teamData.map((member, index) => (
                                <div
                                    className="team-card"
                                    key={index}
                                    onClick={() => setActiveMember(member)}
                                >
                                    <div className="team-image">
                                        <img src={typeof member.image === 'string' ? member.image : ''} alt={typeof member.name === 'string' ? member.name : 'Team Member'} />

                                        {member.video && (
                                            <video
                                                src={member.video}
                                                muted
                                                loop
                                                playsInline
                                                preload="none"
                                            />
                                        )}

                                        {/* PLAY ICON */}
                                        <div className="team-play">
                                            <Play size={20} />
                                        </div>

                                        {/* HOVER OVERLAY */}
                                        <div className="team-overlay">
                                            <div className="team-overlay-info">
                                                <h4>{typeof member.name === 'string' ? member.name : 'Team Member'}</h4>
                                                <p>{typeof member.role === 'string' ? member.role : ''}</p>
                                                <span>{typeof member.experience === 'string' ? member.experience : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
                        <p>No team members available</p>
                    </div>
                )}

            </div>

            {/* VIDEO MODAL */}
            {activeMember && (
                <div className="team-modal">
                    <div className="modal-overlay" onClick={() => setActiveMember(null)} />
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setActiveMember(null)}>
                            <X size={20} />
                        </button>
                        <video src={activeMember.video} controls autoPlay />
                    </div>
                </div>
            )}
        </section>
    );
};

export default TeamSection;
