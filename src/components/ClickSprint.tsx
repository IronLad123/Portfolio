import { useEffect, useMemo, useState } from "react"

type ClickSprintProps = {
  onSignal?: (amount: number) => void
}

export default function ClickSprint({ onSignal }: ClickSprintProps) {
  const [running, setRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(5)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (!running && timeLeft === 0 && score > best) {
      setBest(score)
    }
  }, [running, timeLeft, score, best])

  const label = useMemo(() => {
    if (running) return "Tap!"
    if (timeLeft === 0) return "Play again"
    return "Start"
  }, [running, timeLeft])

  const handleClick = () => {
    if (!running) {
      setScore(1)
      setTimeLeft(5)
      setRunning(true)
      onSignal?.(0.3)
      return
    }
    setScore((prev) => prev + 1)
    onSignal?.(0.15)
  }

  return (
    <div className="surface-card p-6 rounded-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Mini Game</p>
          <h3 className="text-xl font-semibold">Click Sprint</h3>
          <p className="text-gray-400 text-sm mt-1">Tap as many times as you can in 5 seconds.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleClick}
          className="btn-primary px-4 py-2 rounded-md transition"
        >
          {label}
        </button>
        <div className="text-sm text-gray-300">
          <p>Time: {timeLeft}s</p>
          <p>Score: {score}</p>
          <p>Best: {best}</p>
        </div>
      </div>
    </div>
  )
}
