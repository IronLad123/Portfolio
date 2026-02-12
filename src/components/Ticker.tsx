export default function Ticker() {
  const items = [
    "Python ▲",
    "Machine Learning ▲",
    "TensorFlow ▲",
    "Data Analytics ▲",
    "AI Systems ▲",
    "NLP ▲",
    "Computer Vision ▲",
  ]

  return (
    <div className="fixed bottom-0 w-full surface-soft border-t border-white/10 overflow-hidden">
      <div className="whitespace-nowrap animate-scroll text-sm py-2 text-[#00ff88]">
        {items.concat(items).map((item, index) => (
          <span key={index} className="mx-6">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
