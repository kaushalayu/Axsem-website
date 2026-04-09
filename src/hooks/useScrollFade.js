import { useEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function useScrollFade(selector) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: selector,
          start: "top 80%",
        },
      })
    })

    // Proper cleanup — kills all ScrollTriggers created in this context
    return () => ctx.revert()
  }, [selector])
}
