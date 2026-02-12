import { motion } from "framer-motion"
import BarPulse from "../components/BarPulse"
import SpeedSum from "../components/SpeedSum"
import usePulse from "../hooks/usePulse"

export default function About() {
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
        Profile
      </motion.h1>
      <p className="subheading text-sm mt-2">Skills & Background</p>

      <p className="subtitle">
        Data Science student at VIT Chennai building ML systems that work in real life.
        I lead with data, move fast in deep focus, and ship clean results you can trust.
      </p>

      <div className="section-block grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarPulse seed={12} pulse={pulse} />
        <SpeedSum onSignal={boost} />
      </div>

      <div className="section-block grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="surface-card p-6 rounded-xl">
          <h2 className="subheading text-sm mb-3">Education</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <p className="font-semibold">VIT Chennai</p>
              <p className="text-gray-400 text-sm">B.Tech CSE (Data Science)</p>
              <p className="text-[#00ff88]">CGPA: 9.00</p>
            </div>
            <div>
              <p className="font-semibold">ISC - Class XII</p>
              <p className="text-[#00ff88]">91.6%</p>
            </div>
            <div>
              <p className="font-semibold">ICSE - Class X</p>
              <p className="text-[#00ff88]">90.33%</p>
            </div>
          </div>
        </div>
        <div className="surface-card p-6 rounded-xl">
          <h2 className="subheading text-sm mb-3">Soft Skills</h2>
          <ul className="space-y-2 text-gray-300">
            <li>Clear communication</li>
            <li>Team collaboration</li>
            <li>Problem solving</li>
            <li>Presentation & storytelling</li>
            <li>Time management</li>
          </ul>
        </div>
      </div>

      <div className="section-block surface-card p-6 rounded-xl">
        <h2 className="subheading text-sm mb-4">Awards & Certifications</h2>
        <div className="cert-grid">
          <a
            href="/certificates/vegathon-certificate.jpeg"
            target="_blank"
            rel="noreferrer"
            className="cert-card"
          >
            <img
              src="/certificates/vegathon-certificate.jpeg"
              alt="24-Hour Vegathon certificate"
              className="cert-thumb"
            />
            <p className="mt-3 text-sm text-gray-300">
              24-Hour Vegathon - Vega Processors & Ecosystem
            </p>
            <p className="text-xs text-gray-500 mt-1">Oct 2024</p>
          </a>
          <a
            href="/certificates/vega-workshop-certificate.jpeg"
            target="_blank"
            rel="noreferrer"
            className="cert-card"
          >
            <img
              src="/certificates/vega-workshop-certificate.jpeg"
              alt="Vega Processors workshop certificate"
              className="cert-thumb"
            />
            <p className="mt-3 text-sm text-gray-300">
              Hands-on Workshop on Vega Processors & Ecosystem
            </p>
            <p className="text-xs text-gray-500 mt-1">Sep 2024</p>
          </a>
          <a
            href="/certificates/kaggle-intro-ml.png"
            target="_blank"
            rel="noreferrer"
            className="cert-card"
          >
            <img
              src="/certificates/kaggle-intro-ml.png"
              alt="Kaggle Intro to Machine Learning certificate"
              className="cert-thumb"
            />
            <p className="mt-3 text-sm text-gray-300">
              Kaggle Learn - Intro to Machine Learning
            </p>
            <p className="text-xs text-gray-500 mt-1">Sep 2025</p>
          </a>
          <a
            href="/certificates/ai-impact-summit-2026.jpg"
            target="_blank"
            rel="noreferrer"
            className="cert-card"
          >
            <img
              src="/certificates/ai-impact-summit-2026.jpg"
              alt="AI Impact Summit certificate"
              className="cert-thumb"
            />
            <p className="mt-3 text-sm text-gray-300">
              AI Impact Summit 2026 - Mission Upskill India Pre-Summit
            </p>
            <p className="text-xs text-gray-500 mt-1">Jan 2026</p>
          </a>
          <a
            href="/certificates/codezilla.pdf"
            target="_blank"
            rel="noreferrer"
            className="cert-card"
          >
            <div className="cert-thumb-pdf">PDF</div>
            <p className="mt-3 text-sm text-gray-300">CODEZILLA Hack-A-Thon</p>
            <p className="text-xs text-gray-500 mt-1">Aug 2024</p>
          </a>
          <a
            href="/certificates/hackstar-workshop.pdf"
            target="_blank"
            rel="noreferrer"
            className="cert-card"
          >
            <div className="cert-thumb-pdf">PDF</div>
            <p className="mt-3 text-sm text-gray-300">HACKSTAR Workshop - ACM-W</p>
            <p className="text-xs text-gray-500 mt-1">Sep 2025</p>
          </a>
        </div>
      </div>

    </motion.div>

  )
}
