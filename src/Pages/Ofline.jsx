import { useState, useEffect, useRef } from "react"
import {
    FiWifi, FiWifiOff, FiRefreshCw, FiDatabase, FiShield,
    FiSmartphone, FiMonitor, FiArrowRight, FiPlus,
    FiZap, FiLock, FiCloud, FiCpu, FiServer, FiGlobe,
    FiCheckCircle,
} from "react-icons/fi"
import PageHero from "../Components/PageHero"
import "../Styles/heroSoftware.css"
import OfflineImg from "../assets/erp.jpeg"

function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) el.classList.add("sp-revealed") },
            { threshold: 0, rootMargin: "0px 0px -40px 0px" }
        )
        obs.observe(el); return () => obs.disconnect()
    }, [])
    return ref
}

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`sp-faq-item${open ? " sp-faq-open" : ""}`}>
            <button className="sp-faq-q" onClick={() => setOpen(!open)}>
                <span>{q}</span>
                <FiPlus className="sp-faq-icon" />
            </button>
            <div className="sp-faq-a">{a}</div>
        </div>
    )
}

/* ══════════ DATA ══════════ */
const stats = [
    { val: "100%", lbl: "Offline Capable" },
    { val: "< 2s", lbl: "Auto-Sync Speed" },
    { val: "0 Loss", lbl: "Data on Disconnect" },
    { val: "Multi", lbl: "Device Support" },
]

const features = [
    {
        icon: <FiWifiOff />,
        title: "Full Offline Mode",
        desc: "Every feature works without internet — create invoices, take orders, manage inventory, and record transactions completely offline.",
    },
    {
        icon: <FiRefreshCw />,
        title: "Intelligent Auto-Sync",
        desc: "The moment connectivity returns, changes sync automatically in the background — no manual action, no duplicate entries.",
    },
    {
        icon: <FiDatabase />,
        title: "Conflict-Free Merge",
        desc: "Our sync engine detects and resolves conflicting changes from multiple devices using timestamp-based merge rules.",
    },
    {
        icon: <FiSmartphone />,
        title: "Cross-Platform",
        desc: "Native apps for Windows, Android, iOS, and a web version — all connected to the same central cloud database.",
    },
    {
        icon: <FiCloud />,
        title: "Cloud Backup",
        desc: "All local data is encrypted and backed up to the cloud every hour — even when working offline, recovery is always available.",
    },
    {
        icon: <FiShield />,
        title: "Role-Based Permissions",
        desc: "Define what each role can access online and offline — cashiers, managers, and admins each see their exact scope.",
    },
    {
        icon: <FiServer />,
        title: "Local Server Mode",
        desc: "Deploy a local LAN server for multi-terminal stores or factories — all devices sync on your internal network without internet.",
    },
    {
        icon: <FiCpu />,
        title: "Optimised for Low Hardware",
        desc: "Runs smoothly on 4GB RAM machines and 3G connections — designed specifically for Tier-2, Tier-3, and rural Indian markets.",
    },
    {
        icon: <FiLock />,
        title: "Encrypted Local Storage",
        desc: "All offline data is AES-256 encrypted on device — secure even if the device is lost or stolen.",
    },
]

const useCases = [
    {
        icon: <FiMonitor />,
        title: "Retail & POS",
        desc: "Billing continues during internet outage — transactions sync the moment connection returns. No queue. No lost sales.",
        tags: ["Billing", "Inventory", "GST"],
    },
    {
        icon: <FiGlobe />,
        title: "Field Sales Teams",
        desc: "Sales reps take orders, generate quotes, and capture customer data in areas with zero connectivity — syncs on return.",
        tags: ["Orders", "CRM", "Quotes"],
    },
    {
        icon: <FiServer />,
        title: "Factories & Warehouses",
        desc: "Production tracking, stock movements, and quality checks continue in areas with poor connectivity or internal networks.",
        tags: ["Production", "Stock", "QC"],
    },
    {
        icon: <FiSmartphone />,
        title: "NGO Field Teams",
        desc: "Field workers log beneficiaries, upload evidence, and record expenses in remote locations — syncs when back in range.",
        tags: ["Field Data", "Expenses", "Reports"],
    },
]

