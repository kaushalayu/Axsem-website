import { useState, useEffect, useRef } from "react"
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
} from "react-icons/fi"

import logo from "../assets/axsem.jpg"
import { navMenu } from "../data/navData"
import { useCompany } from "../contexts/CompanyContext"
import "../Styles/Navbar.css"

// Map nav item names to icons (add/edit as per your navData)
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
}

export default function Navbar() {
  const { companyInfo } = useCompany()
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [activePackage, setActivePackage] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const menuHideTimeout = useRef(null)

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

  const [closingMenu, setClosingMenu] = useState(null)

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
          <img src={logo} alt="AXSEM" className="nav-logo" />

          {/* DESKTOP MENU */}
          <div className="desktop-menu">
            {navMenu.map((item) => {
              const hasDropdown = item.mega || item.megaNested

              return (
                <div
                  key={item.name}
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
                      {item.mega.map((m) => (
                        <NavLink key={m.name} to={m.path} className="mega-item">
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
                      {item.megaNested.map((group) => (
                        <div key={group.title} className="package-row">
                          <div className="package-title-row">
                            {group.title}
                          </div>
                          <div className="package-flyout">
                            {group.items.map((pkg) => (
                              <NavLink key={pkg.name} to={pkg.path} className="package-item">
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
                      {item.megaNested.map((group) => (
                        <div key={group.title} className="package-row">
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
                              {group.items.map((pkg) => (
                                <NavLink key={pkg.name} to={pkg.path} className="package-item">
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
              href={`tel:${companyInfo.phone?.replace(/\s/g, '') || '+917860291285'}`}
              className="nav-cta"
            >
              Get Free Consultation
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
          <img src={logo} alt="AXSEM" />
          <FiX onClick={closeMenu} />
        </div>

        {/* Theme Toggle */}
        <button className="theme-toggle mobile" onClick={() => setDark(!dark)}>
          {dark ? <FiSun /> : <FiMoon />} Toggle Theme
        </button>

        {/* Nav Items Container - Scrollable */}
        <div className="mobile-nav-items">
          {navMenu.map((item) => (
            <div key={item.name} className="mobile-nav-item">
              {item.path ? (
                <NavLink
                  to={item.path}
                  onClick={closeMenu}   // ✅ auto-close on click
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
                  {item.mega.map((m) => (
                    <NavLink key={m.name} to={m.path} onClick={closeMenu}>
                      {m.name}
                    </NavLink>
                  ))}
                </div>
              )}

              {activeMenu === item.name && item.megaNested && (
                <div className={`mobile-sub ${activeMenu === item.name ? 'open' : ''}`}>
                  {item.megaNested.map((group) => (
                    <div key={group.title}>
                      <strong>{group.title}</strong>
                      {group.items && group.items.map((pkg) => (
                        <NavLink key={pkg.name} to={pkg.path} onClick={closeMenu}>
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
          <a href={`tel:${companyInfo.phone?.replace(/\s/g, '') || '+917860291285'}`} className="nav-phone-link">
            Get Free Consultation
          </a>
        </div>

      </div>
    </>
  )
}