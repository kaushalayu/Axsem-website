import { useState, useEffect } from "react"
import { FiArrowUp } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "120px",
            right: "30px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #1a1a2e, #2d2d44)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 9998,
          }}
          title="Back to Top"
        >
          <FiArrowUp size={24} color="white" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
