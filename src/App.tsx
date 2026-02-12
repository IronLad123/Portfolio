import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Research from "./pages/Research"
import Contact from "./pages/Contact"
import Navbar from "./components/Navbar"
import Ticker from "./components/Ticker"
import Footer from "./components/Footer"
import { AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"

function App() {
  const location = useLocation()

  return (
    <div className="grid-bg min-h-screen pb-10">
      <a
        href="#main"
        className="skip-link"
      >
        Skip to content
      </a>
      <Navbar />

      <main id="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <Ticker />
    </div>
  )
}


export default App
