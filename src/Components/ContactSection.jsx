import { useState } from "react"
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { api } from "../services/api";
import "../Styles/ContactSection.css";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    const [status, setStatus] = useState("idle")

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("sending")
        try {
            await api.addContact(formData)
            setStatus("success")
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        } catch (error) {
            setStatus("error")
        }
    }
    return (
        <section className="ax-contact-section">
            <div className="ax-contact-container">

                {/* LEFT INFO */}
                <div className="ax-contact-info">
                    <span className="ax-contact-badge">CONTACT US</span>
                    <h2>Let’s Talk About Your Project</h2>
                    <p>
                        Have an idea or need help with software development?
                        Our experts are ready to guide you with the right solution.
                    </p>

                    <div className="ax-contact-cards">
                        <div className="ax-info-card">
                            <Phone />
                            <div>
                                <h5>Call Us</h5>
                                <p>+91 786 029 1285</p>
                            </div>
                        </div>

                        <div className="ax-info-card">
                            <Mail />
                            <div>
                                <h5>Email Us</h5>
                                <p>support@axsemsoftwares.com</p>
                            </div>
                        </div>

                        <div className="ax-info-card">
                            <MapPin />
                            <div>
                                <h5>Office Address</h5>
                                <p>
                                    Indira Nagar, Lucknow<br />
                                    Uttar Pradesh – 226016
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM + MAP */}
                <div className="ax-contact-right">

                    {/* FORM */}
                    <div className="ax-contact-form">
                        <h4>Send us a Message</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="ax-form-row">
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Your Name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email Address" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <input 
                                type="text" 
                                name="subject"
                                placeholder="Subject" 
                                value={formData.subject}
                                onChange={handleChange}
                                required 
                            />

                            <textarea 
                                rows="4" 
                                name="message"
                                placeholder="Tell us about your project..."
                                value={formData.message}
                                onChange={handleChange}
                            />

                            <button type="submit" disabled={status === "sending"}>
                                {status === "sending" ? "Sending..." : "Send Message"} <Send size={16} />
                            </button>
                            {status === "success" && <p className="ax-form-success">Message sent successfully!</p>}
                            {status === "error" && <p className="ax-form-error">Failed to send message. Please try again.</p>}
                        </form>
                    </div>

                    {/* MAP */}
                    <div className="ax-contact-map">
                        <iframe
                            title="AXSEM Office Location"
                            src="https://www.google.com/maps?q=Indira%20Nagar%20Lucknow&output=embed"
                            loading="lazy"
                        ></iframe>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ContactSection;
