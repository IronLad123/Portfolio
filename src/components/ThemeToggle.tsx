import { useEffect, useState } from "react"

type ThemeOption = {
  id: "quantum" | "aurora" | "solar"
  label: string
  preview: string
}

const THEMES: ThemeOption[] = [
  { id: "quantum", label: "Quantum", preview: "linear-gradient(135deg, #22f0a8, #4cc2ff)" },
  { id: "aurora", label: "Aurora", preview: "linear-gradient(135deg, #8b6bff, #54f2d6)" },
  { id: "solar", label: "Solar", preview: "linear-gradient(135deg, #f9b35f, #ff6b6b)" },
]

const STORAGE_KEY = "om-portfolio-theme"

type ThemeToggleProps = {
  compact?: boolean
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeOption["id"]>("quantum")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "quantum" || stored === "aurora" || stored === "solar") {
      setTheme(stored)
      document.documentElement.setAttribute("data-theme", stored)
    } else {
      document.documentElement.setAttribute("data-theme", "quantum")
    }
  }, [])

  const handleTheme = (nextTheme: ThemeOption["id"]) => {
    setTheme(nextTheme)
    document.documentElement.setAttribute("data-theme", nextTheme)
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
  }

  if (compact) {
    return (
      <div className="theme-toggle px-3 py-2 rounded-full flex items-center gap-2">
        {THEMES.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleTheme(option.id)}
            className={`theme-chip px-2.5 py-1.5 rounded-full text-xs flex items-center gap-2 ${
              theme === option.id ? "active" : ""
            }`}
            title={option.label}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: option.preview,
                boxShadow: theme === option.id ? "0 0 10px rgba(0,0,0,0.25)" : undefined,
              }}
            />
            {option.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="theme-toggle section-block p-4 rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Theme Control</p>
          <h3 className="text-xl font-semibold">Dynamic Palette</h3>
          <p className="text-gray-400 text-sm mt-1">
            Switch the signal colors across the entire portfolio.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {THEMES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleTheme(option.id)}
              className={`theme-chip px-3 py-2 rounded-xl text-sm flex items-center gap-2 ${
                theme === option.id ? "active" : ""
              }`}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: option.preview,
                }}
              />
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
