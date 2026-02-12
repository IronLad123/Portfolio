import { useEffect, useMemo, useRef, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type BarPoint = { name: string; value: number }

type BarPulseProps = {
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
  const labels = ["Model", "Data", "Vision", "System", "Deploy"]
  return labels.map((name) => ({
    name,
    value: clamp(40 + rng() * 50, 30, 95),
  }))
}

export default function BarPulse({ seed = 7, pulse = 0 }: BarPulseProps) {
  const [data, setData] = useState<BarPoint[]>(() => buildData(seed))
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
          value: clamp(item.value + (rng() - 0.45) * 12 + pulseRef.current * 6, 30, 95),
        }))
      )
    }, 2600)
    return () => clearInterval(id)
  }, [seed])

  const insight = useMemo(() => {
    const top = data.reduce((best, item) => (item.value > best.value ? item : best), data[0])
    const avg = data.reduce((sum, item) => sum + item.value, 0) / data.length
    return {
      top: top?.name ?? "N/A",
      avg: avg.toFixed(0),
    }
  }, [data])

  return (
    <div className="surface-card p-6 rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Signal Bars</p>
          <h3 className="text-xl font-semibold">Skills Focus Mix</h3>
          <p className="text-gray-400 text-sm mt-1">Dynamic view of skill energy.</p>
        </div>
        <span className="chip text-xs px-2 py-1 rounded-full">Live demo</span>
      </div>

      <div className="h-44 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#1c263d" strokeDasharray="4 6" />
            <XAxis dataKey="name" stroke="#7e8aa5" tick={{ fontSize: 10 }} />
            <YAxis stroke="#7e8aa5" tick={{ fontSize: 10 }} domain={[20, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f1628", border: "none" }}
              labelStyle={{ color: "var(--accent)" }}
            />
            <Bar dataKey="value" fill="var(--accent)" fillOpacity={0.55 + pulse * 0.35} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-400 mt-3">
        Insight: Top focus {insight.top} • Avg intensity {insight.avg} • Boost {Math.round(pulse * 100)}%
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Mini: Bars compare where the focus is strongest.
      </p>
    </div>
  )
}
