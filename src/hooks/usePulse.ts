import { useEffect, useState } from "react"

export default function usePulse(decay = 0.06, interval = 200) {
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setPulse((prev) => Math.max(0, prev - decay))
    }, interval)
    return () => window.clearInterval(id)
  }, [decay, interval])

  const boost = (amount = 0.2) => {
    setPulse((prev) => Math.min(1, prev + amount))
  }

  return { pulse, boost }
}
