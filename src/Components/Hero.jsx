import React, { useEffect, useRef, useState } from "react"
import { FiArrowRight, FiPlay, FiCode, FiSmartphone, FiCloud, FiLayers } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { gsap } from "gsap"
import "../Styles/Hero.css"

function useCounter(target, duration = 1800, started = false) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!started) return
        let startTime = null
        const step = (ts) => {
            if (!startTime) startTime = ts
            const p = Math.min((ts - startTime) / duration, 1)
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
            if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [target, duration, started])
    return count
}

function StatCard({ number, suffix, label, icon, started }) {
    const count = useCounter(number, 1800, started)
    return (
        <div className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div className="stat-number">
                {count}<span className="stat-suffix">{suffix}</span>
            </div>
            <div className="stat-label">{label}</div>
        </div>
    )
}

function ParticleGrid() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        let animId

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener("resize", resize)

        const COLS = 16, ROWS = 11
        const dots = Array.from({ length: COLS * ROWS }, (_, idx) => ({
            baseX: ((idx % COLS) / (COLS - 1)) * canvas.width,
            baseY: (Math.floor(idx / COLS) / (ROWS - 1)) * canvas.height,
            x: 0, y: 0,
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.5,
            r: 0.8 + Math.random() * 1.2,
        }))

        let t = 0
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            t += 0.007

            dots.forEach(d => {
                d.x = d.baseX + Math.sin(t * d.speed + d.phase) * 7
                d.y = d.baseY + Math.cos(t * d.speed + d.phase * 1.3) * 5
            })

            const maxD = (canvas.width / COLS) * 1.9
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y)
                    if (dist < maxD) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(240,90,40,${(1 - dist / maxD) * 0.12})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(dots[i].x, dots[i].y)
                        ctx.lineTo(dots[j].x, dots[j].y)
                        ctx.stroke()
                    }
                }
                ctx.beginPath()
                ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(240,90,40,0.3)"
                ctx.fill()
            }
            animId = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return <canvas ref={canvasRef} className="particle-canvas" />
}

