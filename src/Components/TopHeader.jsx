import { useState, useEffect } from "react"
import { useCompany } from "../contexts/CompanyContext"
import "../Styles/TopHeader.css"
import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt } from "react-icons/fa"

export default function TopHeader() {
  const { companyInfo } = useCompany()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.body.classList.contains("dark"))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
    setDark(document.body.classList.contains("dark"))
    return () => observer.disconnect()
  }, [])

  const socialLinks = [
    { icon: <FaFacebookF />, url: companyInfo.facebook || "https://facebook.com", label: "Facebook", hoverColor: "#1877F2" },
    { icon: <FaTwitter />, url: companyInfo.twitter || "https://twitter.com", label: "Twitter", hoverColor: "#1DA1F2" },
    { icon: <FaInstagram />, url: companyInfo.instagram || "https://instagram.com", label: "Instagram", hoverColor: "#E4405F" },
    { icon: <FaLinkedinIn />, url: companyInfo.linkedin || "https://linkedin.com", label: "LinkedIn", hoverColor: "#0A66C2" },
    { icon: <FaYoutube />, url: companyInfo.youtube || "https://youtube.com", label: "YouTube", hoverColor: "#FF0000" },
  ]

  return (
    <div className={`top-header ${dark ? "dark-mode" : ""}`}>
      <div className="top-header-inner">
        <div className="top-header-left">
          <a href={`tel:${companyInfo.phone?.replace(/\s/g, '') || '+917860291285'}`} className="top-header-item">
            <FaPhone className="top-header-icon" />
            <span>{companyInfo.phone || "+91 7860291285"}</span>
          </a>
          <a href={`mailto:${companyInfo.email || 'info@axsemsoftwares.com'}`} className="top-header-item">
            <FaEnvelope className="top-header-icon" />
            <span>{companyInfo.email || "info@axsemsoftwares.com"}</span>
          </a>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=12%2F2+Near+Central+Academy+Sector+12+Indira+Nagar+Lucknow+Uttar+Pradesh+226016" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="top-header-item"
            title="View on Google Maps"
          >
            <FaMapMarkerAlt className="top-header-icon" />
            <span>12/2, Near Central Academy, Sector 12, Indira Nagar, Lucknow</span>
          </a>
        </div>
        <div className="top-header-right">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="top-header-social"
              title={social.label}
              data-hover-color={social.hoverColor}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
