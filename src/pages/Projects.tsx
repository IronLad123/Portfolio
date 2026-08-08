import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Sparkles, Filter } from "lucide-react"
import PiePulse from "../components/PiePulse"
import ReactionTimer from "../components/ReactionTimer"
import usePulse from "../hooks/usePulse"

interface ProjectItem {
  name: string
  performance: string
  tech: string
  summary: string
  problem: string
  role: string
  result: string
  repo: string
  demo: string
  category: "Featured" | "AI & Health" | "Finance & Web" | "Systems & Vision"
  highlight?: boolean
}

const projects: ProjectItem[] = [
  {
    name: "Nova Finance Dashboard",
    performance: "Enterprise Finance & ERP Analytics Suite",
    tech: "React 19 | Vite 7 | Recharts | SheetJS | TailwindCSS",
    summary: "Full-scale corporate financial analytics suite supporting multi-sheet Excel workbooks, Tally Prime direct integration, GST tax reconciliation, and cash-flow runways.",
    problem: "Indian SMEs and finance teams need fast, privacy-preserving visual analytics without uploading confidential financial data to third-party cloud servers.",
    role: "Architected the standalone Vite web bundle, 1-click live demo dataset generator, interactive Recharts dashboard, and client-side SheetJS parser.",
    result: "Instant browser analytics with zero cloud latency, full GST audit reports, and responsive financial KPI summaries.",
    repo: "https://github.com/IronLad123/nova-dashboard",
    demo: "https://ironlad123.github.io/nova-dashboard/",
    category: "Featured",
    highlight: true,
  },
  {
    name: "HeartGuard AI",
    performance: "Clinical Heart Disease Risk Classifier (88.5% Accuracy)",
    tech: "Python | Streamlit | Scikit-learn | Random Forest | TreeSHAP",
    summary: "AI-powered cardiovascular risk assessment suite utilizing machine learning ensembles and TreeSHAP explainability to quantify patient risk across 13 clinical biomarkers.",
    problem: "Clinicians require interpretable risk scores that explain exactly which physiological factors (cholesterol, ST depression, fluoroscopy vessels) drove the prediction.",
    role: "Trained and tuned classification models, implemented TreeSHAP feature attribution, and designed the clinical risk dashboard.",
    result: "Deployed clinical suite delivering 88.5% test accuracy with instant patient risk factor breakdowns.",
    repo: "https://github.com/IronLad123/heart-disease-prediction-app",
    demo: "https://omheart-disease-prediction-app-c9c95zynkbx7ott7vvtmdum.streamlit.app",
    category: "AI & Health",
    highlight: true,
  },
  {
    name: "KeyFlux Typing Engine",
    performance: "Hardware-Accelerated Typing Analytics Platform",
    tech: "Vanilla JavaScript | HTML5 Canvas | Web Audio API | CSS3",
    summary: "Zero-latency, hardware-accelerated typing speed platform featuring dynamic caret alignment, sub-millisecond mechanical audio feedback, and weakness heatmaps.",
    problem: "Web-based typing tools suffer from DOM layout thrashing and imprecise caret tracking during high-speed typing runs.",
    role: "Engineered sub-millisecond audio synthesizer, viewport getBoundingClientRect caret tracker, and theme engine.",
    result: "Fluid 60 FPS typing experience with instant WPM telemetry and zero layout shift.",
    repo: "https://github.com/IronLad123/typing-test",
    demo: "https://ironlad123.github.io/typing-test/",
    category: "Finance & Web",
    highlight: true,
  },
  {
    name: "Stock Analyzer Platform",
    performance: "Market Intelligence & Technical Indicator Suite",
    tech: "HTML5 | Chart.js | Python | NewsAPI | McClellan Oscillator",
    summary: "Interactive financial terminal calculating market breadth, sentiment analysis, and technical trend lines for Nifty50 and equities.",
    problem: "Retail traders need unified technical momentum indicators alongside real-time news sentiment without bloated desktop software.",
    role: "Built automated data ingestion pipelines, McClellan Oscillator formulas, and interactive Chart.js visualizations.",
    result: "High-speed market terminal delivering actionable momentum signals and historical chart overlays.",
    repo: "https://github.com/IronLad123/Stock_Analyzer",
    demo: "https://ironlad123.github.io/Stock_Analyzer/",
    category: "Finance & Web",
    highlight: true,
  },
  {
    name: "CryptoMed Patient Portal",
    performance: "Zero-Knowledge Encrypted Health Record Gateway",
    tech: "WebCrypto API | RSA-OAEP | In-Memory QR Decoding | Flask",
    summary: "Client-side cryptographic healthcare portal enabling doctors and patients to encrypt and decrypt sensitive diagnostic records directly in the browser.",
    problem: "Cloud EHR breaches expose unencrypted patient health data to unauthorized access and third-party leaks.",
    role: "Implemented WebCrypto RSA key generation, in-memory QR code decoder, and absolute key resolution.",
    result: "End-to-end encrypted medical sharing system where records never touch the server in plaintext.",
    repo: "https://github.com/IronLad123/crypto-med-app",
    demo: "https://ironlad123.github.io/crypto-med-app/",
    category: "AI & Health",
    highlight: true,
  },
  {
    name: "Autonomous R&D Pipeline",
    performance: "Multi-Agent Open-Source Contribution Engine",
    tech: "Python | GitHub API | Multi-Agent Orchestration | Pytest",
    summary: "Autonomous multi-agent system executing candidate issue discovery, isolated workspace reproduction, AST analysis, and quality-certified PR submission.",
    problem: "Manual open-source triage across large ecosystems is time-consuming and prone to untested PR rejections.",
    role: "Designed ActorAgent execution loop, AST patch generator, CI diagnostics tracker, and regression test guards.",
    result: "Automated pipeline operating 30-minute contribution cycles with 100% test-verified pull request generation.",
    repo: "https://github.com/IronLad123/github-agent-pipeline",
    demo: "",
    category: "Systems & Vision",
    highlight: true,
  },
  {
    name: "Neural Compression Ops Console",
    performance: "Mars Rover Downlink Telemetry & QA Console",
    tech: "Python | PyTorch | FastAPI | React | Vite",
    summary: "Scientific console for neural image compression evaluation featuring Pareto rate-distortion curves and automated artifact anomaly detection.",
    problem: "Evaluating deep learned compression models on extreme bandwidth satellite channels requires granular distortion metrics (PSNR, MS-SSIM).",
    role: "Designed the telemetry dashboard, Pareto analysis graphs, and FastAPI inference backend.",
    result: "Operational QA console supporting scientific compression benchmarking on planetary rover imagery.",
    repo: "https://github.com/IronLad123/neural-compression.git",
    demo: "",
    category: "Systems & Vision",
  },
  {
    name: "AetherInk Gesture Studio",
    performance: "Touchless Vision-Based Drawing Canvas",
    tech: "Python | OpenCV | MediaPipe | NumPy",
    summary: "Touchless air-drawing studio translating hand landmarks into smooth digital strokes with dynamic gesture recognition for brush selection and clearing.",
    problem: "Touchless interactive displays require low-latency spatial smoothing to prevent jittery stroke rendering.",
    role: "Implemented MediaPipe landmark detection, Kalman-style coordinate smoothing, and interactive color palettes.",
    result: "Natural, responsive air-canvas interface operating at 30+ FPS on standard webcams.",
    repo: "https://github.com/IronLad123/Aetherink",
    demo: "",
    category: "Systems & Vision",
  },
  {
    name: "Nova Shell",
    performance: "Industry-Standard POSIX Command Shell",
    tech: "C | POSIX Systems Programming | Linux",
    summary: "Lightweight Unix shell featuring custom built-in command handlers (`cd`, `pwd`, `help`), environment variable expansion, and IO redirection.",
    problem: "Understanding operating system process lifecycles, file descriptors, and fork/exec semantics hands-on.",
    role: "Built parser tokenizer, job control, pipeline plumbing, and safety signal handlers.",
    result: "Robust, standards-compliant command shell executing system binaries and nested redirection.",
    repo: "https://github.com/IronLad123/nova-shell",
    demo: "",
    category: "Systems & Vision",
  },
  {
    name: "Waste Classification CNN",
    performance: "Automated Environmental Waste Classifier",
    tech: "TensorFlow | Keras | Python | Computer Vision",
    summary: "Deep convolutional neural network trained on multi-class waste image datasets to automate recycling facility sorting.",
    problem: "Manual waste sorting is inefficient and error-prone in municipal recycling pipelines.",
    role: "Curated training datasets, designed CNN architecture with dropout regularizers, and evaluated confusion matrices.",
    result: "High-confidence image classifier categorizing recyclable, organic, and hazardous waste items.",
    repo: "https://github.com/IronLad123/waste-classification-cnn",
    demo: "",
    category: "Systems & Vision",
  },
]

