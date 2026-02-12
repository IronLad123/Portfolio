import { useState } from "react"

type SpeedSumProps = {
  onSignal?: (amount: number) => void
}

type Question = {
  a: number
  b: number
  answer: number
}

function createQuestion(): Question {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  return { a, b, answer: a + b }
}

export default function SpeedSum({ onSignal }: SpeedSumProps) {
  const [question, setQuestion] = useState<Question>(createQuestion())
  const [input, setInput] = useState("")
  const [streak, setStreak] = useState(0)
  const [status, setStatus] = useState("Ready")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const guess = Number(input)
    if (guess === question.answer) {
      setStreak((prev) => prev + 1)
      setStatus("Correct")
      onSignal?.(0.55)
    } else {
      setStreak(0)
      setStatus("Try again")
      onSignal?.(0.12)
    }
    setInput("")
    setQuestion(createQuestion())
  }

  return (
    <div className="surface-card p-6 rounded-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Mini Game</p>
          <h3 className="text-xl font-semibold">Speed Sum</h3>
          <p className="text-gray-400 text-sm mt-1">Solve quickly and build a streak.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-lg font-semibold text-white">
          {question.a} + {question.b} =
        </span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="bg-transparent border border-white/15 rounded-md px-3 py-1 text-white w-20"
          inputMode="numeric"
        />
        <button type="submit" className="btn-ghost px-3 py-1.5 rounded-md text-sm transition">
          Submit
        </button>
      </form>
      <div className="mt-3 text-sm text-gray-300">
        <p>Streak: {streak}</p>
        <p>Status: {status}</p>
      </div>
    </div>
  )
}
