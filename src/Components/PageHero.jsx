import { Link } from "react-router-dom"
import { FiHome, FiChevronRight, FiCode, FiCloud, FiDatabase, FiShield, FiServer, FiGlobe, FiTool } from "react-icons/fi"
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram, FaReact, FaNodeJs, FaPython, FaAndroid, FaVuejs, FaAws, FaDocker, FaFigma } from "react-icons/fa6"
import "../Styles/PageHero.css"

const SOCIALS = [
    { icon: <FaLinkedinIn />, href: "https://linkedin.com/company/axsem", label: "LinkedIn" },
    { icon: <FaXTwitter />, href: "https://twitter.com/axsem", label: "Twitter" },
    { icon: <FaGithub />, href: "https://github.com/axsem", label: "GitHub" },
    { icon: <FaInstagram />, href: "https://instagram.com/axsem", label: "Instagram" },
]

/* ─────────────────────────────────────────────────
   detectVisual — picks 3D element from pill string
───────────────────────────────────────────────── */
function detectVisual(pill = "") {
    const p = pill.toLowerCase()
    if (p.includes("seo") || p.includes("search engine")) return "seo"
    if (p.includes("social media")) return "social"
    if (p.includes("artificial intelligence") || p.includes("ai")) return "ai"
    if (p.includes("mobile")) return "mobile"
    if (p.includes("software") || p.includes("development")) return "code"
    if (p.includes("graphic") || p.includes("logo") || p.includes("brand") || p.includes("print") || p.includes("design package")) return "design"
    if (p.includes("ecommerce") || p.includes("e-commerce") || p.includes("shop")) return "ecommerce"
    if (p.includes("hotel")) return "hotel"
    if (p.includes("school") || p.includes("lms") || p.includes("learn")) return "edu"
    if (p.includes("hr") || p.includes("payroll") || p.includes("people")) return "hr"
    if (p.includes("tour") || p.includes("travel")) return "travel"
    if (p.includes("ngo")) return "ngo"
    if (p.includes("restaurant") || p.includes("food")) return "food"
    if (p.includes("real estate") || p.includes("prop")) return "realestate"
    if (p.includes("crm") || p.includes("biz")) return "crm"
    if (p.includes("website") || p.includes("web")) return "web"
    if (p.includes("marketing") || p.includes("digital")) return "marketing"
    if (p.includes("client") || p.includes("our work") || p.includes("portfolio")) return "portfolio"
    if (p.includes("purpose") || p.includes("mission") || p.includes("about")) return "about"
    if (p.includes("maintenance") || p.includes("support") || p.includes("it")) return "support"
    return "default"
}

