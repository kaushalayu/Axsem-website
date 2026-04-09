import { lazy, Suspense, useEffect } from "react"
import Hero from "../Components/Hero"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* Hero is loaded eagerly (above the fold — must show instantly).
   All sections below the fold are lazy loaded. */
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
const TechStack = lazy(() => import("../Components/TechStack"))
const Pricing = lazy(() => import("../Components/Pricing"))
const Portfolio = lazy(() => import("../Components/Portfolio"))


function SectionFallback() {
    return (
        <div style={{
            minHeight: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{
                width: "36px",
                height: "36px",
                border: "3px solid rgba(240,90,40,0.15)",
                borderTop: "3px solid #f05a28",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
            }} />
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
            <Suspense fallback={<SectionFallback />}>
                <AboutSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <Servicessection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <ProductSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <TechStack />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <Pricing />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <Portfolio />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <TeamSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <RecentProjects />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <Clientreviews />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <FAQ />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <WhyChoose />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <BlogSection />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
                <ContactSection />
            </Suspense>


        </>
    )
}
