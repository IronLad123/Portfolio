import { motion } from "framer-motion"
import PiePulse from "../components/PiePulse"
import ReactionTimer from "../components/ReactionTimer"
import usePulse from "../hooks/usePulse"

const projects = [
  {
    name: "Neural Compression Ops Console",
    performance: "Mars Rover Downlink Console",
    tech: "Python | PyTorch | FastAPI | React | Vite",
    summary: "Scientific console for neural image compression with telemetry and QA analytics.",
    problem: "Needed a mission-grade interface to evaluate compression quality for rover imagery.",
    role: "Designed the pipeline UI, metrics, and anomaly analytics.",
    result: "Operational console with Pareto analysis, anomaly detection, and timeline views.",
    repo: "https://github.com/IronLad123/neural-compression.git",
    demo: "",
    highlight: true,
  },
  {
    name: "Stock Analyzer",
    performance: "Market Analysis Toolkit",
    tech: "Python | Data Analysis",
    summary: "Explores market signals and generates quick stock analysis views.",
    problem: "Needed quick indicators to review stock behavior.",
    role: "Built data ingestion and indicator logic.",
    result: "Local workflow for quick market insights.",
    repo: "https://github.com/IronLad123/Stock_Analyzer",
    demo: "",
    highlight: true,
  },
  {
    name: "Heart Disease Prediction App",
    performance: "Health Risk Classifier",
    tech: "Python | Machine Learning",
    summary: "Model prototype to estimate heart-disease risk from clinical features.",
    problem: "Wanted a baseline risk predictor from medical features.",
    role: "Trained model and wrapped it in an app workflow.",
    result: "Working baseline model with a simple UI.",
    repo: "https://github.com/IronLad123/heart-disease-prediction-app",
    demo: "",
    highlight: true,
  },
  {
    name: "Waste Classification CNN",
    performance: "Image Classification",
    tech: "TensorFlow | CNN | Python",
    summary: "Image classifier that labels waste into categories for smarter sorting.",
    problem: "Needed a model to sort waste categories from images.",
    role: "Model design, training, and evaluation.",
    result: "Baseline CNN classifier for waste categories.",
    repo: "https://github.com/IronLad123/waste-classification-cnn",
    demo: "",
    highlight: true,
  },
  {
    name: "Air Quality Index Predictor",
    performance: "AQI Forecast Prototype",
    tech: "Python | ML / Time Series",
    summary: "Predicts air-quality index from historical and sensor data patterns.",
    problem: "Needed short-term AQI estimates from historical data.",
    role: "Feature prep and modeling.",
    result: "Prototype pipeline for AQI forecasting.",
    repo: "https://github.com/IronLad123/air-quality-index-predictor",
    demo: "",
    highlight: true,
  },
  {
    name: "Crypto-Med App",
    performance: "Secure Health Concept",
    tech: "App Prototype",
    summary: "Explores secure healthcare records using crypto-style verification ideas.",
    problem: "Looked for a concept to improve health record trust.",
    role: "Built the concept flow and UI prototype.",
    result: "Clickable concept prototype.",
    repo: "https://github.com/IronLad123/crypto-med-app",
    demo: "",
    highlight: true,
  },
  {
    name: "AetherInk",
    performance: "Gesture Drawing Studio",
    tech: "Python | OpenCV | MediaPipe",
    summary: "Hand-tracking canvas that turns gestures into smooth strokes with an interactive UI.",
    problem: "Needed a touchless way to draw using hand gestures.",
    role: "Built the CV pipeline, UI logic, and smoothing behavior.",
    result: "Smooth drawing experience with gesture-based controls.",
    repo: "https://github.com/IronLad123/Aetherink",
    demo: "",
  },
  {
    name: "Fitness Logger",
    performance: "Workout Tracking Utility",
    tech: "Python | Data Logging",
    summary: "Lightweight logger to track workouts, sets, and progress over time.",
    problem: "Hard to track workouts consistently without a simple log.",
    role: "Designed the logging flow and data structure.",
    result: "Fast local logging for workouts and progress.",
    repo: "https://github.com/IronLad123/fitness_logger",
    demo: "",
  },
  {
    name: "Nova Shell",
    performance: "Custom CLI Shell",
    tech: "Systems | CLI",
    summary: "Minimal command-line shell with a clean loop and basic command flow.",
    problem: "Wanted to understand core shell behavior hands-on.",
    role: "Implemented core shell logic.",
    result: "Functional shell loop with command execution.",
    repo: "https://github.com/IronLad123/nova-shell",
    demo: "",
  },
  {
    name: "Snake",
    performance: "Classic Game Build",
    tech: "Python | Game Loop",
    summary: "A clean, playable version of the classic Snake game.",
    problem: "Wanted to build a full game loop from scratch.",
    role: "Built core logic and controls.",
    result: "Playable game with responsive controls.",
    repo: "https://github.com/IronLad123/snake",
    demo: "",
  },
]

export default function Projects() {
  const { pulse, boost } = usePulse()
  return (
    <div className="page-shell">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#00ff88]"
      >
        Projects
      </motion.h1>
      <p className="subheading text-sm mt-2">Portfolio Highlights</p>

      <p className="subtitle">
        Short, clear snapshots of what I built, why it matters, and what it delivers.
      </p>

      <div className="section-block grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PiePulse seed={23} pulse={pulse} />
        <ReactionTimer onSignal={boost} />
      </div>

      <div className="section-block grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="surface-card p-8 rounded-xl hover:border-[#00ff88] hover:shadow-[0_0_20px_rgba(34,240,168,0.25)] transition duration-300"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">
                {project.name}
              </h2>
              {project.highlight && <span className="badge">Highlight</span>}
            </div>

            <p className="subheading text-xs mt-3">
              {project.performance}
            </p>

            <p className="text-gray-400 mt-3">
              {project.tech}
            </p>

            <p className="text-gray-300 mt-4">
              {project.summary}
            </p>
            <p className="text-gray-400 mt-3">
              <span className="text-gray-300">Problem:</span> {project.problem}
            </p>
            <p className="text-gray-400 mt-3">
              <span className="text-gray-300">Role:</span> {project.role}
            </p>
            <p className="text-gray-400 mt-2">
              <span className="text-gray-300">Result:</span> {project.result}
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="link-accent transition"
                >
                  Repo →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}
