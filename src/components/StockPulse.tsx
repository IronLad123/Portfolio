import StockGraph from "./StockGraph"

type StockPulseProps = {
  title: string
  subtitle: string
  seed?: number
}

export default function StockPulse({ title, subtitle, seed = 42 }: StockPulseProps) {
  return (
    <div className="surface-card section-block p-6 rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="subheading text-xs mb-2">Stock Pulse</p>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>
        <span className="chip text-xs px-2 py-1 rounded-full">Live demo</span>
      </div>

      <div className="mt-4">
        <StockGraph seed={seed} height={160} />
      </div>
    </div>
  )
}
