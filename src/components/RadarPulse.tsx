import { useEffect, useMemo, useRef, useState } from "react"
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

type RadarPoint = { metric: string; value: number }

type RadarPulseProps = {
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function buildData(seed: number) {
  const rng = mulberry32(seed)
  const metrics = ["Accuracy", "Latency", "Scale", "Robust", "Explain"]
  return metrics.map((metric) => ({
    metric,
    value: clamp(45 + rng() * 45, 35, 95),
  }))
}

export default function RadarPulse({ seed = 19, pulse = 0 }: RadarPulseProps) {
  const [data, setData] = useState<RadarPoint[]>(() => buildData(seed))
  const pulseRef = useRef(pulse)

  useEffect(() => {
    pulseRef.current = pulse
  }, [pulse])

  useEffect(() => {
    const rng = mulberry32(seed)
    const id = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          value: clamp(item.value + (rng() - 0.45) * 8 + pulseRef.current * 5, 35, 95),
        }))
      )
    }, 2800)
    return () => clearInterval(id)
  }, [seed])

  const insight = useMemo(() => {
    const top = data.reduce((best, item) => (item.value > best.value ? item : best), data[0])
    return top?.metric ?? "N/A"
  }, [data])

  return (
    <div className="surface-card p-6 rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Signal Radar</p>
          <h3 className="text-xl font-semibold">Research Strength Map</h3>
          <p className="text-gray-400 text-sm mt-1">Balance across core research axes.</p>
        </div>
        <span className="chip text-xs px-2 py-1 rounded-full">Live demo</span>
      </div>

      <div className="h-44 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#1c263d" />
            <PolarAngleAxis dataKey="metric" stroke="#7e8aa5" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f1628", border: "none" }}
              labelStyle={{ color: "var(--accent)" }}
            />
            <Radar
              dataKey="value"
              stroke="var(--accent)"
              fill="var(--accent)"
              fillOpacity={0.2 + pulse * 0.25}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-400 mt-3">
        Insight: Strongest axis {insight} • Boost {Math.round(pulse * 100)}%
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Mini: Radar maps balance across research strengths.
      </p>
    </div>
  )
}
