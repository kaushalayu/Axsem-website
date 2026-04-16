import { motion } from "framer-motion"
import logo from "../assets/logo-full.jpeg"
import "../Styles/PageLoader.css"

export default function PageLoader() {
    return (
        <motion.div
            className="page-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
        >
            <div className="loader-bg">
                <div className="loader-orb orb-1"></div>
                <div className="loader-orb orb-2"></div>
            </div>

            <div className="loader-content">
                <motion.div 
                    className="loader-logo-wrapper"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <div className="loader-logo-ring"></div>
                    <img 
                        src={logo} 
                        alt="AXSEM" 
                        className="loader-logo"
                    />
                </motion.div>
                
                <motion.div 
                    className="loader-text-container"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                >
                    <div className="loader-company">
                        <span className="loader-letter">A</span>
                        <span className="loader-letter">X</span>
                        <span className="loader-letter">S</span>
                        <span className="loader-letter">E</span>
                        <span className="loader-letter">M</span>
                    </div>

                    <div className="loader-tagline">
                        <span className="loader-tagline-word">Software</span>
                        <span className="loader-tagline-word">Pvt.</span>
                        <span className="loader-tagline-word">Ltd.</span>
                    </div>
                </motion.div>

                <motion.div 
                    className="loader-progress-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="loader-progress-track">
                        <motion.div 
                            className="loader-progress-bar"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
