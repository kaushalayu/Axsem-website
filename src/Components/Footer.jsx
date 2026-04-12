import { useState } from "react"
import {
    FiPhone, FiMail, FiMapPin, FiClock, FiGlobe,
    FiChevronRight, FiHeart, FiMessageCircle,
} from "react-icons/fi"
import {
    FaLinkedinIn, FaInstagram, FaXTwitter,
    FaYoutube, FaFacebookF, FaWhatsapp,
} from "react-icons/fa6"
import { HiOutlineShieldCheck, HiOutlineDocumentText, HiOutlineCurrencyRupee, HiOutlineOfficeBuilding } from "react-icons/hi"
import logo from "../assets/axsem.jpg"
import { MdOutlineLocationOn, MdOutlineAccessTime } from "react-icons/md"
import "../Styles/Footer.css"
import { Link } from "react-router-dom"
import { useCompany } from "../contexts/CompanyContext"

const NAV_COLS = [
    {
        title: "Services",
        links: [
            { label: "Website Development", href: "/services/web-development" },
            { label: "Mobile App Development", href: "/services/mobile-apps" },
            { label: "Digital Marketing", href: "/services/digital-marketing" },
            { label: "Graphic Designing", href: "/services/graphic-design" },
            { label: "UI & UX Designing", href: "/services/ui-ux" },
            { label: "Software Development", href: "/services/software-development" },
            { label: "IT Maintenance", href: "/services/it-maintenance" },
            { label: "SEO Services", href: "/services/seo" },
        ],
    },
    {
        title: "Products",
        links: [
            { label: "CRM Software", href: "/products/crm" },
            { label: "LMS System", href: "/products/lms" },
            { label: "E-Commerce Platform", href: "/products/ecommerce" },
            { label: "Real Estate Platform", href: "/products/real-estate" },
            { label: "HR & Payroll System", href: "/products/hr-payroll" },
            { label: "School Management", href: "/products/school-management" },
            { label: "AI Solutions", href: "/products/ai-solutions" },
            { label: "NGO Management", href: "/products/ngo" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about/company" },
            { label: "Our Team", href: "/about/team" },
            { label: "Our Journey", href: "/about/journay" },
            { label: "Careers", href: "/about/careers" },
            { label: "Our Clients", href: "/portfolio/clients" },
            { label: "Projects", href: "/portfolio" },
            { label: "Blogs", href: "/blogs" },
            { label: "Partner Portal", href: "/partner/register" },
        ],
    },
    {
        title: "Quick Links",
        links: [
            { label: "Contact Us", href: "/contact" },
            { label: "Partner Login", href: "/partner/login" },
            { label: "Client Registration", href: "/client/register" },
            { label: "Employee Verification", href: "/verify/employee" },
            { label: "Raise Ticket", href: "/support/ticket" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Sitemap", href: "/sitemap" },
        ],
    },
]

export default function AxsemFooter() {
    const { companyInfo } = useCompany()
    const SOCIALS = [
        { icon: <FaLinkedinIn />, href: companyInfo.linkedin || "https://linkedin.com/company/axsem", label: "LinkedIn" },
        { icon: <FaInstagram />, href: companyInfo.instagram || "https://instagram.com/axsem", label: "Instagram" },
        { icon: <FaXTwitter />, href: companyInfo.twitter || "https://twitter.com/axsem", label: "X / Twitter" },
        { icon: <FaYoutube />, href: companyInfo.youtube || "https://youtube.com/@axsem", label: "YouTube" },
        { icon: <FaFacebookF />, href: companyInfo.facebook || "https://facebook.com/axsem", label: "Facebook" },
        { icon: <FaWhatsapp />, href: `https://wa.me/${companyInfo.phone?.replace(/\s/g, '') || '917860291285'}`, label: "WhatsApp" },
    ]

    return (
        <footer className="axf">
            <div className="axf-inner">
                {/* Top Section: Logo + About + Links */}
                <div className="axf-top-section">
                    {/* Brand Column */}
                    <div className="axf-brand-col">
                        <a href="/" className="axf-logo-link">
                            <img
                                src={logo}
                                alt="Axsem"
                                className="axf-logo"
                            />
                        </a>
                        <h3 className="axf-about-heading">About Axsem</h3>
                        <p className="axf-about-text">
                            Axsem Softwares Pvt. Ltd. is a forward-thinking technology company dedicated to delivering high-quality solutions in web app development, mobile app development, software engineering, digital marketing, and IT consulting. We focus on creating smart, secure, and scalable digital products that help businesses operate efficiently and grow with confidence in today's fast-moving digital landscape. Powered by a dynamic team of young software engineers and entrepreneurs, we bring fresh ideas, modern technology, and a strong commitment to excellence to every project. Our mission is to provide simple, effective, and affordable solutions that truly make a difference for our clients.
                        </p>
                        <div className="axf-socials">
                            {SOCIALS.map(s => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    aria-label={s.label}
                                    className="axf-soc"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    <nav className="axf-links-section" aria-label="Footer navigation">
                        <div className="axf-links-actions">
                            <a href="/contact" className="axf-action-btn axf-action-contact">
                                Contact Us
                            </a>
                            <a href="/partner/register" className="axf-action-btn axf-action-meeting">
                                Partner With Us
                            </a>
                        </div>
                        <div className="axf-links-grid">
                            {NAV_COLS.map(col => (
                                <div key={col.title} className="axf-nav-col">
                                    <h3 className="axf-nav-title">{col.title}</h3>
                                    <ul className="axf-nav-list">
                                        {col.links.map(lk => (
                                            <li key={lk.href}>
                                                <Link to={lk.href} className="axf-nav-link">
                                                    <FiChevronRight className="axf-nav-arrow" />
                                                    {lk.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </nav>
                </div>

                {/* Info Cards Section */}
                <div className="axf-cards-section">
                    {/* Address + Location Card - FIRST */}
                    <div className="axf-info-card axf-address-card">
                        <h3 className="axf-card-title">
                            <MdOutlineLocationOn className="axf-title-icon" />
                            Address & Location
                        </h3>
                        <div className="axf-address-content">
                            <div className="axf-address">
                                <span>12/2, Near Central Academy,<br />Sector 12, Indira Nagar,<br />Lucknow, UP - 226016</span>
                            </div>
                            <div className="axf-map-container">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.758665215739!2d80.99479798052258!3d26.879407616504473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x181a471a50caac7%3A0x55a7031c773213f2!2sAxsem%20Softwares%20Private%20Limited!5e0!3m2!1sen!2sin!4v1775731569993!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="200" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Axsem Location"
                                ></iframe>
                            </div>
                            <a 
                                href="https://www.google.com/maps/dir/?api=1&destination=26.879407676666958,80.99709397522314" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="axf-map-btn-full"
                            >
                                Get Directions
                            </a>
                        </div>
                    </div>

                    {/* Phone Card - SECOND */}
                    <div className="axf-info-card">
                        <h3 className="axf-card-title">
                            <FiPhone className="axf-title-icon" />
                            Call Us
                        </h3>
                        <div className="axf-contact-list">
                            <a href="tel:+917860291285" className="axf-contact-item">
                                <span className="axf-contact-role">Manager</span>
                                <span className="axf-contact-value">+91 786 029 1285</span>
                            </a>
                            <a href="tel:+919473761285" className="axf-contact-item">
                                <span className="axf-contact-role">HR</span>
                                <span className="axf-contact-value">+91 947 376 1285</span>
                            </a>
                            <a href="tel:+917081291285" className="axf-contact-item">
                                <span className="axf-contact-role">BDM</span>
                                <span className="axf-contact-value">+91 708 129 1285</span>
                            </a>
                            <a href="tel:+919532701285" className="axf-contact-item">
                                <span className="axf-contact-role">Support</span>
                                <span className="axf-contact-value">+91 953 270 1285</span>
                            </a>
                            <a href="tel:+915224704832" className="axf-contact-item">
                                <span className="axf-contact-role">Telephone</span>
                                <span className="axf-contact-value">0522 470 4832</span>
                            </a>
                        </div>
                    </div>

                    {/* Email Card - THIRD */}
                    <div className="axf-info-card">
                        <h3 className="axf-card-title">
                            <FiMail className="axf-title-icon" />
                            Email Us
                        </h3>
                        <div className="axf-contact-list">
                            <a href="mailto:suraj@axsemsoftwares.com" className="axf-contact-item">
                                <span className="axf-contact-role">Manager</span>
                                <span className="axf-contact-value">suraj@axsem.com</span>
                            </a>
                            <a href="mailto:hr@axsemsoftwares.com" className="axf-contact-item">
                                <span className="axf-contact-role">HR</span>
                                <span className="axf-contact-value">hr@axsem.com</span>
                            </a>
                            <a href="mailto:bdm@axsemsoftwares.com" className="axf-contact-item">
                                <span className="axf-contact-role">BDM</span>
                                <span className="axf-contact-value">bdm@axsem.com</span>
                            </a>
                            <a href="mailto:support@axsemsoftwares.com" className="axf-contact-item">
                                <span className="axf-contact-role">Support</span>
                                <span className="axf-contact-value">support@axsem.com</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Certification Images */}
                <div className="axf-certifications">
                    <img src="/src/assets/iso.webp" alt="ISO Certification" className="axf-cert-img" />
                    <img src="/src/assets/msme.webp" alt="MSME Certified" className="axf-cert-img" />
                    <img src="/src/assets/axsem_gst.webp" alt="GST Registered" className="axf-cert-img" />
                    <img src="/src/assets/legal_name2.webp" alt="Legal Name" className="axf-cert-img" />
                    <img src="/src/assets/axsem-gemp.webp" alt="GEM Registered" className="axf-cert-img" />
                    <img src="/src/assets/axsem1.webp" alt="Axsem" className="axf-cert-img" />
                </div>

                {/* Copyright Bar */}
                <div className="axf-copy-bar">
                    <p className="axf-copy-text">
                        © {new Date().getFullYear()} <strong> <Link to="https://axsemsoftwares.com">Axsem Softwares Pvt. Ltd.</Link></strong> · All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}
