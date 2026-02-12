import { useEffect, useRef, useState } from "react"

type ReactionTimerProps = {
  onSignal?: (amount: number) => void
}

export default function ReactionTimer({ onSignal }: ReactionTimerProps) {
  const [status, setStatus] = useState<"idle" | "waiting" | "ready" | "result">("idle")
  const [message, setMessage] = useState("Click start to test your reaction time.")
  const [reaction, setReaction] = useState<number | null>(null)
  const [best, setBest] = useState<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleStart = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
    setStatus("waiting")
    setReaction(null)
    setMessage("Wait for green...")
    const delay = 1200 + Math.random() * 2200
    timeoutRef.current = window.setTimeout(() => {
      setStatus("ready")
      setMessage("Tap now!")
      startTimeRef.current = performance.now()
    }, delay)
  }

  const handleClick = () => {
    if (status === "waiting") {
      setStatus("result")
      setMessage("Too soon. Try again.")
      setReaction(null)
      onSignal?.(0.1)
      return
    }
    if (status === "ready") {
      const end = performance.now()
      const time = Math.round(end - (startTimeRef.current ?? end))
      setReaction(time)
      setMessage(`Reaction: ${time} ms`)
      setStatus("result")
      const pulse = Math.max(0.1, Math.min(1, 1 - time / 800))
      onSignal?.(pulse)
      if (best === null || time < best) {
        setBest(time)
      }
    }
  }

  return (
    <div className="surface-card p-6 rounded-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Mini Game</p>
          <h3 className="text-xl font-semibold">Reaction Timer</h3>
          <p className="text-gray-400 text-sm mt-1">Wait for the signal, then click fast.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleStart}
          className="btn-primary px-4 py-2 rounded-md transition"
        >
          Start
        </button>
        <button
          type="button"
          onClick={handleClick}
          className={`px-4 py-2 rounded-md text-sm transition ${
            status === "ready" ? "btn-primary" : "btn-ghost"
          }`}
        >
          {status === "ready" ? "Click!" : "Tap area"}
        </button>
        <div className="text-sm text-gray-300">
          <p>{message}</p>
          <p>Best: {best ? `${best} ms` : "—"}</p>
          <p>Last: {reaction ? `${reaction} ms` : "—"}</p>
        </div>
      </div>
    </div>
  )
}
