import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "../Styles/FAQ.css";

const faqs = [
    {
        question: "What services does AXSEM Softwares provide?",
        answer:
            "AXSEM Softwares offers end-to-end software solutions including web development, mobile applications, custom software development, UI/UX design, ERP & CRM systems, cloud solutions, and API integrations."
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
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="faq-container">

                <div className="faq-layout">

                    {/* LEFT SIDE */}
                    <div className="faq-left">
                        <span className="faq-label">Support & Help</span>

                        <h2>
                            Got Questions?
                            <br />
                            We’ve Got Answers.
                        </h2>

                        <p>
                            Everything you need to know about working with AXSEM Softwares
                            and how we build scalable, secure digital products.
                        </p>

                        <div className="faq-highlight-card">
                            <h4>Still Need Help?</h4>
                            <p>Our team is always available to assist you.</p>
                            <button>Contact Support</button>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="faq-right">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-card ${activeIndex === index ? "open" : ""}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span>{faq.question}</span>
                                    {activeIndex === index ? <Minus /> : <Plus />}
                                </button>

                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;

