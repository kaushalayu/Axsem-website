import { useState } from "react"
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import { api } from "../services/api"
import "../Styles/ContactPage.css"

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
    const [status, setStatus] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            await api.addContact(form)
            setStatus('success')
            setForm({ name: '', email: '', phone: '', subject: '', message: '' })
        } catch (err) {
            setStatus('error')
        }
    }
    return (
        <div className="contact-page">

            {/* HERO */}
            <PageHero
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Contact" }
                ]}
                pill="Get In Touch"
                pillIcon={<FiMail />}
                title={
                    <>
                        Let’s <span className="ph-gradient">Build Something</span><br />
                        Together
                    </>
                }
                subtitle="Have a project, idea, or collaboration in mind? Reach out — our team usually responds within 24 hours."
                tag="Contact · Axsem Softwares"
            />

            {/* MAIN CONTACT SECTION */}
            <section className="contact-section">

                {/* LEFT — INFO */}
                <div className="contact-info-card">
                    <h2>Contact Information</h2>
                    <p>
                        We’d love to hear from you. Whether it’s a business inquiry,
                        project discussion, or general question — our inbox is always open.
                    </p>

                    <div className="contact-info-list">
                        <div className="contact-info-item">
                            <FiPhone />
                            <span>+91 7860291285</span>
                        </div>
                        <div className="contact-info-item">
                            <FiMail />
                            <span>info@Axsemsoftwares.com</span>
                        </div>
                        <div className="contact-info-item">
                            <FiMapPin />
                            <span>12/2, Near Central Academy, Sector 12, Indira Nagar, Lucknow, UP – 226016</span>
                        </div>
                        <div className="contact-info-item">
                            <FiClock />
                            <span>Mon – Sat · 9:00 AM – 7:00 PM</span>
                        </div>
                    </div>

                    <div className="contact-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.552195355416!2d80.99788007522339!3d26.885964976663153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2a786ed1eed%3A0x688667d04f72eeb!2s12%2F2%2C%20Arvindo%20Pk%20Rd%2C%20Sector%2012%2C%20Indira%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226016!5e0!3m2!1sen!2sin!4v1772205505882!5m2!1sen!2sin"
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location Map"
                        ></iframe>
                    </div>

                    <div className="contact-note">
                        <strong>Note:</strong> For careers, please visit our Careers page
                        or email us directly with the role mentioned.
                    </div>
                </div>

                {/* RIGHT — FORM */}
                <div className="contact-form-card">
                    <h2>Send Us a Message</h2>

                    {status === 'success' && (
                        <div style={{ padding: '15px', background: '#d4edda', color: '#155724', borderRadius: '5px', marginBottom: '20px' }}>
                            Message sent successfully! We'll get back to you soon.
                        </div>
                    )}

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="contact-field">
                            <label>Your Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="contact-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="contact-field">
                            <label>Phone (Optional)</label>
                            <input
                                type="tel"
                                placeholder="+91 9876543210"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                            />
                        </div>

                        <div className="contact-field">
                            <label>Subject (Optional)</label>
                            <input
                                type="text"
                                placeholder="What's this about?"
                                value={form.subject}
                                onChange={e => setForm({ ...form, subject: e.target.value })}
                            />
                        </div>

                        <div className="contact-field">
                            <label>Your Message</label>
                            <textarea
                                rows="5"
                                placeholder="Tell us about your project or idea..."
                                value={form.message}
                                onChange={e => setForm({ ...form, message: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="contact-submit" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'} <FiSend />
                        </button>
                    </form>
                </div>

            </section>
        </div>
    )
}