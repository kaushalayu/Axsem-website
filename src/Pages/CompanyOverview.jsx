import { motion } from "framer-motion"
import "../styles/CompanyOverview.css"
import PageHero from "../Components/PageHero"
import CEO from "../assets/CEO_SURAJ.webp"
import about from "../assets/about-team.webp";

export default function CompanyOverview() {
    return (
        <>
            <PageHero
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Founder Message" },
                ]}
                pill="Founder’s Note"
                title={
                    <>
                        A Message From<br />
                        <span className="ph-gradient">Our Founder</span>
                    </>
                }
                subtitle="Gratitude to our clients and appreciation for our team."
                tag="Suraj Kumar · Founder & CEO"
            />

            <main className="company">

                {/* CLIENT MESSAGE */}
                <section className="founder-block">
                    <div className="founder-grid">

                        <motion.div
                            className="founder-image"
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <img src={CEO} alt="Founder with Clients" />
                        </motion.div>

                        <motion.div
                            className="founder-text"
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <h2>Message to Our Clients</h2>

                            <p><strong>Dear Clients,</strong></p>

                            <p>
                                As the Director of Axsem Softwares Private Limited, I would like to thank all our respected clients from the bottom of my heart. Your trust and support are the main reason behind our success.
                            </p>

                            <p>
                                We always try to give you the best IT solutions and services as per your needs. We understand that every client is different, and we are committed to providing the right solutions that suit your business.
                            </p>

                            <p>
                                Your success is our success. We feel proud to be your technology partner and will continue to support you with full honesty and dedication.
                            </p>

                            <p>
                                Thank you once again for choosing us.
                            </p>

                        </motion.div>

                    </div>
                </section>


                {/* TEAM MESSAGE */}
                <section className="founder-block alt">
                    <div className="founder-grid">

                        <motion.div
                            className="founder-text"
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <h2>Message to Our Team</h2>

                            <p><strong>Dear Team Members,</strong></p>

                            <p>
                                I feel very happy and proud to appreciate all of you for your great work.
                            </p>

                            <p>
                                Each one of you plays an important role in the growth of our company. Your passion, teamwork, and smart thinking help us move forward and do better every day.
                            </p>

                            <p>
                                Thank you for giving your best every time. Let us continue to work together with unity, learn new things, and take our company to the next level.
                            </p>

                            <p>
                                Keep up the good work and stay motivated!
                            </p>

                            <div className="founder-sign">
                                <strong>Suraj Kumar</strong>
                                <span>Founder & CEO, Axsem Softwares Pvt. Ltd.</span>
                            </div>

                        </motion.div>

                        <motion.div
                            className="founder-image"
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <img src={about} alt="Founder with Team" />
                        </motion.div>

                    </div>
                </section>

            </main>
        </>
    )
}