const CATEGORIES = ["All", "Featured", "AI & Health", "Finance & Web", "Systems & Vision"] as const

export default function Projects() {
  const { pulse, boost } = usePulse()
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory || (selectedCategory === "Featured" && p.highlight))

  return (
    <div className="page-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#00ff88]">
              Projects & Engineering
            </h1>
            <p className="subheading text-sm mt-2">
              Full-Stack ML Systems, Financial Analytics, and Autonomous Engines
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#00ff88] bg-[#00ff88]/10 px-3 py-1.5 rounded-full border border-[#00ff88]/30">
            <Sparkles size={14} />
            <span>6 Live Production Deployments</span>
          </div>
        </div>

        <p className="subtitle mt-3 max-w-3xl">
          Engineered for real-world impact. Every project below is backed by public source code, verified test suites, and live interactive web demos.
        </p>
      </motion.div>

      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-gray-500 mr-2 flex items-center gap-1">
          <Filter size={12} /> Filter:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
              selectedCategory === cat
                ? "bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.4)]"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="section-block grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <PiePulse seed={23} pulse={pulse} />
        <ReactionTimer onSignal={boost} />
      </div>

      <div className="section-block grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.015 }}
            className="surface-card p-7 rounded-2xl flex flex-col justify-between hover:border-[#00ff88] hover:shadow-[0_0_25px_rgba(0,255,136,0.2)] transition duration-300 relative overflow-hidden group"
          >
            {project.highlight && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#00ff88]/20 to-transparent px-4 py-1 text-[10px] uppercase font-bold text-[#00ff88] tracking-widest rounded-bl-xl border-l border-b border-[#00ff88]/30">
                ⭐ Featured
              </div>
            )}

            <div>
              <div className="flex items-start justify-between gap-4 pr-16">
                <h2 className="text-2xl font-bold text-white group-hover:text-[#00ff88] transition">
                  {project.name}
                </h2>
              </div>

              <p className="text-xs font-semibold text-[#00c8ff] uppercase tracking-wider mt-1">
                {project.performance}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.split(" | ").map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                {project.summary}
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-xs text-gray-400">
                <p>
                  <span className="text-gray-300 font-semibold">Problem:</span> {project.problem}
                </p>
                <p>
                  <span className="text-gray-300 font-semibold">Result:</span> {project.result}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-[#00ff88] transition px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-black bg-[#00ff88] hover:bg-[#00e077] transition px-3 py-1.5 rounded-lg shadow-[0_0_12px_rgba(0,255,136,0.4)]"
                  >
                    <ExternalLink size={14} />
                    <span>Live App ↗</span>
                  </a>
                )}
              </div>

              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">
                {project.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
