import { useState } from "react"
import "../Styles/Services3D.css"

export default function Card3D({ title, text }) {
    const [style, setStyle] = useState({})

    function handleMove(e) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const rotateX = (y / rect.height - 0.5) * 15
        const rotateY = (x / rect.width - 0.5) * -15
        setStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` })
    }

    return (
        <div className="card3d-outer" onMouseMove={handleMove} onMouseLeave={() => setStyle({})}>
            <div className="card3d-inner" style={style}>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}
