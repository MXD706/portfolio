import { useState, useEffect } from 'react'
import './App.css'

// ASCII Art Logo Component
function AsciiLogo() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState('loading')
  
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 500)
    const t2 = setTimeout(() => setPhase('done'), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  
  if (phase === 'done') return null
  
  return (
    <div className={`ascii-overlay ${phase}`}>
      <pre className="ascii-art">
{`
    ██╗  ██╗ █████╗ ██╗     
    ██║ ██╔╝██╔══██╗██║     
    █████╔╝ ███████║██║     
    ██╔═██╗ ██╔══██║██║     
    ██║  ██╗██║  ██║██║     
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     
                              
 ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗████████╗███████╗██████╗ 
 ██╔══██╗██║  ██║██╔══██╗████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝███████║███████║██╔██╗ ██║   ██║   █████╗  ██║  ██║
 ██╔═══╝ ██╔══██║██╔══██║██║╚██╗██║   ██║   ██╔══╝  ██║  ██║
 ██║     ██║  ██║██║  ██║██║ ╚████║   ██║   ███████╗██████╔╝
 ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═════╝ 
`}
      </pre>
    </div>
  )
}

// Subtle Grid Background
function GridBackground() {
  return <div className="grid-bg"></div>
}

// Code Rain Background
function CodeRain() {
  useEffect(() => {
    const canvas = document.getElementById('coderain')
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01アイウエオカキクケコ'.split('')
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = '#39ff14'
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 80)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas id="coderain" className="code-rain" />
}

// Code Ocean Background
function CodeOcean() {
  useEffect(() => {
    const canvas = document.getElementById('codeocean')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('')
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)
    
    const colors = ['#00ff41', '#00d4ff', '#ff0055', '#ffbd2e']
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const colorIndex = Math.floor(Math.random() * colors.length)
        
        const gradient = ctx.createLinearGradient(0, drops[i] * fontSize - 100, 0, drops[i] * fontSize)
        gradient.addColorStop(0, colors[colorIndex])
        gradient.addColorStop(1, 'rgba(0,0,0,0)')
        
        ctx.fillStyle = gradient
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    
    const interval = setInterval(draw, 50)
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return <canvas id="codeocean" className="code-ocean" />
}

// Scroll Progress Bar
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress((scrollTop / docHeight) * 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

// Glitch Text Effect
function GlitchText({ children, tag: Tag = 'h1' }) {
  return (
    <Tag className="glitch" data-text={children}>
      {children}
    </Tag>
  )
}

// Terminal Typing Effect
function TerminalText({ texts, speed = 80 }) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setTextIndex((textIndex + 1) % texts.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, speed])

  return (
    <div className="terminal-text">
      <span className="prompt">❯</span>
      <span className="text">{displayText}</span>
      <span className="cursor">▋</span>
    </div>
  )
}

// Navigation
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)

      const sections = ['home', 'skills', 'projects', 'about', 'contact']
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <span className="bracket">[</span>
        KEVIN
        <span className="bracket">]</span>
      </div>
      <div className="nav-links">
        {[
          { id: 'home', label: 'HOME' },
          { id: 'skills', label: 'SKILLS' },
          { id: 'projects', label: 'PROJECTS' },
          { id: 'about', label: 'ABOUT' },
          { id: 'contact', label: 'CONTACT' }
        ].map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="nav-status">
        <span className="status-dot"></span>
        <span>Available</span>
      </div>
    </nav>
  )
}

