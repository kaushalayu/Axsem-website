import { useEffect, lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import PageLoader from './Components/PageLoader'
import PageTransitionLoader from './Components/PageTransitionLoader'
import Navbar from './Components/Navbar'
import TopHeader from './Components/TopHeader'
import ErrorBoundary from './Components/ErrorBoundary'
import FloatingButtons from './Components/FloatingButtons'
import BackToTop from './Components/BackToTop'
import Footer from './Components/Footer'
import InquiryModal from './Components/InquiryModal'
import { ToastProvider } from './Components/Toast'
import { CompanyProvider } from './contexts/CompanyContext'
import { NavbarProvider } from './contexts/NavbarContext'
import { FooterProvider } from './contexts/FooterContext'
import { api } from './services/api'
import './Styles/Toast.css'
import MarketingSection from './Pages/Marketingsection'
import ProductShowcasePage from './Pages/ProductShow'
import Testimonials from './Pages/Testimonials'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})



/* ── Lazy loaded pages & components ── */
const Home = lazy(() => import("./Pages/Home"))
const Team = lazy(() => import("./Pages/Team"))
const CompanyOverview = lazy(() => import("./Pages/CompanyOverview"))
const Careers = lazy(() => import("./Pages/Careers"))
const Mission = lazy(() => import("./Pages/Mission"))
const Blog = lazy(() => import("./Pages/Blog"))
const Contact = lazy(() => import("./Pages/Contact"))
const BlogDetailPage = lazy(() => import("./Pages/BlogDetailPage"))
const ApplyJobPage = lazy(() => import("./Pages/ApplyJobPage"))
const Admin = lazy(() => import("./Pages/Admin/Admin"))
const AdminLogin = lazy(() => import("./Pages/Admin/AdminLogin"))
const ProjectDetailPage = lazy(() => import("./Pages/ProjectDetailPage"))
const ProjectsPage = lazy(() => import("./Pages/ProjectsPage"))
const WebDevelopment = lazy(() => import("./Pages/WebDevelopment"))
const MobileDevelopment = lazy(() => import("./Pages/MobileDevelopment"))
const SoftwareDevelopment = lazy(() => import("./Pages/SoftwareDevelopment"))
const UiDevelopment = lazy(() => import("./Pages/UiDevelopment"))
const SeoPage = lazy(() => import("./Pages/SeoPage"))
const Graphic = lazy(() => import("./Pages/Graphic"))
const DigitalMarketing = lazy(() => import("./Pages/DigitalMarketing"))
const ItService = lazy(() => import("./Pages/ItService"))
const OurClient = lazy(() => import("./Pages/OurClient"))
const EcommercePage = lazy(() => import("./Pages/EcommercePage"))
const CrmPage = lazy(() => import("./Pages/CrmPage"))
const LmsPage = lazy(() => import("./Pages/LmsPage"))
const RealPage = lazy(() => import("./Pages/RealPage"))
const NgoPage = lazy(() => import("./Pages/NgoPage"))
const HrPayroll = lazy(() => import("./Pages/HrPayroll"))
const SchoolPage = lazy(() => import("./Pages/SchoolPage"))
const Tour = lazy(() => import("./Pages/Tour"))
const AiPage = lazy(() => import("./Pages/AiPage"))
const Privacy = lazy(() => import("./Pages/Privacy"))
const Terms = lazy(() => import("./Pages/Terms"))
const Sitemap = lazy(() => import("./Pages/Sitemap"))
const Development = lazy(() => import("./Pages/Development"))
const StanderedWebsite = lazy(() => import("./Pages/StanderdWebsite"))
const DynamicWebsite = lazy(() => import("./Pages/DynamicPage"))
const BasicSoftware = lazy(() => import("./Pages/BasicSoftware"))
const AdvanceSco = lazy(() => import("./Pages/AdvanceSco"))
const LogoDesign = lazy(() => import("./Pages/LogoDesign"))
const PremiumSoftware = lazy(() => import("./Pages/PremiumSoftware"))
const BasicSco = lazy(() => import("./Pages/BasicSco"))
const SocialMedia = lazy(() => import("./Pages/SocialMedia"))
const Brand = lazy(() => import("./Pages/Brand"))
const PrintDesign = lazy(() => import("./Pages/PrintDesign"))
const JournayPage = lazy(() => import("./Pages/JournayPage"))
const Ngo = lazy(() => import("./Pages/Ngo"))
const Attand = lazy(() => import("./Pages/Attand"))
const Ofline = lazy(() => import("./Pages/Ofline"))
const PartnerRegistration = lazy(() => import("./Pages/PartnerRegistration"))
const PartnerLogin = lazy(() => import("./Pages/PartnerLogin"))
const PartnerForgot = lazy(() => import("./Pages/PartnerForgot"))
const PartnerRoutes = lazy(() => import("./Pages/PartnerRoutes"))
const ClientRegistration = lazy(() => import("./Pages/ClientRegistration"))
const SupportTicket = lazy(() => import("./Pages/SupportTicket"))
const EmployeeVerification = lazy(() => import("./Pages/EmployeeVerification"))
const FAQPage = lazy(() => import("./Pages/FAQPage"))
// const MarketingSection = lazy(() => import("./Pages/Marketingsection"))