const steps = [
    { num: "01", title: "Cloud Setup", desc: "Deploy cloud database and configure your master data" },
    { num: "02", title: "App Install", desc: "Install on all devices — Windows, Android, or iOS" },
    { num: "03", title: "Initial Sync", desc: "Full data sync to all devices before going to field" },
    { num: "04", title: "Offline Use", desc: "Work fully offline — every transaction saved locally" },
    { num: "05", title: "Auto-Sync", desc: "Data merges automatically when connection returns" },
    { num: "06", title: "Cloud Reports", desc: "Central dashboard shows all activity across all devices" },
]

const techStack = [
    { cat: "Offline DB", items: ["SQLite", "IndexedDB", "Realm"] },
    { cat: "Sync Engine", items: ["CRDTs", "Conflict Resolution", "Delta Sync"] },
    { cat: "Cloud", items: ["PostgreSQL", "Redis", "AWS RDS"] },
    { cat: "Platforms", items: ["Electron", "React Native", "PWA", "Web"] },
]

const faqs = [
    {
        q: "What happens to data when the internet disconnects?",
        a: "Nothing is lost. All data is saved to the local device database instantly. When connectivity returns, the sync engine automatically merges everything with the cloud — no manual action needed.",
    },
    {
        q: "Can multiple devices work offline simultaneously?",
        a: "Yes. Each device maintains its own local database and syncs independently. Our conflict resolution engine handles situations where two devices modify the same record while offline.",
    },
    {
        q: "How long can the software work without internet?",
        a: "Indefinitely. There is no time limit on offline mode. The software functions fully whether it's been offline for 10 minutes or 10 days.",
    },
    {
        q: "What if two users edit the same record offline?",
        a: "Our sync engine uses timestamp-based CRDT conflict resolution — the most recent change wins, and an audit log records both versions for review.",
    },
    {
        q: "Is offline data secure?",
        a: "Yes. All locally stored data is AES-256 encrypted. Even if the device is stolen, the data cannot be read without the application credentials.",
    },
    {
        q: "Can we deploy it on our own servers?",
        a: "Yes. We offer a full on-premises deployment option where your cloud server runs inside your own infrastructure — ideal for banks, government, and regulated industries.",
    },
]

