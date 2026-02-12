import { NavLink } from "react-router-dom"
import { Github, Linkedin } from "lucide-react"
import ThemeToggle from "./ThemeToggle"



export default function Navbar() {
  return (
    <nav className="nav-shell flex flex-wrap items-center justify-between gap-4 px-8 py-4 sticky top-0 z-50">
      <h1 className="text-[#00ff88] font-bold text-xl tracking-widest">
        OM.TRADING
      </h1>

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
