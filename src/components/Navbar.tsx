import { NavLink } from "react-router-dom"
import { Github, Linkedin } from "lucide-react"
import ThemeToggle from "./ThemeToggle"



export default function Navbar() {
  return (
    <nav className="nav-shell flex flex-wrap items-center justify-between gap-4 px-8 py-4 sticky top-0 z-50">
      <NavLink to="/" className="flex items-center gap-2 group">
        <span className="text-[#00ff88] font-bold text-xl tracking-wider group-hover:drop-shadow-[0_0_8px_rgba(0,255,136,0.6)] transition">
          OM SRIVASTAVA
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
          AI & DS
        </span>
      </NavLink>

      <div className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-wide">
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/projects", label: "Projects" },
          { to: "/research", label: "Research" },
          { to: "/contact", label: "Contact" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-2 py-1 rounded-md transition ${
                isActive ? "text-[#00ff88] bg-white/5" : "hover:text-[#00ff88]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <ThemeToggle compact />
        <a
          href="/resume.pdf"
          className="btn-primary px-3 py-1.5 rounded-md transition"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
        <a
          href="mailto:srivastavaom078@gmail.com"
          className="btn-ghost px-3 py-1.5 rounded-md transition"
        >
          Email
        </a>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/IronLad123"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#00ff88] transition"
          >
            <Github size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/om-srivastava-6717b7277/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#00ff88] transition"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </nav>
  )
}