export default function Hero() {
    const navigate = useNavigate()
    const cardsRef = useRef([])
    const statsRef = useRef(null)
    const [statsStarted, setStatsStarted] = useState(false)
    const heroRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
            tl.from(".hero-badge", { y: 40, opacity: 0, duration: 0.7 })
                .from(".hero-title", { y: 60, opacity: 0, duration: 0.9 }, "-=0.4")
                .from(".hero-description", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
                .from(".hero-ctas", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
                .from(".tech-pills", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
                .from(".visual-card", { x: 60, opacity: 0, duration: 1.0 }, "-=0.8")
                .from(cardsRef.current.filter(Boolean), {
                    y: 50, opacity: 0, stagger: 0.15, duration: 0.8,
                }, "-=0.7")
        }, heroRef)

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setStatsStarted(true) },
            { threshold: 0.3 }
        )
        if (statsRef.current) obs.observe(statsRef.current)
        return () => obs.disconnect()
    }, [])

    const handleMouseMove = (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 45
        const y = (window.innerHeight / 2 - e.clientY) / 45
        cardsRef.current.forEach((card, i) => {
            if (card) gsap.to(card, { x: x * (i + 1) * 0.5, y: y * (i + 1) * 0.5, duration: 0.6 })
        })
    }

    return (
        <section className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
            <div className="hero-bg">
                <ParticleGrid />
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="hero-grid-overlay" />
            </div>

            <div className="hero-wrapper">
                <div className="hero-grid">
                    <div className="hero-left">
                        <div className="hero-badge">
                            <span className="badge-dot" />
                            🚀 Trusted Software Partner Since 2020
                        </div>

                        <h1 className="hero-title">
                            We Build
                            <span className="gradient-text"> Next-Gen<br />Digital </span>
                            Products
                        </h1>

                        <p className="hero-description">
                            We create scalable SaaS platforms, enterprise software and
                            powerful digital experiences that accelerate your business growth.
                        </p>

                        <div className="hero-ctas">
                            <button className="btn-primary" onClick={() => navigate('/contact')}>
                                Get Started <FiArrowRight className="btn-arrow" />
                            </button>
                            <button className="btn-secondary" onClick={() => navigate('/portfolio')}>
                                <span className="play-ring"><FiPlay /></span>
                                View Portfolio
                            </button>
                        </div>

                        <div className="tech-pills">
                            {["React", "Node.js", "Flutter", "AWS", "MongoDB", "Python"].map((t) => (
                                <span key={t} className="tech-pill">{t}</span>
                            ))}
                        </div>
                    </div>

                    <div className="hero-right">
                        <div className="visual-wrap">
                            <div className="visual-glow" />

                            <div className="visual-card">
                                <div className="card-topbar">
                                    <span className="dot dot-red" />
                                    <span className="dot dot-yellow" />
                                    <span className="dot dot-green" />
                                    <span className="card-fname">axsem-project.jsx</span>
                                </div>

                                <div className="card-body">
                                    <div className="cl">
                                        <span className="c-purple">import</span>
                                        <span className="c-white"> &#123; Solution &#125; </span>
                                        <span className="c-purple">from</span>
                                        <span className="c-orange"> 'axsem'</span>
                                    </div>
                                    <div className="cl mt">
                                        <span className="c-blue">const</span>
                                        <span className="c-white"> project </span>
                                        <span className="c-orange">= new</span>
                                        <span className="c-white"> Solution(&#123;</span>
                                    </div>
                                    <div className="cl ind">
                                        <span className="c-green">vision</span>
                                        <span className="c-white">: </span>
                                        <span className="c-orange">'ambitious'</span>
                                        <span className="c-white">,</span>
                                    </div>
                                    <div className="cl ind">
                                        <span className="c-green">quality</span>
                                        <span className="c-white">: </span>
                                        <span className="c-orange">'premium'</span>
                                        <span className="c-white">,</span>
                                    </div>
                                    <div className="cl ind">
                                        <span className="c-green">delivery</span>
                                        <span className="c-white">: </span>
                                        <span className="c-orange">'on-time'</span>
                                        <span className="c-white">,</span>
                                    </div>
                                    <div className="cl">
                                        <span className="c-white">&#125;)</span>
                                    </div>
                                    <div className="cl mt">
                                        <span className="c-purple">await</span>
                                        <span className="c-white"> project</span>
                                        <span className="c-orange">.launch()</span>
                                        <span className="cursor-blink">|</span>
                                    </div>
                                </div>

                                <div className="card-status">
                                    <span className="status-dot" />
                                    Build successful — 0 errors, 0 warnings
                                </div>
                            </div>

                            <div className="fc fc-1" ref={el => cardsRef.current[0] = el}>
                                <FiCode className="fc-icon" />
                                <div>
                                    <div className="fc-title">Web Dev</div>
                                    <div className="fc-sub">React · Node · Next</div>
                                </div>
                            </div>

                            <div className="fc fc-2" ref={el => cardsRef.current[1] = el}>
                                <FiSmartphone className="fc-icon" />
                                <div>
                                    <div className="fc-title">Mobile</div>
                                    <div className="fc-sub">Flutter · RN</div>
                                </div>
                            </div>

                            <div className="fc fc-3" ref={el => cardsRef.current[2] = el}>
                                <FiCloud className="fc-icon" />
                                <div>
                                    <div className="fc-title">Cloud</div>
                                    <div className="fc-sub">AWS · Docker</div>
                                </div>
                            </div>

                            <div className="fc fc-4" ref={el => cardsRef.current[3] = el}>
                                <FiLayers className="fc-icon" />
                                <div>
                                    <div className="fc-title">UI/UX</div>
                                    <div className="fc-sub">Figma · Framer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stats-row" ref={statsRef}>
                    <StatCard number={200} suffix="+" label="Projects Delivered" icon={<FiCode />} started={statsStarted} />
                    <div className="stat-sep" />
                    <StatCard number={100} suffix="+" label="Happy Clients" icon={<FiSmartphone />} started={statsStarted} />
                    <div className="stat-sep" />
                    <StatCard number={5} suffix="+" label="Years Experience" icon={<FiLayers />} started={statsStarted} />
                    <div className="stat-sep" />
                    <StatCard number={25} suffix="+" label="Expert Team" icon={<FiCloud />} started={statsStarted} />
                </div>
            </div>

            <div className="scroll-ind">
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    )
}
