import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import ClickSprint from "../components/ClickSprint"
import StockGraph from "../components/StockGraph"
import usePulse from "../hooks/usePulse"

export default function Home() {
  const { pulse, boost } = usePulse()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="page-shell text-left"
    >
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-[#00ff88]"
          >
            Om Srivastava
          </motion.h1>
          <p className="subheading text-sm mt-2">Data Science & AI</p>

          <p className="subtitle">
            ML + analytics systems for real-world impact.
          </p>

          <p className="text-gray-300 mt-3 text-lg max-w-3xl">
            Data Science student building ML and analytics systems with a focus on
            real-world impact. Open to ML internships and research collaborations.
          </p>

          <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mt-5">
            What I Do
          </p>
          <p className="text-gray-300 mt-2 max-w-2xl">
            I build ML systems and interactive tools that turn data into decisions.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Pill label="Machine Learning" />
            <Pill label="Computer Vision" />
            <Pill label="Data Systems" />
            <Pill label="Analytics" />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="/resume.pdf"
              className="btn-primary px-4 py-2 rounded-md transition"
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
            <a
              href="mailto:srivastavaom078@gmail.com"
              className="btn-ghost px-4 py-2 rounded-md transition"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/om-srivastava-6717b7277/"
              className="btn-ghost px-4 py-2 rounded-md transition"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <p className="text-gray-400 mt-6 text-lg">
            <span className="text-[#00ff88]">$ </span>
            <Typewriter
              words={[
                "Initializing AI Models...",
                "Running Predictive Analytics...",
                "Deploying Machine Learning Systems...",
                "Analyzing Market Sentiment...",
              ]}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1500}
            />
          </p>
        </div>

        <div className="surface-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#00ff88] text-sm uppercase tracking-widest">Live Signal</p>
              <p className="text-gray-400 text-sm">Synthetic market feed (demo)</p>
            </div>
            <span className="chip text-xs px-2 py-1 rounded-full">
              Realtime
            </span>
          </div>

          <div className="mt-4">
            <StockGraph seed={101} height={220} pulse={pulse} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <MetricCard label="CGPA" value="9.00" />
            <MetricCard label="Projects" value="9" />
            <MetricCard label="Focus Areas" value="ML / CV / Systems" />
            <MetricCard label="Research" value="1" />
          </div>

          <div className="mt-6">
            <ClickSprint onSignal={boost} />
          </div>
        </div>
      </div>

      <div className="section-block">
        <h2 className="subheading text-sm mb-2">Skills Snapshot</h2>
        <h3 className="text-xl text-[#00ff88] mb-4">Core Skills</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="subheading text-xs mb-3">Languages</h4>
            <div className="surface-soft border border-white/10 rounded-xl p-5 text-gray-300 space-y-2">
              <p>Python</p>
              <p>Java</p>
              <p>C++</p>
              <p>SQL</p>
              <p>R</p>
            </div>
          </div>
          <div>
            <h4 className="subheading text-xs mb-3">Tools</h4>
            <div className="surface-soft border border-white/10 rounded-xl p-5 text-gray-300 space-y-2">
              <p>Pandas, NumPy</p>
              <p>Tableau</p>
              <p>JMP</p>
              <p>WEKA</p>
              <p>Git, GitHub</p>
            </div>
          </div>
          <div>
            <h4 className="subheading text-xs mb-3">ML / AI</h4>
            <div className="surface-soft border border-white/10 rounded-xl p-5 text-gray-300 space-y-2">
              <p>Scikit-learn, TensorFlow, Keras</p>
              <p>Predictive Modeling</p>
              <p>NLP</p>
              <p>Computer Vision</p>
              <p>Model Evaluation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="surface-card section-block p-6 rounded-xl">
        <h2 className="subheading text-sm mb-2">Quick Contact</h2>
        <h3 className="text-xl text-[#00ff88] mb-4">Get in touch</h3>
        <p>Email: srivastavaom078@gmail.com</p>
        <p className="mt-2">
          GitHub:
          <a
            href="https://github.com/IronLad123"
            className="link-accent ml-2"
            target="_blank"
            rel="noreferrer"
          >
            IronLad123
          </a>
        </p>
        <p className="mt-2">
          LinkedIn:
          <a
            href="https://www.linkedin.com/in/om-srivastava-6717b7277/"
            className="link-accent ml-2"
            target="_blank"
            rel="noreferrer"
          >
            om-srivastava
          </a>
        </p>
      </div>
    </motion.div>

  )
}

function Pill({ label }: { label: string }) {
  return (
    <span className="surface-soft border border-white/10 px-3 py-1 text-xs rounded-full text-gray-300">
      {label}
    </span>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-soft border border-white/10 p-4 rounded-xl">
      <p className="text-gray-400 text-xs uppercase tracking-wide">{label}</p>
      <h3 className="text-[#00ff88] text-lg font-semibold mt-1">{value}</h3>
    </div>
  )
}
