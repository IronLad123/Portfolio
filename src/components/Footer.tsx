export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="page-shell">
        <div className="surface-card rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row gap-8 justify-between">
            <div>
              <p className="subheading text-xs mb-3">Signal Node</p>
              <h3 className="text-2xl font-semibold text-white">Om Srivastava</h3>
              <p className="text-gray-400 mt-2 max-w-sm">
                Data Science & AI. Focused on ML systems, analytics, and interactive tools.
              </p>
              <div className="mt-4 flex items-center gap-3 text-sm text-gray-300">
                <span className="status-dot" />
                Open to internships and research collaborations
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-10">
              <div>
                <p className="subheading text-xs mb-3">Quick Links</p>
                <div className="flex flex-col gap-2 text-gray-300 text-sm">
                  <a href="/resume.pdf" target="_blank" rel="noreferrer" className="link-accent">
                    Resume
                  </a>
                  <a href="mailto:srivastavaom078@gmail.com" className="link-accent">
                    Email
                  </a>
                  <a href="https://github.com/IronLad123" target="_blank" rel="noreferrer" className="link-accent">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/om-srivastava-6717b7277/" target="_blank" rel="noreferrer" className="link-accent">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-line mt-8" />
          <p className="text-xs text-gray-500 mt-4">
            Thanks for stopping by. Reach out for collaborations, internships, or research.
          </p>
        </div>
      </div>
    </footer>
  )
}
