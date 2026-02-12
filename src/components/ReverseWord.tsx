import { useMemo, useState } from "react"

type ReverseWordProps = {
  onSignal?: (amount: number) => void
}

const WORDS = ["PORTFOLIO", "ANALYTICS", "INSIGHT", "VISION", "SYSTEM"]

export default function ReverseWord({ onSignal }: ReverseWordProps) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState("")
  const [status, setStatus] = useState("Ready")

  const target = useMemo(() => WORDS[index % WORDS.length], [index])
  const reversed = useMemo(() => target.split("").reverse().join(""), [target])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (input.trim().toUpperCase() === reversed) {
      setStatus("Correct")
      setIndex((prev) => prev + 1)
      onSignal?.(0.45)
    } else {
      setStatus("Try again")
      onSignal?.(0.12)
    }
    setInput("")
  }

  return (
    <div className="surface-card p-6 rounded-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Mini Game</p>
          <h3 className="text-xl font-semibold">Reverse Word</h3>
          <p className="text-gray-400 text-sm mt-1">Type the word in reverse.</p>
        </div>
      </div>

      <div className="mt-5 text-lg font-semibold text-white">
        Word: {target}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap items-center gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="bg-transparent border border-white/15 rounded-md px-3 py-1 text-white w-40"
          placeholder="Type reverse"
        />
        <button type="submit" className="btn-ghost px-3 py-1.5 rounded-md text-sm transition">
          Check
        </button>
      </form>
      <p className="text-sm text-gray-300 mt-3">Status: {status}</p>
    </div>
  )
}
