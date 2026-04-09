import { Component } from "react"
import { FiArrowUp, FiHome, FiRefreshCw } from "react-icons/fi"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo)
  }

  handleGoBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    if (window.history.length > 1) {
      window.history.back()
    }
  }

  handleReload = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f05a28, #ff8a5c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            boxShadow: "0 10px 30px rgba(240, 90, 40, 0.3)"
          }}>
            <FiArrowUp size={36} color="white" />
          </div>
          
          <h1 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1a1a2e",
            marginBottom: "12px"
          }}>
            Oops! Something went wrong
          </h1>
          
          <p style={{
            fontSize: "16px",
            color: "#666",
            marginBottom: "32px",
            maxWidth: "500px"
          }}>
            We encountered an unexpected error. Don't worry, you can go back to the top or reload the page.
          </p>

          <div style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            <button
              onClick={this.handleGoBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                background: "linear-gradient(135deg, #f05a28, #ff8a5c)",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(240, 90, 40, 0.3)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 6px 20px rgba(240, 90, 40, 0.4)"
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "0 4px 15px rgba(240, 90, 40, 0.3)"
              }}
            >
              <FiHome size={20} />
              Go Back Home
            </button>

            <button
              onClick={this.handleReload}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#f05a28",
                background: "white",
                border: "2px solid #f05a28",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 6px 20px rgba(240, 90, 40, 0.2)"
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              <FiRefreshCw size={20} />
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
