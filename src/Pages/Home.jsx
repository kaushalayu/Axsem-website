import { lazy, Suspense, useEffect } from "react"
import Hero from "../Components/Hero"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
    SkeletonServiceGrid, 
    SkeletonStatsGrid, 
    SkeletonGrid,
    SkeletonPricingGrid,
    SkeletonTeamGrid,
    SkeletonBlogGrid
} from "../Components/Skeleton"

gsap.registerPlugin(ScrollTrigger)

const AboutSection = lazy(() => import("../Components/AboutSection"))
const Servicessection = lazy(() => import("../Components/Servicessection"))
const RecentProjects = lazy(() => import("../Components/Recentprojects"))
const Clientreviews = lazy(() => import("../Components/Clientreviews"))
const FAQ = lazy(() => import("../Components/FAQ"))
const BlogSection = lazy(() => import("../Components/BlogSection"))
const TeamSection = lazy(() => import("../Components/TeamSection"))
const ContactSection = lazy(() => import("../Components/ContactSection"))
const ProductSection = lazy(() => import("../Components/ProductSection"))
const WhyChoose = lazy(() => import("../Components/WhyChoose"))
const Pricing = lazy(() => import("../Components/Pricing"))
const Portfolio = lazy(() => import("../Components/Portfolio"))

function SectionFallback({ type = 'default' }) {
    const skeletons = {
        hero: (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
            }}>
                <div style={{ width: '100%', maxWidth: '1200px', padding: '40px 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f05a28 0%, #e04a18 100%)',
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                        <div style={{
                            width: '200px',
                            height: '48px',
                            borderRadius: '8px',
                            background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s ease-in-out infinite'
                        }} />
                        <div style={{
                            width: '400px',
                            maxWidth: '90%',
                            height: '24px',
                            borderRadius: '6px',
                            background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s ease-in-out infinite'
                        }} />
                    </div>
                </div>
                <style>{`
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.1); opacity: 0.8; }
                    }
                    @keyframes shimmer {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                `}</style>
            </div>
        ),
        services: <SkeletonServiceGrid count={6} />,
        stats: <SkeletonStatsGrid count={4} />,
        cards: <SkeletonGrid count={3} cardHeight={250} />,
        pricing: <SkeletonPricingGrid count={3} />,
        team: <SkeletonTeamGrid count={4} />,
        blog: <SkeletonBlogGrid count={3} />,
        default: (
            <div style={{
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{
                    width: "32px",
                    height: "32px",
                    border: "3px solid rgba(240,90,40,0.15)",
                    borderTop: "3px solid #f05a28",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                }} />
            </div>
        )
    }

    return (
        <div style={{ padding: '40px 0' }}>
            {skeletons[type] || skeletons.default}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

export default function Home() {
    useEffect(() => {
        const isDesktop = window.innerWidth > 768
        
        if (isDesktop) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                wheelMultiplier: 1,
                smoothTouch: false,
            })

            function raf(time) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }

            requestAnimationFrame(raf)

            return () => {
                lenis.destroy()
            }
        }
    }, [])

    return (
        <>
            {/* Hero is above the fold — load eagerly */}
            <Hero />
            <Suspense fallback={<SectionFallback type="stats" />}>
                <AboutSection />
            </Suspense>
            <Suspense fallback={<SectionFallback type="services" />}>
                <Servicessection />
            </Suspense>
            <Suspense fallback={<SectionFallback type="cards" />}>
                <ProductSection />
            </Suspense>
            <Suspense fallback={<SectionFallback type="pricing" />}>
                <Pricing />
            </Suspense>
            <Suspense fallback={<SectionFallback type="cards" />}>
                <Portfolio />
            </Suspense>
            <Suspense fallback={<SectionFallback type="team" />}>
                <TeamSection />
            </Suspense>
            <Suspense fallback={<SectionFallback type="cards" />}>
                <RecentProjects />
            </Suspense>
            <Suspense fallback={<SectionFallback type="default" />}>
                <Clientreviews />
            </Suspense>
            <Suspense fallback={<SectionFallback type="default" />}>
                <FAQ />
            </Suspense>
            <Suspense fallback={<SectionFallback type="stats" />}>
                <WhyChoose />
            </Suspense>
            <Suspense fallback={<SectionFallback type="blog" />}>
                <BlogSection />
            </Suspense>
            <Suspense fallback={<SectionFallback type="default" />}>
                <ContactSection />
            </Suspense>
        </>
    )
}
