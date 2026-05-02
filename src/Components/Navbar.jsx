import { useState, useEffect, useRef, useMemo } from "react"
import { NavLink } from "react-router-dom"
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiMoon,
  FiSun,
  FiHome,
  FiInfo,
  FiSettings,
  FiPackage,
  FiFolder,
  FiCpu,
  FiFileText,
  FiBriefcase,
  FiMail,
  FiUsers,
  FiCode,
  FiSmartphone,
  FiLayout,
  FiTrendingUp,
  FiGlobe,
  FiShield,
  FiShoppingCart,
  FiBook,
  FiTarget,
  FiDollarSign,
  FiSmartphone as FiAttend,
  FiCloud,
  FiTool,
  FiSearch,
} from "react-icons/fi"

import logo from "../assets/Axsem.jpg"
import { navMenu } from "../data/navData"
import { useCompany } from "../contexts/CompanyContext"
import { useNavbar } from "../contexts/NavbarContext"
import "../Styles/Navbar.css"

const mobileIcons = {
  Home: <FiHome />,
  About: <FiInfo />,
  Services: <FiSettings />,
  Products: <FiPackage />,
  Portfolio: <FiFolder />,
  Technologies: <FiCpu />,
  Blog: <FiFileText />,
  Careers: <FiBriefcase />,
  Contact: <FiMail />,
  "Partner With Us": <FiUsers />,
}

const iconMap = {
  FiHome: <FiHome />,
  FiInfo: <FiInfo />,
  FiSettings: <FiSettings />,
  FiPackage: <FiPackage />,
  FiFolder: <FiFolder />,
  FiCpu: <FiCpu />,
  FiFileText: <FiFileText />,
  FiBriefcase: <FiBriefcase />,
  FiMail: <FiMail />,
  FiUsers: <FiUsers />,
  FiCode: <FiCode />,
  FiSmartphone: <FiSmartphone />,
  FiLayout: <FiLayout />,
  FiTrendingUp: <FiTrendingUp />,
  FiGlobe: <FiGlobe />,
  FiShield: <FiShield />,
  FiShoppingCart: <FiShoppingCart />,
  FiBook: <FiBook />,
  FiTarget: <FiTarget />,
  FiDollarSign: <FiDollarSign />,
  FiCloud: <FiCloud />,
  FiTool: <FiTool />,
  FiSearch: <FiSearch />,
}

