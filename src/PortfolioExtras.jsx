
import { useEffect, useRef, useState } from 'react'
import {
  Search,
  X,
  ArrowRight,
  Globe,
  Cloud,
  Database,
  Server,
  ShieldCheck,
  HardDrive,
  Activity,
  LockKeyhole,
  Download
} from 'lucide-react'
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaWordpress,
  FaAws
} from 'react-icons/fa'
import {
  SiMysql,
  SiExpress,
  SiPostman
} from 'react-icons/si'

const techIcons = {
  React: FaReact,
  JavaScript: FaJs,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  'Node.js': FaNodeJs,
  'Express.js': SiExpress,
  Python: FaPython,
  MySQL: SiMysql,
  Git: FaGitAlt,
  GitHub: FaGithub,
  WordPress: FaWordpress,
  AWS: FaAws,
  Postman: SiPostman,
  EC2: FaAws,
  S3: FaAws,
  IAM: FaAws,
  VPC: FaAws,
  RDS: FaAws,
  CloudWatch: FaAws,
  CloudFront: FaAws
}

export function TechIcon({ name, size = 21 }) {
  const Icon = techIcons[name] || Globe

  return (
    <span className="custom-tech-icon" aria-hidden="true">
      <Icon size={size} />
    </span>
  )
}

const shortcuts = [
  { label: 'Home', id: 'home', detail: 'Introduction' },
  { label: 'About', id: 'about', detail: 'My story' },
  { label: 'Experience', id: 'experience', detail: 'Professional background' },
  { label: 'Skills', id: 'skills', detail: 'Technology stack' },
  { label: 'Projects', id: 'projects', detail: 'My work' },
  { label: 'AWS Labs', id: 'cloud', detail: 'Cloud engineering' },
  { label: 'Education', id: 'education', detail: 'Academic journey' },
  { label: 'Contact', id: 'contact', detail: 'Get in touch' }
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target
      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

      if ((event.ctrlKey || event.metaKey) &&
          event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((previous) => !previous)
      }

      if (event.key === 'Escape') {
        setOpen(false)
      }

      if (event.key === '/' && !isTyping && !event.ctrlKey &&
          !event.metaKey && !event.altKey) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return

    setQuery('')
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [open])

  const results = shortcuts.filter((item) =>
    `${item.label} ${item.detail}`
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  const navigate = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches ? 'auto' : 'smooth'
    })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <button
        type="button"
        className="command-launcher"
        onClick={() => setOpen(true)}
        aria-label="Open quick navigation"
      >
        <Search size={17} />
        <span>Quick Search</span>
        <kbd>Ctrl K</kbd>
      </button>

      {open && (
        <div
          className="command-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false)
            }
          }}
        >
          <div
            className="command-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
          >
            <div className="command-input-row">
              <Search size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search sections..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && results.length) {
                    navigate(results[0].id)
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <div className="command-results">
              {results.length === 0 && (
                <p className="command-empty">No matching section found.</p>
              )}

              {results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                >
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <ArrowRight size={17} />
                </button>
              ))}
            </div>

            <p className="command-hint">
              Press Enter for the first result • Esc to close
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = null

    const updateProgress = () => {
      if (frame !== null) return

      frame = window.requestAnimationFrame(() => {
        const total =
          document.documentElement.scrollHeight - window.innerHeight

        setProgress(
          total > 0
            ? Math.min(100, Math.max(0, window.scrollY / total * 100))
            : 0
        )
        frame = null
      })
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress / 100})` }}
      aria-hidden="true"
    />
  )
}

const architectureNodes = [
  {
    title: 'Users',
    detail: 'Browser / Client',
    Icon: Globe
  },
  {
    title: 'CloudFront',
    detail: 'Content delivery',
    Icon: Cloud
  },
  {
    title: 'Load Balancer',
    detail: 'Traffic distribution',
    Icon: Activity
  },
  {
    title: 'EC2',
    detail: 'Application compute',
    Icon: Server
  },
  {
    title: 'RDS',
    detail: 'Relational database',
    Icon: Database
  }
]

export function AWSArchitecture() {
  return (
    <div className="aws-architecture">
      <div className="architecture-header">
        <div>
          <span className="architecture-eyebrow">
            AWS ARCHITECTURE VISUALIZATION
          </span>
          <h3>Cloud Application Architecture</h3>
          <p>
            Illustrative architecture showing how AWS services
            can work together in a web application.
          </p>
        </div>
        <FaAws size={42} />
      </div>

      <div className="architecture-flow">
        {architectureNodes.map(({ title, detail, Icon }, index) => (
          <div className="architecture-step" key={title}>
            <div className="architecture-node">
              <Icon size={28} />
              <strong>{title}</strong>
              <small>{detail}</small>
            </div>

            {index < architectureNodes.length - 1 && (
              <ArrowRight
                className="architecture-arrow"
                size={24}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      <div className="architecture-support">
        <div>
          <ShieldCheck size={22} />
          <span>IAM: Access control</span>
        </div>
        <div>
          <HardDrive size={22} />
          <span>S3: Object storage</span>
        </div>
        <div>
          <LockKeyhole size={22} />
          <span>VPC: Network isolation</span>
        </div>
        <div>
          <Activity size={22} />
          <span>CloudWatch: Monitoring</span>
        </div>
      </div>

      <p className="architecture-note">
        Conceptual diagram for portfolio presentation — not a
        claim that these services are deployed together in
        one production environment.
      </p>
    </div>
  )
}

export function ResumeDownload() {
  return (
    <a
      href="/Sangeeta_Resume.pdf"
      download="Sangeeta_Patil_Resume.pdf"
      className="secondary-btn resume-download-btn"
    >
      <Download size={19} />
      Download Resume
    </a>
  )
}