// Hero Section
function Hero() {
  const roles = ['Full Stack Developer', 'AI Enthusiast', 'Open Source Contributor']
  return (
    <section id="home" className="hero">
      <div className="hero-badge">
        <span className="badge-dot"></span>
        <span>Available for work</span>
      </div>
      <h1>KEVIN</h1>
      <p className="hero-subtitle">Building things with code</p>
      <TerminalText texts={roles} />
      <Stats />
      <div className="cta-buttons">
        <a href="#projects" className="btn btn-primary">
          <span className="btn-icon">→</span> View Projects
        </a>
        <a href="#contact" className="btn btn-secondary">
          <span className="btn-icon">↓</span> Get in Touch
        </a>
      </div>
      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

// Stats Counter
function Stats() {
  const stats = [
    { number: '20', unit: '+', label: 'Projects' },
    { number: '∞', unit: '', label: 'Lines of Code' },
    { number: 'AI', unit: '', label: 'Focus Area' },
  ]

  return (
    <div className="stats">
      {stats.map(s => (
        <div key={s.label} className="stat">
          <div className="stat-value">
            <span className="stat-number">{s.number}</span>
            <span className="stat-unit">{s.unit}</span>
          </div>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

// Skills Section
function Skills() {
  const skillCategories = [
    {
      name: 'AI / Machine Learning',
      icon: '◆',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenCV']
    },
    {
      name: 'Frontend',
      icon: '◆',
      skills: ['React', 'Vue', 'TypeScript', 'Tailwind', 'Tauri']
    },
    {
      name: 'Backend',
      icon: '◆',
      skills: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis']
    },
    {
      name: 'Dev Tools',
      icon: '◆',
      skills: ['Git', 'Linux', 'Docker', 'CI/CD', 'Shell']
    },
  ]

  return (
    <section id="skills" className="section">
      <div className="section-header">
        <p className="section-label"> Expertise </p>
        <h2>{'<Skills/>'}</h2>
        <p className="section-subtitle">Technologies I work with</p>
      </div>
      <div className="skills-grid">
        {skillCategories.map(cat => (
          <div key={cat.name} className="skill-category">
            <div className="skill-category-header">
              <span className="skill-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
            </div>
            <div className="skill-tags">
              {cat.skills.map((skill, i) => (
                <span key={skill} className="skill-tag" style={{ animationDelay: `${i * 0.1}s` }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Project Card
function ProjectCard({ name, description, tags, icon, github, demo }) {
  return (
    <div className="project-card">
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <span className="card-status">
          <span className="dot"></span>
          <span className="status-text">Public</span>
        </span>
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="card-tags">
        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
      <div className="card-actions">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="card-link">
            <span>⌘</span> Code
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="card-link">
            <span>→</span> Demo
          </a>
        )}
      </div>
    </div>
  )
}

// Projects Section
function Projects() {
  const projects = [
    {
      name: 'AI Stock Trading System',
      description: 'AI-powered stock analysis with automated trading, multi-market support',
      tags: ['Python', 'LangChain', 'TensorFlow'],
      icon: '◆',
      github: 'https://github.com/MXD706/TradingAgents-CN',
      demo: null
    },
    {
      name: 'OpenClaw Dashboard',
      description: 'AI Agent management panel with multi-channel integration and MCP tools',
      tags: ['React', 'Tauri', 'TypeScript'],
      icon: '◆',
      github: 'https://github.com/MXD706/ai007-panel',
      demo: null
    },
    {
      name: 'Deep Live Cam',
      description: 'Real-time AI face swap with GPU acceleration and virtual camera output',
      tags: ['Python', 'DeepFace', 'CUDA'],
      icon: '◆',
      github: null,
      demo: null
    },
    {
      name: 'Portfolio',
      description: 'This website — clean developer portfolio with subtle terminal aesthetics',
      tags: ['React', 'Vite', 'CSS'],
      icon: '◆',
      github: 'https://github.com/MXD706/portfolio',
      demo: 'https://mxd706.github.io/portfolio'
    },
  ]

  return (
    <section id="projects" className="section">
      <div className="section-header">
        <p className="section-label">Work</p>
        <h2>{'<Projects/>'}</h2>
        <p className="section-subtitle">Recent projects</p>
      </div>
      <div className="projects-grid">
        {projects.map(p => <ProjectCard key={p.name} {...p} />)}
      </div>
    </section>
  )
}

// About Section
function About() {
  return (
    <section id="about" className="section">
      <div className="section-header">
        <p className="section-label">Info</p>
        <h2>{'<About/>'}</h2>
        <p className="section-subtitle">A bit about me</p>
      </div>
      <div className="about-content">
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">whoami.json</span>
          </div>
          <div className="terminal-body">
            <p><span className="comment">{"// identity"}</span></p>
            <p>{"{"}</p>
            <p>  <span className="property">"name"</span>: <span className="string">"Kevin"</span>,</p>
            <p>  <span className="property">"role"</span>: <span className="string">"Full Stack Developer"</span>,</p>
            <p>  <span className="property">"focus"</span>: <span className="string">"AI & Automation"</span>,</p>
            <p>  <span className="property">"stack"</span>: [<span className="string">"Python"</span>, <span className="string">"JS"</span>, <span className="string">"Rust"</span>, <span className="string">"Go"</span>]</p>
            <p>{"}"}</p>
            <p></p>
            <p><span className="comment">{"// current projects"}</span></p>
            <p>{"{"}</p>
            <p>  <span className="property">"ai_stock"</span>: <span className="string">"In Progress"</span>,</p>
            <p>  <span className="property">"content_creator"</span>: <span className="string">"Active"</span></p>
            <p>{"}"}</p>
            <p></p>
            <p><span className="comment">{"// motto"}</span></p>
            <p><span className="string">"Building the future with code"</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-header">
        <p className="section-label">Reach out</p>
        <h2>{'<Contact/>'}</h2>
        <p className="section-subtitle">Let's connect</p>
      </div>
      <div className="contact-grid">
        <a href="https://github.com/MXD706" target="_blank" rel="noopener noreferrer" className="contact-card">
          <span className="contact-icon">⌘</span>
          <span className="contact-label">GITHUB</span>
          <span className="contact-value">@MXD706</span>
        </a>
        <a href="mailto:mxd706@example.com" className="contact-card">
          <span className="contact-icon">✉</span>
          <span className="contact-label">EMAIL</span>
          <span className="contact-value">mxd706@example.com</span>
        </a>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-brand">KEVIN.DEV</span>
        <span className="footer-divider">//</span>
        <span className="footer-copy">© 2026</span>
      </div>
      <p className="footer-tech">Built with React + Vite</p>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <AsciiLogo />
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