/* ══════════ COMPONENT ══════════ */
export default function OnlineOfflineSoftwarePage() {
    const statsRef = useReveal()
    const overRef = useReveal()
    const casesRef = useReveal()
    const featRef = useReveal()
    const stepsRef = useReveal()
    const techRef = useReveal()
    const faqRef = useReveal()

    return (
        <div className="sp-page">
            <PageHero
                breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Online & Offline Software" }]}
                pill="Online & Offline Software"
                title={<>Software That Works<br /><span className="ph-gradient">With or Without Internet</span></>}
                subtitle="Full-featured offline mode with intelligent auto-sync — your business never stops, even when the internet does. Built for India's connectivity realities."
                tag="Offline-First · Auto-Sync · Cross-Platform · Conflict-Free Merge"
            />

            <div className="sp-body">

                {/* ── Stats ── */}
                <div className="sp-stats-strip sp-anim" ref={statsRef}>
                    {stats.map((s, i) => (
                        <div key={s.lbl} className="sp-stat-card" style={{ "--delay": `${i * 0.08}s` }}>
                            <span className="sp-stat-val">{s.val}</span>
                            <span className="sp-stat-lbl">{s.lbl}</span>
                        </div>
                    ))}
                </div>

                {/* ── Overview ── */}
                <div className="sp-overview-grid sp-anim" ref={overRef}>
                    <div className="sp-overview-text">
                        <h2 className="sp-overview-title">
                            Your Business Doesn't Stop<br />
                            <span className="sp-hl">When the Internet Does</span>
                        </h2>
                        <p className="sp-overview-para">
                            Most cloud software becomes completely unusable during outages. Our offline-first
                            architecture stores everything locally and syncs intelligently — so retailers,
                            field teams, factories, and NGOs can keep working without a single hiccup.
                        </p>
                        <ul className="sp-checklist">
                            {[
                                "Every feature works 100% offline — billing, orders, inventory, reports",
                                "Auto-sync in the background the moment connectivity returns",
                                "Conflict-free merge when multiple devices sync simultaneously",
                                "Cross-platform — Windows, Android, iOS, and Web",
                                "Local LAN server mode for multi-terminal stores and factories",
                            ].map(item => (
                                <li key={item}>
                                    <span className="sp-check-icon">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            <a href="/contact" className="sp-btn-primary">
                                Book a Demo <FiArrowRight />
                            </a>
                            <a href="/contact" className="sp-btn-primary"
                                style={{ background: "var(--sp-white)", color: "var(--sp-orange)", border: "1.5px solid var(--sp-orange)" }}>
                                Get Free Trial <FiArrowRight />
                            </a>
                        </div>
                    </div>

                    {/* Sync UI mockup */}
                    <div className="sp-overview-visual">
                        <div className="sp-visual-box">
                            <div className="sp-dash-mock">
                                <div className="sp-dm-topbar">
                                    <span className="sp-dm-dot sp-dm-d1" />
                                    <span className="sp-dm-dot sp-dm-d2" />
                                    <span className="sp-dm-dot sp-dm-d3" />
                                    <span className="sp-dm-title">Sync Status — Live</span>
                                </div>

                                {/* sync status indicators */}
                                <div className="sp-sync-row">
                                    <div className="sp-sync-device">
                                        <FiMonitor className="sp-sync-icon" />
                                        <span className="sp-sync-name">Counter 1</span>
                                        <span className="sp-sync-badge sp-sync-online">Online</span>
                                    </div>
                                    <div className="sp-sync-device">
                                        <FiSmartphone className="sp-sync-icon" />
                                        <span className="sp-sync-name">Mobile App</span>
                                        <span className="sp-sync-badge sp-sync-offline">Offline — 28 pending</span>
                                    </div>
                                    <div className="sp-sync-device">
                                        <FiMonitor className="sp-sync-icon" />
                                        <span className="sp-sync-name">Counter 2</span>
                                        <span className="sp-sync-badge sp-sync-syncing">Syncing…</span>
                                    </div>
                                </div>

                                <div className="sp-dm-grid" style={{ marginTop: 12 }}>
                                    <div className="sp-dm-kpi sp-dm-kpi-orange">
                                        <span className="sp-dm-kval">₹4.2L</span>
                                        <span className="sp-dm-klbl">Today's Sales</span>
                                    </div>
                                    <div className="sp-dm-kpi">
                                        <span className="sp-dm-kval">847</span>
                                        <span className="sp-dm-klbl">Transactions</span>
                                    </div>
                                    <div className="sp-dm-kpi">
                                        <span className="sp-dm-kval">3</span>
                                        <span className="sp-dm-klbl">Devices Active</span>
                                    </div>
                                    <div className="sp-dm-kpi">
                                        <span className="sp-dm-kval">0</span>
                                        <span className="sp-dm-klbl">Data Conflicts</span>
                                    </div>
                                </div>
                            </div>
                            <img src={OfflineImg} alt="Offline Software" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.3 }} />
                        </div>
                        <div className="sp-visual-badge sp-vb-1">
                            <FiWifiOff style={{ color: "var(--sp-orange)" }} /> Works Offline
                        </div>
                        <div className="sp-visual-badge sp-vb-2">
                            <FiRefreshCw style={{ color: "var(--sp-orange)" }} /> Auto-Sync
                        </div>
                    </div>
                </div>

                {/* ── Use Cases ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Who Uses It</div>
                        <h2 className="sp-section-title">
                            Built for <span className="sp-hl">These Real Scenarios</span>
                        </h2>
                        <p className="sp-section-sub">
                            Any business where connectivity is unreliable — our software keeps them running.
                        </p>
                    </div>
                    <div className="sp-cards-grid sp-cols-2 sp-anim" ref={casesRef}>
                        {useCases.map((c, i) => (
                            <div key={c.title} className="sp-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-card-icon">{c.icon}</div>
                                <h3 className="sp-card-title">{c.title}</h3>
                                <p className="sp-card-desc">{c.desc}</p>
                                <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
                                    {c.tags.map(t => (
                                        <span key={t} className="sp-tag-pill">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Features ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Features</div>
                        <h2 className="sp-section-title">
                            Everything You Need <span className="sp-hl">Online & Offline</span>
                        </h2>
                        <p className="sp-section-sub">
                            Not a stripped-down offline mode — the full product, working completely offline.
                        </p>
                    </div>
                    <div className="sp-cards-grid sp-cols-3 sp-anim" ref={featRef}>
                        {features.map((f, i) => (
                            <div key={f.title} className="sp-card" style={{ "--delay": `${i * 0.07}s` }}>
                                <div className="sp-card-icon">{f.icon}</div>
                                <h3 className="sp-card-title">{f.title}</h3>
                                <p className="sp-card-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Steps ── */}
                <div>
                    <div className="sp-section-header sp-center">
                        <div className="sp-pill">How It Works</div>
                        <h2 className="sp-section-title">
                            The <span className="sp-hl">Sync Lifecycle</span>
                        </h2>
                        <p className="sp-section-sub">
                            From cloud setup to seamless offline-online operation — simple, automatic, and reliable.
                        </p>
                    </div>
                    <div className="sp-steps-grid sp-anim" ref={stepsRef}>
                        {steps.map((s, i) => (
                            <div key={s.num} className="sp-step" style={{ "--delay": `${i * 0.08}s` }}>
                                <div className="sp-step-num"><span>{s.num}</span></div>
                                <div className="sp-step-title">{s.title}</div>
                                <div className="sp-step-desc">{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Tech Stack ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">Technology</div>
                        <h2 className="sp-section-title">
                            Offline-First <span className="sp-hl">Architecture</span>
                        </h2>
                        <p className="sp-section-sub">
                            Built on battle-tested offline-sync technologies used by companies like Figma, Notion, and Linear.
                        </p>
                    </div>
                    <div className="sp-tech-grid sp-anim" ref={techRef}>
                        {techStack.map((t, i) => (
                            <div key={t.cat} className="sp-tech-card" style={{ "--delay": `${i * 0.08}s` }}>
                                <span className="sp-tech-cat">{t.cat}</span>
                                <div className="sp-tech-items">
                                    {t.items.map(item => <span key={item} className="sp-tech-item">{item}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── FAQ ── */}
                <div>
                    <div className="sp-section-header">
                        <div className="sp-pill">FAQ</div>
                        <h2 className="sp-section-title">
                            Common <span className="sp-hl">Questions</span>
                        </h2>
                    </div>
                    <div className="sp-faq-list sp-anim" ref={faqRef}>
                        {faqs.map((f, i) => (
                            <div key={i} style={{ "--delay": `${i * 0.06}s` }}>
                                <FaqItem q={f.q} a={f.a} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CTA ── */}
                <div className="sp-cta">
                    <div className="sp-pill" style={{ marginBottom: 20 }}>Start Today</div>
                    <h2 className="sp-cta-title">Stop Losing Business to Internet Outages</h2>
                    <p className="sp-cta-sub">
                        Book a free demo — we'll show you exactly how your business keeps running when connectivity fails.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/contact" className="sp-btn-primary">
                            Book Free Demo <FiArrowRight />
                        </a>
                        <a href="/contact" className="sp-btn-primary"
                            style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                            Start Free Trial <FiArrowRight />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}