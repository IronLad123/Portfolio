import { useEffect, useMemo, useRef, useState } from "react"
import {
  Area,
  Bar,
  ComposedChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type Point = { time: string; volume: number; trend: number }

type ComposedPulseProps = {
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

function formatLabel(index: number) {
  const baseHour = 9
  const hour = (baseHour + (index % 8)) % 24
  return `${hour.toString().padStart(2, "0")}:00`
}

function buildData(seed: number) {
  const rng = mulberry32(seed)
  const data: Point[] = []
  let trend = 50 + rng() * 10
  for (let i = 0; i < 8; i += 1) {
    trend = clamp(trend + (rng() - 0.45) * 6, 30, 85)
    data.push({
      time: formatLabel(i),
      trend,
      volume: clamp(20 + rng() * 60, 15, 90),
    })
  }
  return data
}

export default function ComposedPulse({ seed = 27, pulse = 0 }: ComposedPulseProps) {
  const [data, setData] = useState<Point[]>(() => buildData(seed))
  const pulseRef = useRef(pulse)

  useEffect(() => {
    pulseRef.current = pulse
  }, [pulse])

  useEffect(() => {
    const rng = mulberry32(seed)
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1)
        const lastTrend = prev[prev.length - 1]?.trend ?? 50
        const nextTrend = clamp(lastTrend + (rng() - 0.45) * 6 + pulseRef.current * 5, 30, 85)
        next.push({
          time: formatLabel(prev.length + 1),
          trend: nextTrend,
          volume: clamp(20 + rng() * 60 + pulseRef.current * 8, 15, 90),
        })
        return next
      })
    }, 2800)
    return () => clearInterval(id)
  }, [seed])

  const insight = useMemo(() => {
    const last = data[data.length - 1]
    return last?.trend && last?.volume ? `Trend ${last.trend.toFixed(0)} • Volume ${last.volume.toFixed(0)}` : "N/A"
  }, [data])

  return (
    <div className="surface-card p-6 rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Signal Mix</p>
          <h3 className="text-xl font-semibold">Response Activity</h3>
          <p className="text-gray-400 text-sm mt-1">Trend line with volume bars.</p>
        </div>
        <span className="chip text-xs px-2 py-1 rounded-full">Live demo</span>
      </div>

      <div className="h-44 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid stroke="#1c263d" strokeDasharray="4 6" />
            <XAxis dataKey="time" stroke="#7e8aa5" tick={{ fontSize: 10 }} />
            <YAxis stroke="#7e8aa5" tick={{ fontSize: 10 }} domain={[10, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f1628", border: "none" }}
              labelStyle={{ color: "var(--accent)" }}
            />
            <Area
              type="monotone"
              dataKey="trend"
              stroke="var(--accent)"
              fill="var(--accent)"
              fillOpacity={0.15 + pulse * 0.2}
            />
            <Bar dataKey="volume" barSize={18} fill="var(--accent-2)" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="trend" stroke="var(--accent)" dot={false} strokeWidth={2.5 + pulse * 1.4} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-400 mt-3">Insight: {insight} • Boost {Math.round(pulse * 100)}%</p>
      <p className="text-xs text-gray-500 mt-2">
        Mini: Trend line with volume bars for activity.
      </p>
    </div>
  )
}
