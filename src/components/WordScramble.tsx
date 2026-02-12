import { useMemo, useState } from "react"

type WordScrambleProps = {
  onSignal?: (amount: number) => void
}

const WORDS = ["SPECTRUM", "SIGNAL", "DRONE", "VISION", "SENSOR", "PATENT"]

function shuffleWord(word: string) {
  const letters = word.split("")
  for (let i = letters.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = letters[i]
    letters[i] = letters[j]
    letters[j] = temp
  }
  return letters.join("")
}

export default function WordScramble({ onSignal }: WordScrambleProps) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState("")
  const [status, setStatus] = useState("Ready")

  const target = useMemo(() => WORDS[index % WORDS.length], [index])
  const scrambled = useMemo(() => shuffleWord(target), [target])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (input.trim().toUpperCase() === target) {
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
          <h3 className="text-xl font-semibold">Word Scramble</h3>
          <p className="text-gray-400 text-sm mt-1">Unscramble the word.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-lg font-semibold text-white tracking-widest">{scrambled}</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap items-center gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="bg-transparent border border-white/15 rounded-md px-3 py-1 text-white w-40"
          placeholder="Type answer"
        />
        <button type="submit" className="btn-ghost px-3 py-1.5 rounded-md text-sm transition">
          Check
        </button>
      </form>
      <p className="text-sm text-gray-300 mt-3">Status: {status}</p>
    </div>
  )
}