export default function Navbar() {
  const { companyInfo } = useCompany()
  const { navLinks, loading } = useNavbar()
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [activePackage, setActivePackage] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const menuHideTimeout = useRef(null)
  const [closingMenu, setClosingMenu] = useState(null)

  // Transform API data to nav format
  const dynamicNavMenu = useMemo(() => {
    if (!navLinks || navLinks.length === 0) return null

    const categories = {}
    navLinks.forEach(link => {
      if (!categories[link.category]) {
        categories[link.category] = []
      }
      categories[link.category].push(link)
    })

    // Convert to navMenu format
    const menu = []

    // Home - always first
    const homeLink = navLinks.find(l => l.url === "/" || l.title === "Home")
    if (homeLink) {
      menu.push({ name: homeLink.title, path: homeLink.url })
    }

    // Group other items by category
    Object.entries(categories).forEach(([category, links]) => {
      if (category === "Home" || links[0]?.url === "/") return

      const sortedLinks = links.sort((a, b) => a.order - b.order)

      // Check if any link has parent (sub-item)
      const parentLinks = sortedLinks.filter(l => !l.parentId)
      const hasChildren = parentLinks.some(p =>
        sortedLinks.some(l => l.parentId === p._id)
      )

      if (hasChildren) {
        // Create megaNested structure
        const groups = []
        parentLinks.forEach(parent => {
          const children = sortedLinks.filter(l => l.parentId === parent._id)
          if (children.length > 0) {
            groups.push({
              title: parent.title,
              items: children.map(c => ({ name: c.title, path: c.url }))
            })
          }
        })

        if (groups.length > 0) {
          menu.push({
            name: category,
            megaNested: groups
          })
        }
      } else if (parentLinks.length > 0) {
        // Simple mega dropdown
        menu.push({
          name: category,
          mega: parentLinks.map(p => ({ name: p.title, path: p.url }))
        })
      }
    })

    // Add static routes that might not be in DB
    const staticRoutes = ['/blogs', '/contact', '/partner/register']
    const hasStaticRoutes = navLinks.some(l => staticRoutes.includes(l.url))

    if (!hasStaticRoutes) {
      menu.push({ name: "Blogs", path: "/blogs" })
      menu.push({ name: "Contact Us", path: "/contact" })
    }

    return menu
  }, [navLinks])

  // Use dynamic menu if available, otherwise fallback to static
  const activeMenuData = dynamicNavMenu || navMenu

  /* SCROLL EFFECT */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* DARK MODE */
  useEffect(() => {
    document.body.classList.toggle("dark", dark)
  }, [dark])

  /* LOCK BODY SCROLL WHEN MOBILE MENU OPEN */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  /* CLEANUP TIMEOUT ON UNMOUNT */
  useEffect(() => {
    return () => { if (menuHideTimeout.current) clearTimeout(menuHideTimeout.current) }
  }, [])

  const closeMenu = () => {
    setOpen(false)
    setActiveMenu(null)
    setActivePackage(null)
  }

  const handleMenuClose = (menuName) => {
    setClosingMenu(menuName)
    setTimeout(() => {
      setActiveMenu(null)
      setActivePackage(null)
      setClosingMenu(null)
    }, 250)
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className={`navbar ${scrolled ? "small" : "large"}`}>
        <div className="navbar-inner">

          {/* LOGO */}
          <img src={logo} alt="Axsem" className="nav-logo" />

          {/* DESKTOP MENU */}
          <div className="desktop-menu">
            {activeMenuData.map((item, index) => {
              const hasDropdown = item.mega || item.megaNested

              return (
                <div
                  key={`${item.name}-${index}`}
                  className="nav-item"
                  onMouseEnter={() => {
                    if (menuHideTimeout.current) {
                      clearTimeout(menuHideTimeout.current)
                      menuHideTimeout.current = null
                    }
                    hasDropdown && setActiveMenu(item.name)
                  }}
                  onMouseLeave={(e) => {
                    if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) return
                    handleMenuClose(item.name)
                  }}
                >
                  {item.path ? (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active-link" : ""} ${["Home", "Blogs", "Contact Us"].includes(item.name) ? "has-dot" : ""}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <span className="nav-link">
                      {item.name}
                      <FiChevronDown
                        className={`nav-arrow ${activeMenu === item.name ? "open" : ""}`}
                      />
                    </span>
                  )}

                  {activeMenu === item.name && item.mega && (
                    <div
                      className={`mega-menu vertical left-align ${closingMenu === item.name ? "hide" : ""}`}
                      onMouseEnter={() => {
                        if (menuHideTimeout.current) {
                          clearTimeout(menuHideTimeout.current)
                          menuHideTimeout.current = null
                        }
                        setClosingMenu(null)
                      }}
                      onMouseLeave={() => {
                        handleMenuClose(item.name)
                      }}
                    >
                      {item.mega.map((m, i) => (
                        <NavLink key={`${m.name}-${i}`} to={m.path} className="mega-item">
                          {m.name}
                        </NavLink>
                      ))}
                    </div>
                  )}

                  {activeMenu === item.name && item.megaNested && item.name === "Packages" && (
                    <div
                      className={`mega-menu vertical package-root left-align package-mega ${closingMenu === item.name ? "hide" : ""}`}
                      onMouseEnter={() => {
                        if (menuHideTimeout.current) {
                          clearTimeout(menuHideTimeout.current)
                          menuHideTimeout.current = null
                        }
                        setClosingMenu(null)
                      }}
                      onMouseLeave={() => {
                        handleMenuClose(item.name)
                      }}
                    >
                      {item.megaNested.map((group, gi) => (
                        <div key={`group-${gi}`} className="package-row">
                          <div className="package-title-row">
                            {group.title}
                          </div>
                          <div className="package-flyout">
                            {group.items.map((pkg, pi) => (
                              <NavLink key={`pkg-${pi}`} to={pkg.path} className="package-item">
                                {pkg.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeMenu === item.name && item.megaNested && item.name !== "Packages" && (
                    <div
                      className={`mega-menu vertical package-root left-align ${closingMenu === item.name ? "hide" : ""}`}
                      onMouseEnter={() => {
                        if (menuHideTimeout.current) {
                          clearTimeout(menuHideTimeout.current)
                          menuHideTimeout.current = null
                        }
                        setClosingMenu(null)
                      }}
                      onMouseLeave={() => {
                        handleMenuClose(item.name)
                      }}
                    >
                      {item.megaNested.map((group, gi) => (
                        <div key={`group-${gi}`} className="package-row">
                          <div
                            className="package-title-row"
                            onClick={() =>
                              setActivePackage(
                                activePackage === group.title ? null : group.title
                              )
                            }
                          >
                            {group.title}
                            <FiChevronDown
                              style={{
                                transition: "transform 0.25s ease",
                                transform: activePackage === group.title
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                fontSize: "14px",
                                opacity: 0.7,
                              }}
                            />
                          </div>

                          {activePackage === group.title && (
                            <div className="package-flyout">
                              {group.items.map((pkg, pi) => (
                                <NavLink key={`pkg-${pi}`} to={pkg.path} className="package-item">
                                  {pkg.name}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <button className="theme-toggle" onClick={() => setDark(!dark)}>
              {dark ? <FiSun /> : <FiMoon />}
            </button>

            <a
              href="/partner/register"
              className="nav-partner-btn"
            >
              Partner With Us
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <div className="mobile-menu-btn" onClick={() => setOpen(true)}>
            <FiMenu />
          </div>

        </div>
      </nav>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        className={`mobile-overlay ${open ? "active" : ""}`}
        onClick={closeMenu}
      />

      {/* ================= MOBILE SIDEBAR ================= */}
      <div className={`mobile-sidenav ${open ? "open" : ""}`}>

        {/* Header */}
        <div className="mobile-header">
          <img src={logo} alt="Axsem" />
          <FiX onClick={closeMenu} />
        </div>

        {/* Theme Toggle */}
        <button className="theme-toggle mobile" onClick={() => setDark(!dark)}>
          {dark ? <FiSun /> : <FiMoon />} Toggle Theme
        </button>

        {/* Nav Items Container - Scrollable */}
        <div className="mobile-nav-items">
          {activeMenuData.map((item, index) => (
            <div key={`mobile-${item.name}-${index}`} className="mobile-nav-item">
              {item.path ? (
                <NavLink
                  to={item.path}
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-icon">
                    {mobileIcons[item.name] || <FiChevronRight />}
                  </span>
                  {item.name}
                </NavLink>
              ) : (
                <div
                  onClick={() =>
                    setActiveMenu(activeMenu === item.name ? null : item.name)
                  }
                >
                  <span className="mobile-nav-icon">
                    {mobileIcons[item.name] || <FiChevronRight />}
                  </span>
                  {item.name}
                  <FiChevronDown
                    style={{
                      marginLeft: "auto",
                      transition: "transform 0.25s ease",
                      transform: activeMenu === item.name ? "rotate(180deg)" : "rotate(0deg)",
                      fontSize: "14px",
                      opacity: 0.6,
                    }}
                  />
                </div>
              )}

              {activeMenu === item.name && item.mega && (
                <div className={`mobile-sub ${activeMenu === item.name ? 'open' : ''}`}>
                  {item.mega.map((m, i) => (
                    <NavLink key={`mobile-mega-${i}`} to={m.path} onClick={closeMenu}>
                      {m.name}
                    </NavLink>
                  ))}
                </div>
              )}

              {activeMenu === item.name && item.megaNested && (
                <div className={`mobile-sub ${activeMenu === item.name ? 'open' : ''}`}>
                  {item.megaNested.map((group, gi) => (
                    <div key={`mobile-group-${gi}`}>
                      <strong>{group.title}</strong>
                      {group.items && group.items.map((pkg, pi) => (
                        <NavLink key={`mobile-pkg-${pi}`} to={pkg.path} onClick={closeMenu}>
                          {pkg.name}
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mobile-cta">
          <a href="/partner/register" className="nav-partner-btn" style={{ width: '100%', justifyContent: 'center' }}>
            Partner With Us
          </a>
        </div>

      </div>
    </>
  )
}