/* Temp generic page — lazy loaded */
const TempPage = lazy(() =>
  Promise.resolve({
    default: ({ title }) => (
      <div style={{ padding: "120px 40px", fontSize: "24px" }}>{title}</div>
    ),
  })
)

/* ── Fallback spinner shown while lazy chunks load ── */
function SectionFallback() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        border: "3px solid rgba(240,90,40,0.2)",
        borderTop: "3px solid #f05a28",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <ToastProvider>
            <CompanyProvider>
              <NavbarProvider>
                <FooterProvider>
                  <AppContent />
                </FooterProvider>
              </NavbarProvider>
            </CompanyProvider>
          </ToastProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")
  const isLoginRoute = location.pathname === "/admin/login"
  const isNewLoginRoute = location.pathname === "/login"
  const isLoginPage = isLoginRoute || isNewLoginRoute
  const isPartnerDashboard = location.pathname.startsWith("/partner/") && 
    !['/partner/login', '/partner/register', '/partner/forgot-password'].includes(location.pathname)
  const isHomePage = location.pathname === "/"
  const [showLoader, setShowLoader] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [pageTransition, setPageTransition] = useState(false)
  const [prevPath, setPrevPath] = useState(location.pathname)

  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getAuthToken()
      if (token) {
        const result = await api.verifyToken()
        setIsAuthenticated(result.success)
      } else {
        setIsAuthenticated(false)
      }
    }
    if (isAdminRoute && !isLoginPage) {
      checkAuth()
    } else if (isLoginPage) {
      setIsAuthenticated('login')
    }
  }, [isAdminRoute, isLoginPage, location.pathname])

  useEffect(() => {
    if (!isAdminRoute && !isLoginPage) {
      if (prevPath !== location.pathname) {
        setPageTransition(true)
        const timer = setTimeout(() => {
          setPageTransition(false)
          setPrevPath(location.pathname)
        }, 300)
        return () => clearTimeout(timer)
      }
    }
  }, [location.pathname, isAdminRoute, isLoginPage, prevPath])

  useEffect(() => {
    if (!isAdminRoute) {
      setShowLoader(true)
      if (isHomePage) {
        setShowLoader(false)
      } else {
        setShowLoader(false)
      }
    }
  }, [location.pathname, isAdminRoute, isHomePage])

  if (isLoginPage && isAuthenticated === true) {
    return <Navigate to="/admin" replace />
  }

  if (isAdminRoute && !isLoginPage && isAuthenticated === true) {
    return (
      <>
        <Suspense fallback={<SectionFallback />}>
          <Admin />
        </Suspense>
      </>
    )
  }

  if (isAdminRoute && !isLoginPage && (isAuthenticated === false || isAuthenticated === null)) {
    return <Navigate to="/login" replace />
  }

  if (isLoginPage && (isAuthenticated === 'login' || isAuthenticated === false)) {
    return (
      <div className="admin-login-wrapper">
        <Suspense fallback={<SectionFallback />}>
          <AdminLogin />
        </Suspense>
      </div>
    )
  }

  return (
    <>
      {!isAdminRoute && !isLoginPage && !isPartnerDashboard && <PageTransitionLoader isLoading={pageTransition} />}
      {!isPartnerDashboard && <TopHeader />}
      {!isPartnerDashboard && <Navbar />}
      {!isAdminRoute && isHomePage && <InquiryModal />}

      <Suspense fallback={<SectionFallback />}>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* ABOUT */}
          <Route path="/about/company" element={<CompanyOverview />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/careers" element={<Careers />} />
          <Route path="/about/careers/apply" element={<ApplyJobPage />} />
          <Route path="/about/journay" element={<JournayPage />} />

          {/* ADMIN */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Admin />} />

          {/* SERVICES */}
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/mobile-apps" element={<MobileDevelopment />} />
          <Route path="/services/ui-ux" element={<UiDevelopment />} />
          <Route path="/services/software-development" element={<SoftwareDevelopment />} />
          <Route path="/services/graphic-design" element={<Graphic />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/it-maintenance" element={<ItService />} />
          <Route path="/services/seo" element={<SeoPage />} />

          {/* Our Client */}
          <Route path="/portfolio/clients" element={<OurClient />} />
          <Route path="/product" element={<ProductShowcasePage />} />


          {/* PRODUCTS */}
          <Route path="/products/crm" element={<CrmPage />} />
          <Route path="/products/lms" element={<LmsPage />} />
          <Route path="/products/ecommerce" element={<EcommercePage />} />
          <Route path="/products/real-estate" element={<RealPage />} />
          <Route path="/products/ngo" element={<NgoPage />} />
          <Route path="/products/hr-payroll" element={<HrPayroll />} />
          <Route path="/products/school-management" element={<SchoolPage />} />
          <Route path="/products/tour-booking" element={<Tour />} />
          <Route path="/products/ai-solutions" element={<AiPage />} />
          <Route path="/products/ngo-management" element={<Ngo />} />
          <Route path="/products/attendance" element={<Attand />} />
          <Route path="/products/offline" element={<Ofline />} />

          {/* PORTFOLIO */}
          <Route path="/portfolio" element={<ProjectsPage />} />
          <Route path="/portfolio/project" element={<ProjectsPage />} />
          <Route path="/portfolio/project/:id" element={<ProjectDetailPage />} />

          {/* PACKAGES */}
          <Route path="/packages/website-basic" element={<Development />} />
          <Route path="/packages/digital-basic" element={<BasicSco />} />
          <Route path="/packages/digital-advanced" element={<AdvanceSco />} />
          <Route path="/packages/website-standard" element={<StanderedWebsite />} />
          <Route path="/packages/website-dynamic" element={<DynamicWebsite />} />
          <Route path="/packages/digital-social" element={<SocialMedia />} />
          <Route path="/packages/graphic-logo" element={<LogoDesign />} />
          <Route path="/packages/basic-software" element={<BasicSoftware />} />
          <Route path="/packages/premium-software" element={<PremiumSoftware />} />
          <Route path="/packages/graphic-design" element={<Graphic />} />
          <Route path="/packages/graphic-design/branding" element={<Brand />} />
          <Route path="/packages/graphic-design/print" element={<PrintDesign />} />
          <Route path="/packages/branding" element={<Brand />} />


          {/* BLOG */}
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog-detail/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* LEGAL */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* Marketing */}
          <Route path="/marketing" element={<MarketingSection />} />

          {/* Partner Registration */}
          <Route path="/partner/register" element={<PartnerRegistration />} />

          {/* Partner Portal */}
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/partner/forgot-password" element={<PartnerForgot />} />
          <Route path="/partner/*" element={<PartnerRoutes />} />

          {/* Growth Hub Pages */}
          <Route path="/client/register" element={<ClientRegistration />} />
          <Route path="/support/ticket" element={<SupportTicket />} />
          <Route path="/verify/employee" element={<EmployeeVerification />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/testimonials" element={<Testimonials />} />

          {/* 404 */}
          <Route path="*" element={<TempPage title="404 - Page Not Found" />} />
        </Routes>
      </Suspense>

      {!isPartnerDashboard && <FloatingButtons />}
      {!isPartnerDashboard && <BackToTop />}
      {!isPartnerDashboard && <Footer />}
    </>
  )
}

export default App
