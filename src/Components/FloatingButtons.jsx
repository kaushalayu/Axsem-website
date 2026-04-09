import { useState } from "react"
import { FiPhone, FiMessageCircle, FiX, FiSend } from "react-icons/fi"
import { LuBot } from "react-icons/lu"
import { FaWhatsapp } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const FloatingButtons = () => {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your AI assistant. How can I help you today?", sender: "ai" }
  ])
  const [inputText, setInputText] = useState("")

  const handleCall = () => {
    window.location.href = "tel:+917860291285"
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userMessage = { id: Date.now(), text: inputText, sender: "user" }
    setMessages(prev => [...prev, userMessage])
    setInputText("")

    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        text: "Thanks for reaching out! Our team will get back to you shortly. For immediate assistance, you can call us at +91 7860291285.", 
        sender: "ai" 
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .floating-whatsapp, .floating-btns-container {
            z-index: 1500 !important;
          }
        }
      `}</style>
      
      {/* WhatsApp - Left Side */}
      <motion.a
        href="https://wa.me/917860291285"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="floating-whatsapp"
        style={{
          position: "fixed",
          bottom: "30px",
          left: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#25D366",
          boxShadow: "0 8px 25px rgba(37, 211, 102, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 9999,
          textDecoration: "none"
        }}
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} color="white" />
      </motion.a>

      {/* Chat & Call - Right Side */}
      <div className="floating-btns-container" style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-end"
      }}>
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: "80px",
              right: "0",
              width: "360px",
              height: "450px",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
          >
            <div style={{
              padding: "16px 20px",
              background: "linear-gradient(135deg, #f05a28, #ff8a5c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <LuBot size={22} color="#f05a28" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "white" }}>
                    Chat with AI
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
                    We reply instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                <FiX size={18} color="white" />
              </button>
            </div>

            <div style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              background: "#f8f9fa"
            }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start"
                  }}
                >
                  <div style={{
                    maxWidth: "80%",
                    padding: "12px 16px",
                    borderRadius: msg.sender === "user" 
                      ? "18px 18px 4px 18px" 
                      : "18px 18px 18px 4px",
                    background: msg.sender === "user" 
                      ? "linear-gradient(135deg, #f05a28, #ff8a5c)" 
                      : "white",
                    color: msg.sender === "user" ? "white" : "#333",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form 
              onSubmit={handleSendMessage}
              style={{
                padding: "12px 16px",
                background: "white",
                borderTop: "1px solid #eee",
                display: "flex",
                gap: "10px"
              }}
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "1px solid #ddd",
                  borderRadius: "25px",
                  outline: "none",
                  fontSize: "14px",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#f05a28"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
              />
              <button
                type="submit"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "none",
                  background: "linear-gradient(135deg, #f05a28, #ff8a5c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              >
                <FiSend size={18} color="white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "flex", gap: "14px" }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChat(!showChat)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #10b981, #34d399)",
            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "box-shadow 0.3s"
          }}
          title="Chat with AI"
        >
          {showChat ? (
            <FiX size={26} color="white" />
          ) : (
            <FiMessageCircle size={26} color="white" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCall}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #f05a28, #ff8a5c)",
            boxShadow: "0 8px 25px rgba(240, 90, 40, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "box-shadow 0.3s"
          }}
          title="Call Us"
        >
          <FiPhone size={26} color="white" />
        </motion.button>
      </div>
      </div>
    </>
  )
}

export default FloatingButtons