/* ─────────────────────────────────────────────────
   3D SVG VISUALS
   CSS vars used: --ph-card, --ph-border, --ph-glass,
   --ph-line, --ph-text, --ph-text-dim, --ph-shadow
───────────────────────────────────────────────── */
const Visuals = {

    seo: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="seoG1" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#ff8c5a" /></linearGradient>
                <linearGradient id="seoG2" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#3d3d9e" stopOpacity=".8" /><stop offset="100%" stopColor="#6b6bcf" /></linearGradient>
                <filter id="seoS"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#f05a28" floodOpacity=".22" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            {[{ x: 22, h: 55, g: "seoG2", d: 0 }, { x: 60, h: 90, g: "seoG1", d: .08 }, { x: 98, h: 125, g: "seoG1", d: .16 }, { x: 136, h: 72, g: "seoG2", d: .08 }, { x: 174, h: 105, g: "seoG1", d: .12 }].map((b, i) => (
                <g key={i} style={{ animation: `ph3dRise .8s cubic-bezier(.34,1.56,.64,1) ${b.d}s both` }}>
                    <rect x={b.x} y={195 - b.h} width="26" height={b.h} rx="4" fill={`url(#${b.g})`} filter="url(#seoS)" />
                    <path d={`M${b.x},${195 - b.h} l7,-7 l26,0 l-26,0 Z`} fill={b.g === "seoG1" ? "#ff9a6a" : "#5a5acf"} opacity=".65" />
                    <path d={`M${b.x + 26},${195 - b.h} l7,-7 l0,${b.h} l-7,7 Z`} fill={b.g === "seoG1" ? "#c04820" : "#2d2d7e"} opacity=".55" />
                </g>
            ))}
            <polyline points="35,142 73,108 111,66 149,118 187,82" fill="none" stroke="#f05a28" strokeWidth="2.5" strokeDasharray="6 3" opacity=".7" style={{ animation: "ph3dDash 2s linear infinite" }} />
            <g style={{ animation: "ph3dFloat 3s ease-in-out infinite", transformOrigin: "185px 36px" }}>
                <circle cx="180" cy="34" r="21" fill="none" stroke="#f05a28" strokeWidth="2.5" opacity=".9" />
                <circle cx="180" cy="34" r="12" fill="var(--ph-glass)" />
                <line x1="195" y1="49" x2="212" y2="66" stroke="#f05a28" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="176" y1="28" x2="176" y2="40" stroke="#f05a28" strokeWidth="1.8" strokeLinecap="round" opacity=".5" />
                <line x1="170" y1="34" x2="182" y2="34" stroke="#f05a28" strokeWidth="1.8" strokeLinecap="round" opacity=".5" />
            </g>
        </svg>
    ),

    web: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="webG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#3d3d9e" /></linearGradient>
                <filter id="webS"><feDropShadow dx="2" dy="8" stdDeviation="10" floodColor="#3d3d9e" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 3.5s ease-in-out infinite" }}>
                <g transform="rotate(-4,120,105)">
                    <rect x="34" y="46" width="28" height="120" rx="0" fill="url(#webG)" opacity=".08" transform="translate(6,8)" />
                    <rect x="28" y="38" width="180" height="126" rx="13" fill="var(--ph-card)" filter="url(#webS)" stroke="var(--ph-border)" strokeWidth="1.5" />
                    <rect x="28" y="38" width="180" height="34" rx="13" fill="url(#webG)" opacity=".9" />
                    <rect x="28" y="60" width="180" height="12" fill="url(#webG)" opacity=".9" />
                    <circle cx="46" cy="55" r="5" fill="#ff5f57" /><circle cx="60" cy="55" r="5" fill="#febc2e" /><circle cx="74" cy="55" r="5" fill="#28c840" />
                    <rect x="84" y="48" width="90" height="14" rx="7" fill="var(--ph-glass)" opacity=".45" />
                    <text x="92" y="59" fontSize="7" fill="var(--ph-text-dim)" fontFamily="monospace">axsemsoftwares.com</text>
                    <rect x="42" y="84" width="56" height="8" rx="4" fill="var(--ph-line)" opacity=".7" />
                    <rect x="42" y="97" width="92" height="6" rx="3" fill="var(--ph-line)" opacity=".45" />
                    <rect x="42" y="109" width="74" height="6" rx="3" fill="var(--ph-line)" opacity=".35" />
                    <rect x="42" y="124" width="64" height="22" rx="11" fill="url(#webG)" opacity=".88" />
                    <text x="74" y="138" fontSize="7.5" fill="white" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle" fontWeight="700">Get Started →</text>
                    <rect x="148" y="84" width="50" height="68" rx="8" fill="url(#webG)" opacity=".12" stroke="url(#webG)" strokeWidth="1" />
                    <text x="173" y="123" fontSize="22" textAnchor="middle" fill="url(#webG)" opacity=".35">⬡</text>
                </g>
            </g>
        </svg>
    ),

    code: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="codeG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#111128" /><stop offset="100%" stopColor="#1e1e3a" /></linearGradient>
                <filter id="codeS"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#f05a28" floodOpacity=".15" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 3s ease-in-out infinite" }}><g transform="rotate(-3,120,105)">
                <rect x="28" y="28" width="184" height="148" rx="14" fill="url(#codeG)" filter="url(#codeS)" stroke="#f05a28" strokeWidth="1" strokeOpacity=".28" />
                <rect x="28" y="28" width="184" height="36" rx="14" fill="#0a0a1a" />
                <rect x="28" y="50" width="184" height="14" fill="#0a0a1a" />
                <circle cx="46" cy="46" r="5" fill="#ff5f57" /><circle cx="60" cy="46" r="5" fill="#febc2e" /><circle cx="74" cy="46" r="5" fill="#28c840" />
                <text x="120" y="50" fontSize="8" fill="rgba(255,255,255,.25)" fontFamily="monospace" textAnchor="middle">MarketingPage.jsx</text>
                {[
                    { y: 78, col: "#c792ea", t: "import", x: 44 }, { y: 78, col: "#82aaff", t: " React, { useState }", x: 76 },
                    { y: 90, col: "#f05a28", t: "const", x: 44 }, { y: 90, col: "#eeffff", t: " Page", x: 72 }, { y: 90, col: "#89ddff", t: " = () =>", x: 92 },
                    { y: 102, col: "#c3e88d", t: "  return (", x: 44 },
                    { y: 114, col: "#f78c6c", t: "    <section", x: 44 }, { y: 114, col: "#c3e88d", t: " className", x: 100 },
                    { y: 126, col: "#f78c6c", t: "      <Hero ", x: 44 }, { y: 126, col: "#89ddff", t: "/>", x: 96 },
                    { y: 138, col: "#f78c6c", t: "      <Services", x: 44 }, { y: 138, col: "#89ddff", t: "/>", x: 108 },
                    { y: 150, col: "#c3e88d", t: "    </section>", x: 44 },
                    { y: 162, col: "#c792ea", t: "export default", x: 44 }, { y: 162, col: "#82aaff", t: " Page", x: 104 },
                ].map((l, i) => (
                    <text key={i} x={l.x} y={l.y} fontSize="8.5" fill={l.col} fontFamily="monospace"
                        style={{ animation: `ph3dFade .4s ease ${i * .045}s both` }}>{l.t}</text>
                ))}
                <rect x="42" y="155" width="1.5" height="10" fill="#f05a28" style={{ animation: "ph3dBlink 1s step-end infinite" }} />
                {[78, 90, 102, 114, 126, 138, 150, 162].map((y, i) => (
                    <text key={y} x="36" y={y} fontSize="7" fill="rgba(255,255,255,.13)" fontFamily="monospace">{i + 1}</text>
                ))}
            </g></g>
        </svg>
    ),

    ai: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <radialGradient id="aiN1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#c04820" /></radialGradient>
                <radialGradient id="aiN2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#6b3fa0" /><stop offset="100%" stopColor="#3d3d9e" /></radialGradient>
                <filter id="aiG"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="70" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            {[[38, 56, 98, 96], [38, 96, 98, 96], [38, 136, 98, 96], [38, 56, 98, 136], [38, 136, 98, 136], [38, 96, 98, 56], [98, 56, 158, 76], [98, 96, 158, 76], [98, 136, 158, 116], [98, 56, 158, 116], [98, 96, 158, 116], [98, 56, 158, 156], [158, 76, 198, 96], [158, 116, 198, 96], [158, 156, 198, 96]].map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#aiN2)" strokeWidth=".9" opacity=".28" style={{ animation: `ph3dPulse 2.5s ease ${i * .1}s infinite` }} />
            ))}
            {[56, 96, 136].map((y, i) => <circle key={y} cx="38" cy={y} r="9" fill="url(#aiN2)" filter="url(#aiG)" style={{ animation: `ph3dPulse 2s ease ${i * .2}s infinite` }} />)}
            {[56, 96, 136].map((y, i) => <circle key={y} cx="98" cy={y} r="12" fill="url(#aiN1)" filter="url(#aiG)" style={{ animation: `ph3dPulse 2s ease ${i * .2 + .3}s infinite` }} />)}
            {[76, 116, 156].map((y, i) => <circle key={y} cx="158" cy={y} r="9" fill="url(#aiN2)" filter="url(#aiG)" style={{ animation: `ph3dPulse 2s ease ${i * .2 + .6}s infinite` }} />)}
            <circle cx="198" cy="96" r="14" fill="url(#aiN1)" filter="url(#aiG)" style={{ animation: "ph3dPulse 2s ease .9s infinite" }} />
            <text x="198" y="100" fontSize="8.5" fill="white" fontFamily="monospace" textAnchor="middle" fontWeight="700">AI</text>
            {[{ cx: 68, cy: 18 }, { cx: 178, cy: 186 }, { cx: 218, cy: 54 }].map((p, i) => (
                <circle key={i} cx={p.cx} cy={p.cy} r="3.5" fill="#f05a28" opacity=".45" style={{ animation: `ph3dFloat ${2.2 + i * .6}s ease-in-out ${i * .5}s infinite` }} />
            ))}
        </svg>
    ),

    mobile: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="mobG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3d3d9e" /><stop offset="100%" stopColor="#111148" /></linearGradient>
                <filter id="mobS"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#3d3d9e" floodOpacity=".22" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="55" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 3.5s ease-in-out infinite" }} transform="rotate(-8,120,105)">
                <rect x="70" y="18" width="100" height="174" rx="19" fill="url(#mobG)" filter="url(#mobS)" />
                <rect x="70" y="18" width="100" height="174" rx="19" fill="none" stroke="#f05a28" strokeWidth="1.5" strokeOpacity=".38" />
                <rect x="76" y="38" width="88" height="134" rx="9" fill="var(--ph-card)" />
                <rect x="98" y="24" width="44" height="8" rx="4" fill="var(--ph-border)" />
                <rect x="80" y="46" width="80" height="16" rx="8" fill="url(#mobG)" opacity=".72" />
                <rect x="80" y="68" width="52" height="6" rx="3" fill="var(--ph-line)" opacity=".6" />
                <rect x="80" y="80" width="68" height="6" rx="3" fill="var(--ph-line)" opacity=".4" />
                <rect x="80" y="92" width="58" height="6" rx="3" fill="var(--ph-line)" opacity=".32" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                    <rect key={i} x={80 + (i % 4) * 20} y={108 + Math.floor(i / 4) * 20} width="16" height="16" rx="5"
                        fill={i % 3 === 0 ? "#f05a28" : i % 3 === 1 ? "#3d3d9e" : "var(--ph-line)"} opacity=".72" />
                ))}
                <rect x="98" y="158" width="44" height="5" rx="2.5" fill="var(--ph-border)" opacity=".65" />
                <circle cx="120" cy="177" r="5" fill="none" stroke="var(--ph-border)" strokeWidth="1.5" />
            </g>
            <circle cx="170" cy="26" r="13" fill="#f05a28" style={{ animation: "ph3dBounce 2s ease-in-out .5s infinite" }} />
            <text x="170" y="31" fontSize="10" fill="white" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle" fontWeight="800">3</text>
        </svg>
    ),

    design: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="dG1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#ff8c5a" /></linearGradient>
                <linearGradient id="dG2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6b3fa0" /><stop offset="100%" stopColor="#3d3d9e" /></linearGradient>
                <linearGradient id="dG3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0e9e6e" /><stop offset="100%" stopColor="#0cc77e" /></linearGradient>
                <filter id="dS"><feDropShadow dx="0" dy="6" stdDeviation="7" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            {[{ x: 16, y: 54, g: "dG1", d: 0, s: 46 }, { x: 72, y: 34, g: "dG2", d: .3, s: 40 }, { x: 130, y: 48, g: "dG3", d: .6, s: 44 }, { x: 186, y: 40, g: "dG1", d: .9, s: 38 }].map((s, i) => (
                <g key={i} style={{ animation: `ph3dFloat ${3 + i * .4}s ease-in-out ${s.d}s infinite` }}>
                    <rect x={s.x} y={s.y} width={s.s} height={s.s * 1.3} rx="9" fill={`url(#${s.g})`} filter="url(#dS)" />
                    <rect x={s.x} y={s.y + s.s * 1.3 - 15} width={s.s} height="15" rx="0 0 9 9" fill="rgba(255,255,255,.14)" />
                </g>
            ))}
            <g style={{ animation: "ph3dFloat 4s ease-in-out 1.1s infinite" }} transform="translate(54,116)">
                <line x1="0" y1="0" x2="86" y2="-64" stroke="#f05a28" strokeWidth="1.8" strokeDasharray="5 3" opacity=".45" />
                <polygon points="0,0 15,-25 -14,-12" fill="url(#dG1)" filter="url(#dS)" />
                <circle cx="86" cy="-64" r="6.5" fill="var(--ph-card)" stroke="#f05a28" strokeWidth="2" />
                <circle cx="0" cy="0" r="4.5" fill="url(#dG2)" />
            </g>
            {["#f05a28", "#3d3d9e", "#0e9e6e", "#f5a623", "#e63b2a"].map((c, i) => (
                <circle key={c} cx={68 + i * 26} cy={192} r="11" fill={c} style={{ animation: `ph3dRise .6s ease ${i * .08}s both` }} />
            ))}
        </svg>
    ),

    social: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="socG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e63b2a" /><stop offset="100%" stopColor="#f05a28" /></linearGradient>
                <filter id="socS"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <ellipse cx="110" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 3s ease-in-out infinite" }} transform="rotate(-5,100,105)">
                <rect x="46" y="26" width="104" height="156" rx="15" fill="var(--ph-card)" stroke="var(--ph-border)" strokeWidth="1.5" filter="url(#socS)" />
                <circle cx="98" cy="62" r="20" fill="url(#socG)" />
                <text x="98" y="68" fontSize="15" textAnchor="middle" fill="white" fontWeight="800">A</text>
                <rect x="70" y="88" width="56" height="6" rx="3" fill="var(--ph-line)" opacity=".7" />
                <rect x="80" y="100" width="36" height="5" rx="2.5" fill="var(--ph-line)" opacity=".4" />
                {[{ x: 56, n: "12K", l: "Posts" }, { x: 92, n: "58K", l: "Followers" }, { x: 128, n: "4.2K", l: "Following" }].map((s, i) => (
                    <g key={i}><text x={s.x} y="120" fontSize="8" fontWeight="700" fill="var(--ph-text)" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle">{s.n}</text>
                        <text x={s.x} y="130" fontSize="6" fill="var(--ph-text-dim)" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle">{s.l}</text></g>
                ))}
                <rect x="58" y="140" width="80" height="26" rx="13" fill="url(#socG)" opacity=".9" />
                <text x="98" y="157" fontSize="9" fill="white" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle" fontWeight="700">♥  Follow</text>
                <rect x="58" y="174" width="80" height="2" rx="1" fill="var(--ph-border)" opacity=".5" />
            </g>
            {[{ x: 172, y: 46, t: "♥", c: "#e63b2a", d: 0 }, { x: 22, y: 76, t: "▲84%", c: "#0e9e6e", d: .4 }, { x: 186, y: 136, t: "10K", c: "#f05a28", d: .8 }].map((b, i) => (
                <g key={i} style={{ animation: `ph3dFloat ${2.5 + i * .5}s ease-in-out ${b.d}s infinite` }}>
                    <rect x={b.x - 20} y={b.y - 13} width="50" height="24" rx="12" fill="var(--ph-card)" stroke={b.c} strokeWidth="1.5" />
                    <text x={b.x + 5} y={b.y + 2} fontSize="9.5" fill={b.c} fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle" fontWeight="700">{b.t}</text>
                </g>
            ))}
        </svg>
    ),

    ecommerce: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="ecoG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#ff8c5a" /></linearGradient>
                <filter id="ecoS"><feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#f05a28" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            {[{ x: 18, y: 36, d: 0 }, { x: 140, y: 54, d: .4 }, { x: 76, y: 16, d: .7 }].map((c, i) => (
                <g key={i} style={{ animation: `ph3dFloat ${3 + i * .4}s ease-in-out ${c.d}s infinite` }}>
                    <rect x={c.x} y={c.y} width="76" height="90" rx="11" fill="var(--ph-card)" stroke="var(--ph-border)" strokeWidth="1.5" filter="url(#ecoS)" />
                    <rect x={c.x + 4} y={c.y + 4} width="68" height="50" rx="7" fill="url(#ecoG)" opacity={.12 + i * .08} />
                    <text x={c.x + 38} y={c.y + 34} fontSize="24" textAnchor="middle">📦</text>
                    <rect x={c.x + 8} y={c.y + 60} width="38" height="5" rx="2.5" fill="var(--ph-line)" opacity=".7" />
                    <rect x={c.x + 8} y={c.y + 70} width="28" height="5" rx="2.5" fill="var(--ph-line)" opacity=".4" />
                    <rect x={c.x + 8} y={c.y + 78} width="58" height="9" rx="4.5" fill="url(#ecoG)" opacity=".82" />
                </g>
            ))}
            <g style={{ animation: "ph3dBounce 2.5s ease-in-out 1s infinite" }} transform="translate(152,126)">
                <rect x="0" y="0" width="64" height="55" rx="13" fill="url(#ecoG)" filter="url(#ecoS)" />
                <text x="32" y="36" fontSize="28" textAnchor="middle" fill="white">🛒</text>
                <circle cx="58" cy="-5" r="12" fill="#0e9e6e" /><text x="58" y="-.5" fontSize="11" fill="white" textAnchor="middle" fontWeight="800">3</text>
            </g>
        </svg>
    ),

    hotel: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="htlG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f5a623" /><stop offset="100%" stopColor="#f05a28" /></linearGradient>
                <filter id="htlS"><feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#f5a623" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="204" rx="88" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 4s ease-in-out infinite" }}>
                <polygon points="170,48 214,68 214,184 170,164" fill="url(#htlG)" opacity=".48" />
                <polygon points="40,68 170,48 170,164 40,184" fill="var(--ph-card)" stroke="var(--ph-border)" strokeWidth="1.5" filter="url(#htlS)" />
                <polygon points="40,68 170,48 214,68 84,88" fill="url(#htlG)" opacity=".82" />
                {Array.from({ length: 12 }, (_, i) => {
                    const col = i % 4, row = Math.floor(i / 4); return (
                        <rect key={i} x={56 + col * 26} y={90 + row * 22} width="16" height="14" rx="2"
                            fill={i % 3 === 0 ? "url(#htlG)" : "var(--ph-glass)"} opacity={i % 3 === 0 ? .82 : .55}
                            style={{ animation: `ph3dFade .5s ease ${i * .05}s both` }} />
                    )
                })}
                <rect x="90" y="148" width="36" height="36" rx="4" fill="url(#htlG)" opacity=".82" />
                {[0, 1, 2, 3, 4].map(i => (<text key={i} x={76 + i * 17} y="46" fontSize="11" fill="#f5a623" style={{ animation: `ph3dFade .4s ease ${i * .08}s both` }}>★</text>))}
            </g>
        </svg>
    ),

    edu: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="eduG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0e9e6e" /><stop offset="100%" stopColor="#0cc77e" /></linearGradient>
                <filter id="eduS"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0e9e6e" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 3.5s ease-in-out infinite" }} transform="translate(10,22)">
                <path d="M110,40 Q58,34 16,50 L16,155 Q58,140 110,145 Z" fill="var(--ph-card)" stroke="var(--ph-border)" strokeWidth="1.5" filter="url(#eduS)" />
                <path d="M110,40 Q162,34 204,50 L204,155 Q162,140 110,145 Z" fill="var(--ph-card)" stroke="var(--ph-border)" strokeWidth="1.5" />
                <line x1="110" y1="40" x2="110" y2="145" stroke="url(#eduG)" strokeWidth="3" />
                {[64, 79, 94, 109, 124].map((y, i) => <line key={y} x1={30} y1={y} x2={92} y2={y - 2} stroke="var(--ph-line)" strokeWidth="4" strokeLinecap="round" opacity={.5 - i * .05} style={{ animation: `ph3dFade .4s ease ${i * .06}s both` }} />)}
                <rect x="120" y="60" width="72" height="9" rx="4.5" fill="url(#eduG)" opacity=".7" />
                {[78, 92, 106, 120].map((y, i) => <line key={y} x1="120" y1={y} x2={120 + 52 - i * 5} y2={y} stroke="var(--ph-line)" strokeWidth="4" strokeLinecap="round" opacity=".38" />)}
                <g style={{ animation: "ph3dBounce 2s ease-in-out .5s infinite" }} transform="translate(96,-24)">
                    <polygon points="20,20 42,10 64,20 42,32" fill="url(#eduG)" />
                    <rect x="37" y="20" width="10" height="14" rx="2" fill="url(#eduG)" opacity=".82" />
                    <line x1="42" y1="10" x2="42" y2="0" stroke="url(#eduG)" strokeWidth="2.5" />
                    <circle cx="42" cy="-2" r="4.5" fill="#f05a28" />
                </g>
            </g>
        </svg>
    ),

    hr: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="hrG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3d3d9e" /><stop offset="100%" stopColor="#6b6bcf" /></linearGradient>
                <filter id="hrS"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#3d3d9e" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            {[{ cx: 78, cy: 76, d: 0 }, { cx: 130, cy: 60, d: .3 }, { cx: 180, cy: 76, d: .6 }].map((p, i) => (
                <g key={i} style={{ animation: `ph3dFloat ${3 + i * .4}s ease-in-out ${p.d}s infinite` }}>
                    <circle cx={p.cx} cy={p.cy} r="23" fill={`url(#hrG)`} filter="url(#hrS)" opacity={.68 + i * .1} />
                    <circle cx={p.cx} cy={p.cy - 7} r="10" fill="white" opacity=".88" />
                    <path d={`M${p.cx - 17},${p.cy + 20} Q${p.cx},${p.cy + 8} ${p.cx + 17},${p.cy + 20}`} fill="white" opacity=".88" />
                </g>
            ))}
            <line x1="130" y1="84" x2="130" y2="108" stroke="url(#hrG)" strokeWidth="2" opacity=".45" />
            <line x1="78" y1="108" x2="180" y2="108" stroke="url(#hrG)" strokeWidth="2" opacity=".45" />
            <line x1="78" y1="108" x2="78" y2="126" stroke="url(#hrG)" strokeWidth="2" opacity=".45" />
            <line x1="180" y1="108" x2="180" y2="126" stroke="url(#hrG)" strokeWidth="2" opacity=".45" />
            {[{ cx: 58, cy: 146 }, { cx: 98, cy: 146 }, { cx: 156, cy: 146 }, { cx: 196, cy: 146 }].map((n, i) => (
                <circle key={i} cx={n.cx} cy={n.cy} r="15" fill="url(#hrG)" opacity=".48" style={{ animation: `ph3dRise .5s ease ${i * .1}s both` }} />
            ))}
            <g style={{ animation: "ph3dFloat 2.5s ease-in-out 1.2s infinite" }} transform="translate(26,136)">
                <rect x="0" y="0" width="78" height="56" rx="9" fill="var(--ph-card)" stroke="url(#hrG)" strokeWidth="1.5" />
                <text x="39" y="16" fontSize="7.5" fill="var(--ph-text)" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle" fontWeight="800">PAYSLIP</text>
                <rect x="6" y="22" width="66" height="1.5" fill="var(--ph-line)" opacity=".38" />
                {["Basic Salary", "HRA", "Bonus"].map((t, i) => (
                    <text key={t} x="8" y={31 + i * 9} fontSize="6.5" fill="var(--ph-text-dim)" fontFamily="'Plus Jakarta Sans',sans-serif">{t}</text>
                ))}
                <text x="72" y="31" fontSize="6.5" fill="#0e9e6e" fontFamily="monospace" textAnchor="end">₹25,000</text>
            </g>
        </svg>
    ),

    travel: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="trvG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#f5a623" /></linearGradient>
                <filter id="trvS"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#f05a28" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dSpin 14s linear infinite", transformOrigin: "120px 104px" }}>
                <circle cx="120" cy="104" r="74" fill="none" stroke="var(--ph-border)" strokeWidth="1.5" />
                {[-42, 0, 42].map((rx, i) => <ellipse key={i} cx="120" cy="104" rx={Math.abs(rx) || 2} ry="74" fill="none" stroke="url(#trvG)" strokeWidth=".9" opacity=".28" transform={`rotate(${rx},120,104)`} />)}
                {[-32, 0, 32].map((dy, i) => <ellipse key={i} cx="120" cy={104 + dy} rx={Math.sqrt(74 * 74 - dy * dy)} ry="13" fill="none" stroke="url(#trvG)" strokeWidth=".9" opacity=".22" />)}
                <ellipse cx="98" cy="94" rx="23" ry="17" fill="url(#trvG)" opacity=".32" />
                <ellipse cx="144" cy="108" rx="18" ry="14" fill="url(#trvG)" opacity=".28" />
                <ellipse cx="112" cy="128" rx="14" ry="9" fill="url(#trvG)" opacity=".22" />
            </g>
            <g style={{ animation: "ph3dPlane 4s ease-in-out infinite", transformOrigin: "120px 58px" }}>
                <text x="120" y="66" fontSize="26" textAnchor="middle" style={{ filter: "drop-shadow(0 4px 8px rgba(240,90,40,.38))" }}>✈️</text>
            </g>
            <g style={{ animation: "ph3dBounce 2s ease-in-out .8s infinite" }} transform="translate(156,48)">
                <circle cx="0" cy="0" r="15" fill="url(#trvG)" filter="url(#trvS)" />
                <circle cx="0" cy="0" r="6.5" fill="white" opacity=".92" />
                <line x1="0" y1="15" x2="0" y2="28" stroke="url(#trvG)" strokeWidth="2.5" strokeLinecap="round" />
            </g>
        </svg>
    ),

    ngo: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="ngoG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e63b2a" /><stop offset="100%" stopColor="#f05a28" /></linearGradient>
                <filter id="ngoGl"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="70" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dHeartbeat 1.5s ease-in-out infinite", transformOrigin: "120px 98px" }} filter="url(#ngoGl)">
                <path d="M120,148 C120,148 46,102 46,64 A38,38,0,0,1,120,58 A38,38,0,0,1,194,64 C194,102 120,148 120,148 Z" fill="url(#ngoG)" opacity=".92" />
            </g>
            {[{ cx: 93, cy: 93 }, { cx: 120, cy: 80 }, { cx: 147, cy: 93 }].map((p, i) => (
                <g key={i}><circle cx={p.cx} cy={p.cy} r="11" fill="white" opacity=".88" /><circle cx={p.cx} cy={p.cy - 4} r="5" fill="url(#ngoG)" opacity=".7" /></g>
            ))}
            {[{ x: 46, y: 36, t: "♥" }, { x: 194, y: 50, t: "★" }, { x: 28, y: 128, t: "✦" }, { x: 208, y: 138, t: "♥" }].map((p, i) => (
                <text key={i} x={p.x} y={p.y} fontSize={11 + i * 2} fill="#e63b2a" opacity=".48"
                    style={{ animation: `ph3dFloat ${2 + i * .5}s ease-in-out ${i * .38}s infinite` }}>{p.t}</text>
            ))}
        </svg>
    ),

    food: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="foodG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e63b2a" /><stop offset="100%" stopColor="#f05a28" /></linearGradient>
                <filter id="foodS"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#e63b2a" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 3s ease-in-out infinite" }}>
                <ellipse cx="120" cy="148" rx="80" ry="17" fill="var(--ph-border)" opacity=".45" />
                <ellipse cx="120" cy="142" rx="80" ry="17" fill="var(--ph-card)" stroke="var(--ph-border)" strokeWidth="1.5" filter="url(#foodS)" />
                <ellipse cx="120" cy="142" rx="60" ry="13" fill="var(--ph-glass)" opacity=".45" />
                <text x="98" y="150" fontSize="28" textAnchor="middle">🍕</text>
                <text x="138" y="148" fontSize="24" textAnchor="middle">🍜</text>
            </g>
            <g style={{ animation: "ph3dLid 4.5s ease-in-out infinite" }}>
                <path d="M40,140 Q40,74 120,74 Q200,74 200,140 Z" fill="var(--ph-card)" stroke="var(--ph-border)" strokeWidth="1.5" />
                <ellipse cx="120" cy="140" rx="80" ry="11" fill="var(--ph-border)" opacity=".45" />
                <circle cx="120" cy="76" r="11" fill="url(#foodG)" filter="url(#foodS)" />
            </g>
            {[76, 120, 164].map((x, i) => (
                <path key={x} d={`M${x},70 Q${x + 8},55 ${x},40 Q${x - 8},26 ${x},12`} fill="none" stroke="var(--ph-line)" strokeWidth="2" strokeLinecap="round" opacity=".32"
                    style={{ animation: `ph3dSteam 2.2s ease-in-out ${i * .38}s infinite` }} />
            ))}
        </svg>
    ),

    realestate: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="reG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3d3d9e" /><stop offset="100%" stopColor="#6b6bcf" /></linearGradient>
                <filter id="reS"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#3d3d9e" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="204" rx="88" ry="8" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 3.5s ease-in-out .4s infinite" }} transform="translate(8,76)">
                <rect x="10" y="44" width="66" height="68" rx="5" fill="var(--ph-card)" stroke="url(#reG)" strokeWidth="1.5" />
                <polygon points="0,44 43,10 86,44" fill="url(#reG)" opacity=".82" />
                <rect x="26" y="72" width="16" height="40" rx="2" fill="url(#reG)" opacity=".7" />
                <rect x="14" y="54" width="16" height="15" rx="2" fill="var(--ph-glass)" opacity=".78" />
                <rect x="56" y="54" width="16" height="15" rx="2" fill="var(--ph-glass)" opacity=".78" />
            </g>
            <g style={{ animation: "ph3dFloat 4s ease-in-out infinite" }} transform="translate(86,6)">
                <rect x="8" y="26" width="76" height="162" rx="7" fill="var(--ph-card)" stroke="url(#reG)" strokeWidth="2" filter="url(#reS)" />
                {Array.from({ length: 12 }, (_, i) => (
                    <rect key={i} x={8 + 8 + (i % 3) * 24} y={36 + Math.floor(i / 3) * 28} width="16" height="18" rx="2.5"
                        fill={i % 4 === 0 ? "url(#reG)" : "var(--ph-glass)"} opacity={i % 4 === 0 ? .9 : .5} />
                ))}
                <rect x="28" y="158" width="36" height="30" rx="2" fill="url(#reG)" opacity=".7" />
            </g>
            <g style={{ animation: "ph3dFloat 2.5s ease-in-out 1s infinite" }} transform="translate(174,56)">
                <rect x="0" y="0" width="58" height="36" rx="9" fill="url(#reG)" filter="url(#reS)" />
                <text x="29" y="14" fontSize="7" fill="rgba(255,255,255,.7)" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle">From</text>
                <text x="29" y="28" fontSize="12" fill="white" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle" fontWeight="800">₹45L</text>
            </g>
        </svg>
    ),

    crm: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="crmG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6b3fa0" /><stop offset="100%" stopColor="#3d3d9e" /></linearGradient>
                <filter id="crmS"><feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#6b3fa0" floodOpacity=".18" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 3.5s ease-in-out infinite" }}>
                <path d="M28,36 L212,36 L162,86 L162,172 L78,172 L78,86 Z" fill="url(#crmG)" opacity=".12" stroke="url(#crmG)" strokeWidth="2" />
                {[{ y: 36, w: 184, l: "Leads", n: "500" }, { y: 76, w: 124, l: "Qualified", n: "200" }, { y: 116, w: 84, l: "Proposal", n: "80" }, { y: 154, w: 60, l: "Won", n: "32" }].map((s, i) => (
                    <g key={i}><rect x={120 - s.w / 2} y={s.y} width={s.w} height="30" rx="4.5" fill="url(#crmG)" opacity={.18 + i * .12} style={{ animation: `ph3dRise .5s ease ${i * .1}s both` }} />
                        <text x="120" y={s.y + 19} fontSize="9" fill="white" textAnchor="middle" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" opacity=".9">{s.l}: {s.n}</text></g>
                ))}
            </g>
            <text x="120" y="200" fontSize="16" textAnchor="middle" fill="url(#crmG)" opacity=".65" style={{ animation: "ph3dBounce 1.5s ease-in-out infinite" }}>▼</text>
        </svg>
    ),

    marketing: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="mktG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#6b3fa0" /></linearGradient>
                <filter id="mktGl"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dFloat 3s ease-in-out infinite" }} filter="url(#mktGl)">
                <path d="M44,76 L44,138 L96,128 L96,88 Z" fill="url(#mktG)" opacity=".85" />
                <path d="M96,88 L178,46 L178,170 L96,128 Z" fill="url(#mktG)" opacity=".95" />
                <ellipse cx="178" cy="108" rx="19" ry="62" fill="url(#mktG)" opacity=".58" />
                <rect x="44" y="136" width="14" height="32" rx="3" fill="url(#mktG)" opacity=".7" />
            </g>
            {[1, 2, 3].map(i => (
                <path key={i} d={`M${197},${108 - i * 21} Q${197 + i * 15},108 ${197},${108 + i * 21}`}
                    fill="none" stroke="#f05a28" strokeWidth={3 - i * .4} opacity={.7 - i * .14} strokeLinecap="round"
                    style={{ animation: `ph3dPulse 1.6s ease ${i * .2}s infinite` }} />
            ))}
            <g style={{ animation: "ph3dBounce 2s ease-in-out .8s infinite" }} transform="translate(16,28)">
                <rect x="0" y="0" width="68" height="38" rx="11" fill="url(#mktG)" filter="url(#mktGl)" />
                <text x="34" y="15" fontSize="8" fill="rgba(255,255,255,.7)" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle">Avg ROI</text>
                <text x="34" y="30" fontSize="15" fill="white" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle" fontWeight="900">42x</text>
            </g>
        </svg>
    ),

    portfolio: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="pfG1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#ff8c5a" /></linearGradient>
                <linearGradient id="pfG2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3d3d9e" /><stop offset="100%" stopColor="#6b6bcf" /></linearGradient>
                <filter id="pfS"><feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity=".14" /></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="76" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            {[{ g: "pfG2", r: -6 }, { g: "pfG1", r: -3 }, { g: "pfG2", r: 0 }].map((c, i) => (
                <g key={i} style={{ animation: `ph3dFloat ${3 + i * .3}s ease-in-out ${i * .4}s infinite` }}>
                    <rect x={30 + i * 9} y={38 + i * 9} width="172" height="124" rx="15" fill={`url(#${c.g})`} opacity={.28 + i * .2} filter="url(#pfS)" transform={`rotate(${c.r},120,100)`} />
                </g>
            ))}
            <g style={{ animation: "ph3dFloat 3s ease-in-out .8s infinite" }}>
                <rect x="46" y="54" width="148" height="100" rx="15" fill="var(--ph-card)" stroke="var(--ph-border)" strokeWidth="1.5" filter="url(#pfS)" />
                <rect x="54" y="62" width="132" height="48" rx="9" fill="url(#pfG1)" opacity=".1" />
                <text x="120" y="92" fontSize="28" textAnchor="middle">🚀</text>
                <rect x="54" y="118" width="84" height="7" rx="3.5" fill="var(--ph-line)" opacity=".7" />
                <rect x="54" y="130" width="58" height="6" rx="3" fill="var(--ph-line)" opacity=".4" />
                <rect x="154" y="116" width="38" height="22" rx="11" fill="url(#pfG1)" opacity=".82" />
                <text x="173" y="130" fontSize="8.5" fill="white" textAnchor="middle" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700">View</text>
            </g>
        </svg>
    ),

    about: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="abtG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#3d3d9e" /></linearGradient>
                <filter id="abtGl"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="70" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dSpin 9s linear infinite", transformOrigin: "120px 108px" }} filter="url(#abtGl)" opacity=".65">
                {Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return (<circle key={i} cx={120 + Math.cos(a) * 52} cy={58 + i * 19} r="7.5" fill="url(#abtG)" opacity=".82" />) })}
            </g>
            <circle cx="120" cy="108" r="38" fill="url(#abtG)" opacity=".12" />
            <circle cx="120" cy="108" r="38" fill="none" stroke="url(#abtG)" strokeWidth="2" strokeDasharray="8 5"
                style={{ animation: "ph3dSpin 13s linear infinite", transformOrigin: "120px 108px" }} filter="url(#abtGl)" />
            <text x="120" y="120" fontSize="38" fontWeight="900" fill="url(#abtG)" fontFamily="'Plus Jakarta Sans',sans-serif" textAnchor="middle" style={{ animation: "ph3dFloat 3s ease-in-out infinite" }}>A</text>
            <g style={{ animation: "ph3dFloat 3s ease-in-out .5s infinite" }} transform="translate(168,40)">
                <rect x="0" y="0" width="55" height="34" rx="9" fill="url(#abtG)" />
                <text x="27" y="14" fontSize="7.5" fill="rgba(255,255,255,.7)" textAnchor="middle" fontFamily="'Plus Jakarta Sans',sans-serif">Est.</text>
                <text x="27" y="27" fontSize="13" fill="white" textAnchor="middle" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800">2020</text>
            </g>
        </svg>
    ),

    support: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="supG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0e9e6e" /><stop offset="100%" stopColor="#3d3d9e" /></linearGradient>
                <filter id="supGl"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="70" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dSpin 9s linear infinite", transformOrigin: "120px 104px" }} filter="url(#supGl)">
                <circle cx="120" cy="104" r="46" fill="none" stroke="url(#supG)" strokeWidth="6" strokeDasharray="20 8" opacity=".48" />
                <circle cx="120" cy="104" r="29" fill="url(#supG)" opacity=".18" />
                <circle cx="120" cy="104" r="29" fill="none" stroke="url(#supG)" strokeWidth="3" />
            </g>
            <g style={{ animation: "ph3dSpin 5.5s linear reverse infinite", transformOrigin: "174px 70px" }} opacity=".68">
                <circle cx="174" cy="70" r="25" fill="none" stroke="url(#supG)" strokeWidth="4" strokeDasharray="10 5" />
                <circle cx="174" cy="70" r="15" fill="url(#supG)" opacity=".18" />
                <circle cx="174" cy="70" r="15" fill="none" stroke="url(#supG)" strokeWidth="2" />
            </g>
            <text x="120" y="117" fontSize="34" textAnchor="middle" style={{ animation: "ph3dFloat 2.5s ease-in-out .5s infinite", filter: "drop-shadow(0 4px 8px rgba(14,158,110,.38))" }}>🔧</text>
            <g style={{ animation: "ph3dFloat 2s ease-in-out 1s infinite" }} transform="translate(24,152)">
                <rect x="0" y="0" width="76" height="30" rx="15" fill="url(#supG)" filter="url(#supGl)" />
                <circle cx="18" cy="15" r="6" fill="#fff" opacity=".9" /><circle cx="18" cy="15" r="3.5" fill="#0e9e6e" />
                <text x="42" y="19" fontSize="9" fill="white" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700">Online 24/7</text>
            </g>
        </svg>
    ),

    default: () => (
        <svg viewBox="0 0 240 210" className="ph-3d-svg">
            <defs>
                <linearGradient id="defG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f05a28" /><stop offset="100%" stopColor="#3d3d9e" /></linearGradient>
                <filter id="defGl"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <ellipse cx="120" cy="202" rx="70" ry="7" fill="var(--ph-shadow)" opacity=".5" />
            <g style={{ animation: "ph3dSpin 18s linear infinite", transformOrigin: "120px 104px" }} filter="url(#defGl)" opacity=".38">
                <circle cx="120" cy="104" r="72" fill="none" stroke="url(#defG)" strokeWidth="1" strokeDasharray="6 4" />
                <circle cx="120" cy="104" r="52" fill="none" stroke="url(#defG)" strokeWidth="1.5" strokeDasharray="4 7" />
            </g>
            <g style={{ animation: "ph3dFloat 3s ease-in-out infinite" }}>
                <circle cx="120" cy="104" r="44" fill="url(#defG)" opacity=".09" filter="url(#defGl)" />
                <text x="120" y="118" fontSize="46" textAnchor="middle" fill="url(#defG)" opacity=".55">⬡</text>
            </g>
            <circle cx="120" cy="104" r="44" fill="none" stroke="url(#defG)" strokeWidth="2" opacity=".45"
                style={{ animation: "ph3dSpin 9s linear infinite", transformOrigin: "120px 104px" }} />
        </svg>
    ),
}

