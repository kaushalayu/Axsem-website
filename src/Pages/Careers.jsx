import { useEffect, useRef, useState } from "react"
import {
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiHeart,
  FiCode,
  FiLayers,
  FiCpu,
  FiArrowRight,
  FiCheckCircle,
  FiMapPin,
  FiClock,
  FiStar,
  FiAward,
  FiZap,
  FiShield
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import { api } from "../services/api"
import { normalizeText } from "../utils/textUtils"
import "../Styles/MissionVision.css"
import "../Styles/Careers.css"

const normalizeJob = (job) => ({
  ...job,
  title: normalizeText(job.title),
  description: normalizeText(job.description),
  type: normalizeText(job.type),
  location: normalizeText(job.location),
  role: normalizeText(job.role),
});

function useReveal(threshold = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("mv-revealed")
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return ref
}

const culture = [
  {
    icon: <FiHeart />,
    color: "#f05a28",
    title: "People First",
    desc: "We value humans over hierarchy. Respect, trust, and empathy guide how we work together."
  },
  {
    icon: <FiTrendingUp />,
    color: "#3d3d9e",
    title: "Growth Mindset",
    desc: "We invest in learning, mentorship, and continuous improvement at every career stage."
  },
  {
    icon: <FiUsers />,
    color: "#6b3fa0",
    title: "Ownership Culture",
    desc: "You own your work end-to-end. Accountability and autonomy go hand in hand here."
  }
]

const roles = [
  {
    icon: <FiCode />,
    title: "Frontend Developer",
    desc: "Build modern, performant interfaces using React, Tailwind, and animation-driven UX.",
    type: "Full Time",
    location: "Remote / Hybrid",
    experience: "1-4 Years"
  },
  {
    icon: <FiLayers />,
    title: "Backend Developer",
    desc: "Design scalable APIs, databases, and secure backend systems for real-world products.",
    type: "Full Time",
    location: "Onsite",
    experience: "2-5 Years"
  },
  {
    icon: <FiCpu />,
    title: "AI / ML Engineer",
    desc: "Work on AI-driven tools, automation pipelines, and next-gen SaaS products.",
    type: "Full Time",
    location: "Remote",
    experience: "1-3 Years"
  }
]

const perks = [
  { icon: <FiZap />, title: "Fast Track Growth", desc: "Clear career paths with rapid progression" },
  { icon: <FiShield />, title: "Work-Life Balance", desc: "Flexible hours & remote-first culture" },
  { icon: <FiAward />, title: "Premium Tools", desc: "Latest tech & learning resources" },
  { icon: <FiStar />, title: "Team Rewards", desc: "Performance bonuses & team outings" }
]

export default function CareersPage() {
  const [jobs, setJobs] = useState([])
  const cultureRef = useReveal(0.06)
  const rolesRef = useReveal(0.06)
  const perksRef = useReveal(0.08)
  const statsRef = useReveal(0.1)
  const ctaRef = useReveal(0.1)

  useEffect(() => {
    api.getCareers().then(data => {
      const normalized = Array.isArray(data) ? data.map(normalizeJob) : []
      setJobs(normalized)
    })
  }, [])

  const displayJobs = jobs.length > 0 ? jobs : roles

  return (
    <div className="careers-page">
      <PageHero
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Careers" }
        ]}
        pill="Join Axsem"
        pillIcon={<FiBriefcase />}
        title={
          <>
            Build Your Career<br />
            <span className="ph-gradient">With Purpose</span>
          </>
        }
        subtitle="We're building a team of curious, driven, and kind people who want to create meaningful technology and grow together."
        tag="Careers · Axsem Softwares"
      />

      <div className="careers-body">
        <section className="careers-stats-section mv-anim" ref={statsRef}>
          <div className="careers-stats-grid">
            <div className="careers-stat-item">
              <span className="careers-stat-number">50+</span>
              <span className="careers-stat-label">Team Members</span>
            </div>
            <div className="careers-stat-item">
              <span className="careers-stat-number">100+</span>
              <span className="careers-stat-label">Projects Delivered</span>
            </div>
            <div className="careers-stat-item">
              <span className="careers-stat-number">98%</span>
              <span className="careers-stat-label">Client Satisfaction</span>
            </div>
            <div className="careers-stat-item">
              <span className="careers-stat-number">5+</span>
              <span className="careers-stat-label">Years Experience</span>
            </div>
          </div>
        </section>

        <section className="careers-culture-section">
          <div className="careers-section-header">
            <span className="careers-pill"><FiHeart /> Our Culture</span>
            <h2 className="careers-title">
              Work Where You <span className="careers-accent">Belong</span>
            </h2>
            <p className="careers-subtitle">
              We believe in clarity, growth, ownership, and meaningful work.
            </p>
          </div>

          <div className="careers-culture-grid mv-anim" ref={cultureRef}>
            {culture.map((c, i) => (
              <div
                key={typeof c.title === 'string' ? c.title : i}
                className="careers-culture-card"
                style={{ "--vc": c.color, "--delay": `${i * 0.1}s` }}
              >
                <div className="careers-culture-icon" style={{ background: `${c.color}15`, color: c.color }}>
                  {c.icon}
                </div>
                <h3 className="careers-culture-title">{c.title}</h3>
                <p className="careers-culture-desc">{c.desc}</p>
                <div className="careers-culture-bar" style={{ background: c.color }} />
              </div>
            ))}
          </div>
        </section>

        <section className="careers-perks-section mv-anim" ref={perksRef}>
          <div className="careers-perks-inner">
            <div className="careers-perks-content">
              <span className="careers-pill"><FiStar /> Perks & Benefits</span>
              <h2 className="careers-title">
                Why You'll <span className="careers-accent">Love It Here</span>
              </h2>
              <p className="careers-subtitle">
                We care about long-term careers, not short-term output.
              </p>
            </div>
            <div className="careers-perks-grid">
              {perks.map((perk, i) => (
                <div key={i} className="careers-perk-card" style={{ "--delay": `${i * 0.1}s` }}>
                  <div className="careers-perk-icon">{perk.icon}</div>
                  <div>
                    <h4 className="careers-perk-title">{perk.title}</h4>
                    <p className="careers-perk-desc">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="careers-jobs-section">
          <div className="careers-section-header">
            <span className="careers-pill"><FiBriefcase /> Open Positions</span>
            <h2 className="careers-title">
              Find Your <span className="careers-accent">Next Role</span>
            </h2>
            <p className="careers-subtitle">
              Join us at any stage — internship, full-time, or growth roles.
            </p>
          </div>

          <div className="careers-jobs-grid mv-anim" ref={rolesRef}>
            {displayJobs.map((r, i) => (
              <div
                key={r._id || (typeof r.title === 'string' ? r.title : i)}
                className="careers-job-card"
                style={{ "--delay": `${i * 0.12}s` }}
              >
                <div className="careers-job-header">
                  <div className="careers-job-icon">
                    {r.icon || <FiCode />}
                  </div>
                  <div className="careers-job-meta">
                    <span className="careers-job-type">{typeof r.type === 'string' ? r.type : 'Full Time'}</span>
                    <span className="careers-job-divider">•</span>
                    <span className="careers-job-location">
                      <FiMapPin /> {typeof r.location === 'string' ? r.location : 'Remote'}
                    </span>
                  </div>
                </div>

                <h3 className="careers-job-title">{typeof r.title === 'string' ? r.title : 'Untitled'}</h3>
                <p className="careers-job-desc">{typeof (r.description || r.desc) === 'string' ? (r.description || r.desc) : ''}</p>

                <div className="careers-job-footer">
                  <div className="careers-job-tags">
                    <span className="careers-job-tag"><FiClock /> {r.experience || '1-3 Years'}</span>
                  </div>
                  <a
                    href={`/about/careers/apply?id=${r._id}`}
                    className="careers-apply-btn"
                  >
                    Apply Now <FiArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="careers-cta-section mv-anim" ref={ctaRef}>
          <div className="careers-cta-bg">
            <div className="careers-cta-shape-1" />
            <div className="careers-cta-shape-2" />
            <div className="careers-cta-glow" />
          </div>
          <div className="careers-cta-content">
            <span className="careers-pill careers-pill-light">We're Hiring</span>
            <h2 className="careers-cta-title">
              Ready to Build Something Meaningful?
            </h2>
            <p className="careers-cta-subtitle">
              Send us your resume and portfolio — let's start the conversation.
            </p>
            <div className="careers-cta-actions">
              <a href="mailto:careers@Axsemsoftwares.com" className="careers-cta-btn-primary">
                Send Resume <FiArrowRight />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return ref
}

/* ── Culture Data ── */
const culture = [
  {
    icon: <FiHeart />,
    color: "#f05a28",
    title: "People First",
    desc: "We value humans over hierarchy. Respect, trust, and empathy guide how we work together."
  },
  {
    icon: <FiTrendingUp />,
    color: "#3d3d9e",
    title: "Growth Mindset",
    desc: "We invest in learning, mentorship, and continuous improvement at every career stage."
  },
  {
    icon: <FiUsers />,
    color: "#6b3fa0",
    title: "Ownership Culture",
    desc: "You own your work end-to-end. Accountability and autonomy go hand in hand here."
  }
]

/* ── Roles Data ── */
const roles = [
  {
    icon: <FiCode />,
    title: "Frontend Developer",
    desc: "Build modern, performant interfaces using React, Tailwind, and animation-driven UX.",
    type: "Full Time · Remote / Hybrid",
    applyLink: "/about/careers/apply"
  },
  {
    icon: <FiLayers />,
    title: "Backend Developer",
    desc: "Design scalable APIs, databases, and secure backend systems for real-world products.",
    type: "Full Time · Onsite",
    applyLink: "/about/careers/apply"
  },
  {
    icon: <FiCpu />,
    title: "AI / Automation Engineer",
    desc: "Work on AI-driven tools, automation pipelines, and next-gen SaaS products.",
    type: "Intern / Full Time",
    applyLink: "/about/careers/apply"
  }
]

export default function CareersPage() {
  const [jobs, setJobs] = useState([])
  const cultureRef = useReveal(0.06)
  const rolesRef = useReveal(0.06)
  const perksRef = useReveal(0.08)
  const ctaRef = useReveal(0.1)

  useEffect(() => {
    api.getCareers().then(data => {
      const normalized = Array.isArray(data) ? data.map(normalizeJob) : []
      setJobs(normalized)
    })
  }, [])

  return (
    <div className="mv-page">

      {/* ══ HERO ══ */}
      <PageHero
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Careers" }
        ]}
        pill="Join Axsem"
        pillIcon={<FiBriefcase />}
        title={
          <>
            Build Your Career<br />
            <span className="ph-gradient">With Purpose</span>
          </>
        }
        subtitle="We’re building a team of curious, driven, and kind people who want to create meaningful technology and grow together."
        tag="Careers · Axsem Softwares"
      />

      <div className="mv-body">

        {/* ══ CULTURE ══ */}
        <section className="mv-section">
          <div className="mv-section-header">
            <span className="mv-section-pill"><FiHeart /> Our Culture</span>
            <h2 className="mv-section-title">
              What It’s Like to <span className="mv-accent">Work With Us</span>
            </h2>
            <p className="mv-section-sub">
              We believe in clarity, growth, ownership, and meaningful work.
            </p>
          </div>

          <div className="mv-values-grid mv-anim" ref={cultureRef}>
            {culture.map((c, i) => (
              <div
                key={typeof c.title === 'string' ? c.title : i}
                className="mv-value-card"
                style={{ "--vc": c.color, "--delay": `${i * 0.08}s` }}
              >
                <div className="mv-value-icon">{c.icon}</div>
                <h3 className="mv-value-title">{typeof c.title === 'string' ? c.title : 'Untitled'}</h3>
                <p className="mv-value-desc">{typeof c.desc === 'string' ? c.desc : ''}</p>
                <div className="mv-value-bar" />
              </div>
            ))}
          </div>
        </section>

        {/* ══ OPEN ROLES ══ */}
        <section className="mv-section">
          <div className="mv-section-header">
            <span className="mv-section-pill"><FiBriefcase /> Open Positions</span>
            <h2 className="mv-section-title">
              Current <span className="mv-accent">Openings</span>
            </h2>
            <p className="mv-section-sub">
              Join us at any stage — internship, full-time, or growth roles.
            </p>
          </div>

          <div className="mv-goals-grid mv-anim" ref={rolesRef}>
            {(jobs.length > 0 ? jobs : roles).map((r, i) => (
              <div
                key={r._id || (typeof r.title === 'string' ? r.title : i)}
                className="mv-goal-card"
                style={{ "--gc": "#f05a28", "--delay": `${i * 0.1}s` }}
              >
                <div className="mv-goal-icon">{r.icon || <FiCode />}</div>

                <h4 className="mv-goal-title">{typeof r.title === 'string' ? r.title : 'Untitled'}</h4>
                <p className="mv-goal-desc">{typeof (r.description || r.desc) === 'string' ? (r.description || r.desc) : ''}</p>

                <span className="mv-goal-year">{typeof r.type === 'string' ? r.type : ''} · {typeof r.location === 'string' ? r.location : ''}</span>

                {/* APPLY BUTTON */}
                <a
                  href={`/about/careers/apply?id=${r._id}`}
                  className="mv-btn-primary"
                  style={{ marginTop: "14px", alignSelf: "flex-start" }}
                >
                  Apply Now <FiArrowRight />
                </a>

                <div className="mv-goal-glow" />
              </div>
            ))}
          </div>
        </section>

        {/* ══ WHY JOIN US ══ */}
        <section className="mv-section mv-promises-section">
          <div className="mv-promises-inner mv-anim" ref={perksRef}>
            <div className="mv-promises-text">
              <span className="mv-section-pill"><FiCheckCircle /> Why Axsem</span>
              <h2 className="mv-section-title">
                What You <span className="mv-accent">Get</span>
              </h2>
              <p className="mv-section-sub">
                We care about long-term careers, not short-term output.
              </p>
            </div>

            <div className="mv-promises-list">
              {[
                "Flexible work culture",
                "Learning & mentorship support",
                "Real project ownership",
                "Fast growth opportunities",
                "Supportive leadership",
                "Performance-based growth path"
              ].map((p, i) => (
                <div
                  key={i}
                  className="mv-promise-item"
                  style={{ "--delay": `${i * 0.08}s` }}
                >
                  <span className="mv-promise-icon">
                    <FiCheckCircle />
                  </span>
                  <span className="mv-promise-text">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="mv-cta-section mv-anim" ref={ctaRef}>
          <div className="mv-cta-glow" />
          <div className="mv-cta-content">
            <span className="mv-cta-pill">We’re Hiring</span>
            <h2 className="mv-cta-title">
              Ready to Build Something Meaningful?
            </h2>
            <p className="mv-cta-sub">
              Send us your resume and portfolio — let’s start the conversation.
            </p>
            <div className="mv-cta-actions">
              <a
                href="mailto:careers@Axsemsoftwares.com"
                className="mv-btn-primary"
              >
                Send Resume <FiArrowRight />
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}