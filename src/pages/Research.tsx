import { motion } from "framer-motion"
import RadarPulse from "../components/RadarPulse"
import WordScramble from "../components/WordScramble"
import usePulse from "../hooks/usePulse"

export default function Research() {
  const { pulse, boost } = usePulse()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="page-shell"
    >


      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#00ff88]"
      >
        R&D Division
      </motion.h1>
      <p className="subheading text-sm mt-2">Research & Prototypes</p>

      <p className="subtitle">
        Research prototype and patent-focused exploration in AI sensing systems.
      </p>

      <div className="section-block grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RadarPulse seed={34} pulse={pulse} />
        <WordScramble onSignal={boost} />
      </div>

      <div className="surface-card section-block p-8 rounded-xl hover:border-[#00ff88] transition duration-300">
        <h2 className="subheading text-sm mb-2">Featured Work</h2>
        <h3 className="text-2xl font-semibold">
          AI-Driven Bio-Spectral Holography System
        </h3>

        <p className="text-[#00c8ff] mt-3">
          Research Proposal Submitted for Patent Filing
        </p>

        <p className="text-gray-400 mt-6 leading-relaxed">
          Designed a multi-layered AI architecture integrating spectral scanning,
          biochemical detection, and autonomous drone deployment for advanced
          dead body detection in CSSR operations.
        </p>

        <ul className="mt-6 space-y-3 text-gray-300 list-disc list-inside">
          <li>Designed full system architecture (Sensor to AI to Visualization to Execution)</li>
          <li>Developed AI-based molecular recognition framework</li>
          <li>Structured multi-spectrum spectral fusion logic</li>
          <li>Conducted novelty research (IEEE, arXiv, MDPI)</li>
          <li>Drafted technical documentation and performance analysis</li>
        </ul>

        <div className="mt-6 border-t border-white/10 pt-4 text-gray-400">
          Availability: <span className="text-gray-500">Private</span>
        </div>
      </div>

    </motion.div>

  )
}
