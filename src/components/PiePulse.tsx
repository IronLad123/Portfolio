import { useEffect, useMemo, useRef, useState } from "react"

type PiePoint = { name: string; value: number }

type PiePulseProps = {
  seed?: number
  pulse?: number
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function normalize(values: number[], minValue = 6) {
  const clamped = values.map((value) => Math.max(minValue, value))
  const total = clamped.reduce((sum, value) => sum + value, 0) || 1
  const raw = clamped.map((value) => (value / total) * 100)
  const base = raw.map((value) => Math.floor(value))
  let remainder = 100 - base.reduce((sum, value) => sum + value, 0)

  const order = raw
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac)

  let i = 0
  while (remainder > 0 && order.length > 0) {
    base[order[i % order.length].index] += 1
    remainder -= 1
    i += 1
  }

  return base
}

export default function PiePulse({ seed = 15, pulse = 0 }: PiePulseProps) {
  const [data, setData] = useState<PiePoint[]>([
    { name: "Build", value: 40 },
    { name: "Research", value: 25 },
    { name: "Refine", value: 20 },
    { name: "Ship", value: 15 },
  ])
  const [colors, setColors] = useState<string[]>(["#22f0a8", "#4cc2ff", "#8b6bff", "#f9b35f"])
  const pulseRef = useRef(pulse)

  useEffect(() => {
    pulseRef.current = pulse
  }, [pulse])

  useEffect(() => {
    const root = document.documentElement
    const readColors = () => {
      const styles = getComputedStyle(root)
      const accent = styles.getPropertyValue("--accent").trim() || "#22f0a8"
      const accent2 = styles.getPropertyValue("--accent-2").trim() || "#4cc2ff"
      const accent3 = styles.getPropertyValue("--accent-3").trim() || "#8b6bff"
      const accent4 = styles.getPropertyValue("--accent-4").trim() || "#f9b35f"
      setColors([accent, accent2, accent3, accent4])
    }
    readColors()
    const observer = new MutationObserver(readColors)
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const rng = mulberry32(seed)
    const id = window.setInterval(() => {
      setData((prev) => {
        const values = prev.map((item, index) => {
          const boost = index === 0 ? pulseRef.current * 8 : 0
          return item.value + (rng() - 0.5) * 6 + boost
        })
        const normalized = normalize(values)
        return prev.map((item, index) => ({
          ...item,
          value: normalized[index],
        }))
      })
    }, 3000)
    return () => window.clearInterval(id)
  }, [seed])

  const insight = useMemo(() => {
    const top = data.reduce((best, item) => (item.value > best.value ? item : best), data[0])
    return `${top?.name ?? "Build"} ${top?.value ?? 0}%`
  }, [data])

  const radius = 54 + pulse * 10
  const strokeWidth = 18 + pulse * 4
  const size = 160
  const center = size / 2
  const circumference = 2 * Math.PI * radius

  const segments = useMemo(() => {
    let offset = 0
    return data.map((item, index) => {
      const length = (item.value / 100) * circumference
      const segment = {
        ...item,
        length,
        offset,
        color: colors[index % colors.length],
      }
      offset += length
      return segment
    })
  }, [data, colors, circumference])

  return (
    <div className="surface-card p-6 rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Signal Pie</p>
          <h3 className="text-xl font-semibold">Project Focus Split</h3>
          <p className="text-gray-400 text-sm mt-1">Where the build energy goes.</p>
        </div>
        <span className="chip text-xs px-2 py-1 rounded-full">Live demo</span>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
          />
          <g transform={`rotate(-90 ${center} ${center})`}>
            {segments.map((segment) => (
              <circle
                key={segment.name}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segment.length} ${circumference - segment.length}`}
                strokeDashoffset={-segment.offset}
                strokeLinecap="round"
                style={{
                  transition:
                    "stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease, stroke-width 0.6s ease",
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: colors[index % colors.length],
              }}
            />
            {item.name}: {item.value}%
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-3">
        Insight: Lead focus {insight} • Boost {Math.round(pulse * 100)}%
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Mini: Pie shows the split across key project stages.
      </p>
    </div>
  )
}