/* ─────────────────────────────────────────────────
   TITLE RENDERER — handles array of {text, gradient} objects
───────────────────────────────────────────────── */
function renderTitle(title) {
    if (!title) return null;
    
    if (Array.isArray(title)) {
        return title.map((part, i) => {
            if (part.gradient) {
                return <span key={i} className="ph-gradient">{part.text}</span>;
            }
            return <span key={i}>{part.text}</span>;
        });
    }
    
    return title;
}

/* ─────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────── */
export default function PageHero({ breadcrumbs = [], pill, pillIcon, title, subtitle, tag }) {
    const visual = detectVisual(pill)

    return (
        <section className="ph-hero">
            <div className="ph-bg" aria-hidden="true">
                <div className="ph-orb ph-orb-1" /><div className="ph-orb ph-orb-2" />
                <div className="ph-orb ph-orb-3" /><div className="ph-grid" />
                <div className="ph-slash ph-slash-1" /><div className="ph-slash ph-slash-2" />
            </div>

            <div className="ph-layout">
                {/* ── LEFT ── */}
                <div className="ph-left">
                    <nav className="ph-breadcrumb" aria-label="Breadcrumb">
                        <Link to="/" className="ph-bc-item ph-bc-home" aria-label="Home">
                            <FiHome /><span>Home</span>
                        </Link>
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="ph-bc-group">
                                <FiChevronRight className="ph-bc-sep" />
                                {crumb.href && i < breadcrumbs.length - 1
                                    ? <Link to={crumb.href} className="ph-bc-item">{crumb.label}</Link>
                                    : <span className="ph-bc-item ph-bc-active">{crumb.label}</span>
                                }
                            </span>
                        ))}
                    </nav>

                    <div className="ph-content">
                        {pill && (
                            <div className="ph-pill">
                                {pillIcon && <span className="ph-pill-icon">{pillIcon}</span>}
                                {pill}
                            </div>
                        )}
                        <h1 className="ph-title">{renderTitle(title)}</h1>
                        {subtitle && <p className="ph-subtitle">{subtitle}</p>}
                        <div className="ph-bottom-row">
                            {tag && <span className="ph-tag">{tag}</span>}
                            <div className="ph-divider-line" />
                        </div>
                    </div>
                </div>

                {/* ── RIGHT ── */}
                <div className="ph-right">
                    <div className="ph-3d-wrap">
                        <div className="ph-orbiting-container">
                            <div className="ph-orbit-sun">
                                <FiCode />
                            </div>
                            <div className="ph-orbit-path ph-orbit-path-1"></div>
                            <div className="ph-orbit-path ph-orbit-path-2"></div>
                            <div className="ph-orbit-path ph-orbit-path-3"></div>
                            <div className="ph-orbit-path ph-orbit-path-4"></div>
                            <div className="ph-orbit-path ph-orbit-path-5"></div>
                            <div className="ph-orbit-1">
                                <div className="ph-orbiting-icon"><FaReact /></div>
                            </div>
                            <div className="ph-orbit-2">
                                <div className="ph-orbiting-icon"><FaNodeJs /></div>
                            </div>
                            <div className="ph-orbit-3">
                                <div className="ph-orbiting-icon"><FaPython /></div>
                            </div>
                            <div className="ph-orbit-4">
                                <div className="ph-orbiting-icon"><FaAws /></div>
                            </div>
                            <div className="ph-orbit-5">
                                <div className="ph-orbiting-icon"><FaDocker /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}