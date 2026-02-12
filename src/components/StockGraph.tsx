import { useEffect, useMemo, useRef, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type StockPoint = {
  time: string
  value: number
  signal: number
}

type StockGraphProps = {
  seed?: number
  height?: number
  showInsight?: boolean
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

function formatLabel(index: number) {
  const baseHour = 9
  const hour = (baseHour + (index % 8)) % 24
  return `${hour.toString().padStart(2, "0")}:00`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function buildSeries(seed: number, length: number) {
  const rng = mulberry32(seed)
  const data: StockPoint[] = []
  let value = 40 + rng() * 20
  for (let i = 0; i < length; i += 1) {
    const drift = (rng() - 0.45) * 10
    const wave = Math.sin(i * 0.6) * 3
    value = clamp(value + drift + wave, 18, 96)
    const signal = clamp(value + (rng() - 0.5) * 10, 12, 98)
    data.push({ time: formatLabel(i), value, signal })
  }
  return data
}

function computeInsight(data: StockPoint[]) {
  const first = data[0]?.value ?? 0
  const last = data[data.length - 1]?.value ?? 0
  const change = last - first
  const trend =
    change > 6 ? "Momentum rising" : change < -6 ? "Momentum cooling" : "Steady drift"

  const avg = data.reduce((sum, point) => sum + point.value, 0) / data.length
  const variance =
    data.reduce((sum, point) => sum + Math.pow(point.value - avg, 2), 0) / data.length
  const volatilityScore = Math.sqrt(variance)
  const volatility =
    volatilityScore < 3.5 ? "low" : volatilityScore < 6.5 ? "medium" : "high"

  const peak = data.reduce((best, point) => (point.value > best.value ? point : best), data[0])

  return {
    trend,
    volatility,
    peakLabel: peak?.time ?? "N/A",
    delta: change,
  }
}

export default function StockGraph({ seed = 42, height = 180, showInsight = true, pulse = 0 }: StockGraphProps) {
  const [data, setData] = useState<StockPoint[]>(() => buildSeries(seed, 10))
  const rngRef = useRef(mulberry32(seed))
  const indexRef = useRef(10)
  const pulseRef = useRef(pulse)

  useEffect(() => {
    rngRef.current = mulberry32(seed)
    indexRef.current = data.length
  }, [seed])

  useEffect(() => {
    pulseRef.current = pulse
  }, [pulse])

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const rng = rngRef.current
        const last = prev[prev.length - 1]?.value ?? 50
        const drift = (rng() - 0.45) * 10
        const wave = Math.sin(indexRef.current * 0.6) * 3
        const pulseBoost = pulseRef.current * 6
        const nextValue = clamp(last + drift + wave + pulseBoost, 18, 96)
        const nextSignal = clamp(nextValue + (rng() - 0.5) * 10 + pulseBoost, 12, 98)
        const nextPoint: StockPoint = {
          time: formatLabel(indexRef.current),
          value: nextValue,
          signal: nextSignal,
        }
        indexRef.current += 1
        return [...prev.slice(1), nextPoint]
      })
    }, 2600)
    return () => clearInterval(id)
  }, [])

  const insight = useMemo(() => computeInsight(data), [data])
  const glow = 0.2 + pulse * 0.25
  const tail = 0.03 + pulse * 0.08

  return (
    <div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -10, right: 12, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={glow} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={tail} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1c263d" strokeDasharray="4 6" />
            <XAxis dataKey="time" stroke="#7e8aa5" tick={{ fontSize: 10 }} />
            <YAxis stroke="#7e8aa5" tick={{ fontSize: 10 }} domain={[10, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f1628", border: "none" }}
              labelStyle={{ color: "var(--accent)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--accent)"
              strokeWidth={2.5 + pulse * 1.6}
              fill="url(#pulseFill)"
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive
              animationDuration={800}
            />
            <Line
              type="monotone"
              dataKey="signal"
              stroke="var(--accent-2)"
              strokeWidth={1.8 + pulse * 1.4}
              strokeDasharray="6 6"
              dot={false}
              isAnimationActive
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {showInsight && (
        <p className="text-sm text-gray-400 mt-3">
          Insight: {insight.trend} • Volatility {insight.volatility} • Peak {insight.peakLabel} • Delta{" "}
          {insight.delta >= 0 ? "+" : ""}
          {insight.delta.toFixed(1)} • Game boost {Math.round(pulse * 100)}%
        </p>
      )}
      <p className="text-xs text-gray-500 mt-2">
        Mini: Trend line with a live signal overlay.
      </p>
    </div>
  )
}
