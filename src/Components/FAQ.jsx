import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../Styles/FAQ.css";

const faqs = [
    {
        question: "What services does Axsem Softwares provide?",
        answer:
            "Axsem Softwares offers end-to-end software solutions including web development, mobile applications, custom software development, UI/UX design, ERP & CRM systems, cloud solutions, and API integrations."
    },
    {
        question: "Which technologies do you specialize in?",
        answer:
            "We work with modern, scalable technologies such as React, Node.js, Python, Flutter, MongoDB, PostgreSQL, AWS, Docker, and cloud-native architectures."
    },
    {
        question: "Do you build fully custom software?",
        answer:
            "Yes. Every solution we deliver is custom-built based on business requirements, scalability goals, and long-term growth."
    },
    {
        question: "What is the typical project timeline?",
        answer:
            "Timelines vary by scope. Small projects usually take 2–4 weeks, while larger enterprise systems may take several months."
    },
    {
        question: "Do you provide post-launch support?",
        answer:
            "Yes, we offer continuous support, maintenance, performance optimization, and feature upgrades after deployment."
    },
    {
        question: "What industries do you serve?",
        answer:
            "We serve a wide range of industries including healthcare, e-commerce, education, fintech, real estate, and more. Our solutions are tailored to each industry's unique requirements."
    },
    {
        question: "How do you ensure project security?",
        answer:
            "We implement industry-standard security practices including SSL encryption, secure authentication, regular security audits, and compliance with data protection regulations."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="faq-bg-pattern"></div>
            <div className="faq-container">
                <div className="faq-header">
                    <motion.span
                        className="faq-badge"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        FAQ's
                    </motion.span>
                    <motion.h2
                        className="faq-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        className="faq-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Everything you need to know about working with Axsem Softwares
                    </motion.p>
                </div>

                <div className="faq-layout">
                    {/* LEFT SIDE */}
                    <motion.div
                        className="faq-left"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="faq-info-card">
                            <div className="faq-info-icon">
                                <FiMessageCircle />
                            </div>
                            <h3>Still have questions?</h3>
                            <p>Can't find what you're looking for? Our support team is here to help you with any questions.</p>
                            <Link to="/contact" className="faq-contact-btn">
                                Contact Support
                                <FiChevronDown style={{ transform: 'rotate(-90deg)' }} />
                            </Link>
                        </div>

                        <div className="faq-stats">
                            <div className="faq-stat">
                                <span className="faq-stat-number">500+</span>
                                <span className="faq-stat-label">Projects Delivered</span>
                            </div>
                            <div className="faq-stat">
                                <span className="faq-stat-number">98%</span>
                                <span className="faq-stat-label">Client Satisfaction</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <motion.div
                        className="faq-right"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={`faq-card ${activeIndex === index ? "open" : ""}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="faq-question-text">{faq.question}</span>
                                    <motion.span
                                        className="faq-icon"
                                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FiChevronDown />
                                    </motion.span>
                                </button>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            className="faq-answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="faq-answer-content">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className={`faq-card-accent ${activeIndex === index ? "active" : ""}`}></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
