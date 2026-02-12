import { useState } from "react"
import ComposedPulse from "../components/ComposedPulse"
import ReverseWord from "../components/ReverseWord"
import usePulse from "../hooks/usePulse"

export default function Contact() {
  const [input, setInput] = useState("")
  const { pulse, boost } = usePulse()
  const [history, setHistory] = useState<string[]>([
    "OM.TRADING Console v2.0",
    "Type 'help' to view quick commands.",
  ])

  const commands: Record<string, string> = {
    help: "Commands: about, top, projects, skills, certs, email, github, linkedin, resume, clear",
    about: "Data Science student focused on ML systems, CV, and analytics.",
    top: "Top: Stock Analyzer, Heart Disease App, Waste CNN, AQI Predictor, Crypto-Med",
    projects:
      "Projects: Stock Analyzer, Heart Disease App, Waste CNN, AQI Predictor, Crypto-Med, AetherInk, Fitness Logger, Nova Shell, Snake",
    skills: "Skills: Python, Java, C++, SQL, R, ML, CV, NLP, Tableau, JMP, WEKA",
    certs: "Certs: Vegathon, Vega Workshop, Kaggle ML, AI Impact Summit, CODEZILLA, HACKSTAR",
    email: "Email: srivastavaom078@gmail.com",
    github: "Opening GitHub profile...",
    linkedin: "Opening LinkedIn profile...",
    resume: "Opening resume...",
    clear: "Clearing terminal...",
  }

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()

    if (command === "clear") {
      setHistory(["OM.TRADING Console v2.0", "Type 'help' to view quick commands."])
      setInput("")
      return
    }

    if (command === "resume") {
      window.open("/resume.pdf", "_blank")
    }

    if (command === "github") {
      window.open("https://github.com/IronLad123", "_blank")
    }

    if (command === "linkedin") {
      window.open(
        "https://www.linkedin.com/in/om-srivastava-6717b7277/",
        "_blank"
      )
    }

    if (command === "email") {
      window.open("mailto:srivastavaom078@gmail.com")
    }

    const output = commands[command] || "Command not found. Type 'help'."

    setHistory((prev) => [...prev, `> ${command}`, output])
    setInput("")
  }

  return (
    <div className="page-shell">
      <h1 className="text-4xl font-bold text-[#00ff88]">
        Terminal Access
      </h1>
      <p className="subheading text-sm mt-2">Reach Out</p>

      <p className="subtitle">
        Quick commands for your best projects, skills, and links.
      </p>

      <div className="section-block grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComposedPulse seed={45} pulse={pulse} />
        <ReverseWord onSignal={boost} />
      </div>

      <div className="section-block flex flex-wrap gap-4">
        <span className="subheading text-sm self-center">Direct Links</span>
        <a
          href="mailto:srivastavaom078@gmail.com"
          className="btn-primary px-4 py-2 rounded-md transition"
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
        <a
          href="/resume.pdf"
          className="btn-ghost px-4 py-2 rounded-md transition"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </div>

      {/* Command Suggestions */}
      <div className="section-block flex gap-4 flex-wrap">
        {["help", "top", "skills", "certs", "email", "github", "resume", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="btn-ghost px-4 py-2 rounded-lg text-sm transition"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Window */}
      <div className="surface-card section-block rounded-xl p-6 h-[400px] overflow-y-auto">

        {history.map((line, index) => (
          <p key={index} className="text-gray-300 mb-1">
            {line}
          </p>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCommand(input)
          }}
          className="flex mt-4"
        >
          <span className="text-[#00ff88] mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none flex-1 text-white"
            autoFocus
          />
        </form>
      </div>

    </div>
  )
}
