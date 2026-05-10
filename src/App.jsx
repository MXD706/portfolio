import { useEffect, useMemo, useState } from 'react'
import './App.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const roles = ['Full Stack Developer', 'AI Automation Builder', 'Open Source Maker']

const skillCategories = [
  { name: 'AI and Automation', marker: 'AI', skills: ['Python', 'LangChain', 'TensorFlow', 'PyTorch', 'OpenCV'] },
  { name: 'Frontend', marker: 'UI', skills: ['React', 'Vue', 'TypeScript', 'Tailwind', 'Tauri'] },
  { name: 'Backend', marker: 'API', skills: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { name: 'Engineering', marker: 'OPS', skills: ['Git', 'Linux', 'Docker', 'CI/CD', 'Shell'] },
]

const projects = [
  {
    name: 'AI Stock Trading System',
    description: 'Multi-market stock analysis and trading workflow powered by AI agents, data pipelines, and automated research.',
    tags: ['Python', 'LangChain', 'TensorFlow'],
    marker: '01',
    github: 'https://github.com/MXD706/TradingAgents-CN',
  },
  {
    name: 'OpenClaw Dashboard',
    description: 'AI agent control panel for local tools, multi-channel workflows, and MCP powered desktop automation.',
    tags: ['React', 'Tauri', 'TypeScript'],
    marker: '02',
    github: 'https://github.com/MXD706/ai007-panel',
  },
  {
    name: 'Deep Live Cam',
    description: 'Real-time AI video experiment focused on face swap workflows, GPU acceleration, and virtual camera output.',
    tags: ['Python', 'DeepFace', 'CUDA'],
    marker: '03',
  },
  {
    name: 'Portfolio',
    description: 'A fast React portfolio with a terminal-inspired interface, responsive sections, and GitHub Pages deployment.',
    tags: ['React', 'Vite', 'CSS'],
    marker: '04',
    github: 'https://github.com/MXD706/portfolio',
    demo: 'https://mxd706.github.io/portfolio/',
  },
]

function GridBackground() {
  return <div className="grid-bg" aria-hidden="true" />
}

function CodeRain() {
  useEffect(() => {
    const canvas = document.getElementById('coderain')
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    const characters = '01<>/{}[]constletasyncawait'.split('')
    const fontSize = 16
    let columns = 0
    let drops = []
    let animationFrame = 0
    let lastDraw = 0

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      columns = Math.ceil(window.innerWidth / fontSize)
      drops = Array.from({ length: columns }, () => Math.random() * -40)
    }

    const draw = (timestamp) => {
      if (timestamp - lastDraw > 70) {
        ctx.fillStyle = 'rgba(7, 10, 18, 0.1)'
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Consolas, monospace`

        for (let i = 0; i < drops.length; i += 1) {
          const char = characters[Math.floor(Math.random() * characters.length)]
          ctx.fillStyle = i % 7 === 0 ? 'rgba(125, 211, 252, 0.8)' : 'rgba(52, 211, 153, 0.72)'
          ctx.fillText(char, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) drops[i] = 0
          drops[i] += 1
        }
        lastDraw = timestamp
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    animationFrame = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="coderain" className="code-rain" aria-hidden="true" />
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
}

function TerminalText({ texts, speed = 70 }) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]
    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
          return
        }

        if (!isDeleting) {
          setIsDeleting(true)
          return
        }

        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          return
        }

        setIsDeleting(false)
        setTextIndex((textIndex + 1) % texts.length)
      },
      isDeleting ? speed / 2 : speed,
    )

    return () => window.clearTimeout(timeout)
  }, [displayText, isDeleting, speed, textIndex, texts])

  return (
    <p className="terminal-text" aria-live="polite">
      <span className="prompt">$</span>
      <span>{displayText}</span>
      <span className="cursor" aria-hidden="true">|</span>
    </p>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 72)

      for (const item of [...navItems].reverse()) {
        const section = document.getElementById(item.id)
        if (section && window.scrollY >= section.offsetTop - 180) {
          setActiveSection(item.id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <a className="nav-logo" href="#home" aria-label="Kevin home"><span>[</span> KEVIN <span>]</span></a>
      <div className="nav-links">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={`nav-link ${activeSection === item.id ? 'active' : ''}`}>
            {item.label}
          </a>
        ))}
      </div>
      <a className="nav-status" href="#contact"><span className="status-dot" aria-hidden="true" />Available</a>
    </nav>
  )
}

function Stats() {
  const stats = useMemo(
    () => [
      { number: '20+', label: 'Projects shipped' },
      { number: 'AI', label: 'Main focus' },
      { number: 'OSS', label: 'Build style' },
    ],
    [],
  )

  return (
    <div className="stats" aria-label="Portfolio highlights">
      {stats.map((stat) => (
        <div key={stat.label} className="stat">
          <strong>{stat.number}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-badge"><span className="badge-dot" aria-hidden="true" />Available for AI, full-stack, and automation work</div>
      <p className="eyebrow">Developer Portfolio</p>
      <h1>Kevin</h1>
      <p className="hero-subtitle">I build practical software with AI workflows, polished interfaces, and automation that saves people time.</p>
      <TerminalText texts={roles} />
      <Stats />
      <div className="cta-buttons">
        <a href="#projects" className="btn btn-primary">View projects</a>
        <a href="#contact" className="btn btn-secondary">Get in touch</a>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-header">
        <p className="section-label">Expertise</p>
        <h2>Skills</h2>
        <p className="section-subtitle">A compact stack for shipping AI products, developer tools, and web apps.</p>
      </div>
      <div className="skills-grid">
        {skillCategories.map((category) => (
          <article key={category.name} className="skill-category">
            <div className="skill-category-header">
              <span className="skill-marker">{category.marker}</span>
              <h3>{category.name}</h3>
            </div>
            <div className="skill-tags">{category.skills.map((skill) => <span key={skill} className="skill-tag">{skill}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ name, description, tags, marker, github, demo }) {
  return (
    <article className="project-card">
      <div className="card-header">
        <span className="project-marker">{marker}</span>
        <span className="card-status"><span className="dot" aria-hidden="true" />Public</span>
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="card-tags">{tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
      <div className="card-actions">
        {github && <a href={github} target="_blank" rel="noreferrer" className="card-link">Code</a>}
        {demo && <a href={demo} target="_blank" rel="noreferrer" className="card-link">Demo</a>}
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <p className="section-label">Work</p>
        <h2>Projects</h2>
        <p className="section-subtitle">Selected builds across AI, desktop tooling, automation, and frontend systems.</p>
      </div>
      <div className="projects-grid">{projects.map((project) => <ProjectCard key={project.name} {...project} />)}</div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="section-header">
        <p className="section-label">Info</p>
        <h2>About</h2>
        <p className="section-subtitle">A quick snapshot of how I work.</p>
      </div>
      <div className="about-content">
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">whoami.json</span>
          </div>
          <pre className="terminal-body">{`{
  "name": "Kevin",
  "role": "Full Stack Developer",
  "focus": "AI and automation",
  "strengths": ["product thinking", "rapid prototyping", "clean UI"],
  "current": ["AI trading tools", "agent dashboards", "creator systems"]
}`}</pre>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-header">
        <p className="section-label">Reach out</p>
        <h2>Contact</h2>
        <p className="section-subtitle">Open to useful collaborations and serious builds.</p>
      </div>
      <div className="contact-grid">
        <a href="https://github.com/MXD706" target="_blank" rel="noreferrer" className="contact-card">
          <span className="contact-icon">GH</span>
          <span className="contact-label">GitHub</span>
          <span className="contact-value">@MXD706</span>
        </a>
        <a href="mailto:mxd706@example.com" className="contact-card">
          <span className="contact-icon">@</span>
          <span className="contact-label">Email</span>
          <span className="contact-value">mxd706@example.com</span>
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-brand">KEVIN.DEV</span>
        <span className="footer-divider">//</span>
        <span className="footer-copy">2026</span>
      </div>
      <p className="footer-tech">Built with React and Vite. Deployed on GitHub Pages.</p>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <GridBackground />
      <CodeRain />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
