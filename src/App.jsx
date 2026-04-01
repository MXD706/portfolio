import { useState, useEffect } from 'react'
import './App.css'

// Matrix Rain Background
function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById('matrix')
    const ctx = canvas.getContext('2d')
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*() Kevin Zhang'.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px monospace`
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    
    const interval = setInterval(draw, 50)
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
    
    return () => clearInterval(interval)
  }, [])
  
  return <canvas id="matrix" className="matrix-bg" />
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
function TerminalText({ texts, speed = 100 }) {
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
          setTimeout(() => setIsDeleting(true), 2000)
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
      <span className="prompt">$ </span>
      <span className="text">{displayText}</span>
      <span className="cursor">█</span>
    </div>
  )
}

// Project Card
function ProjectCard({ name, description, tags, icon }) {
  return (
    <div className="project-card">
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <span className="card-status">
          <span className="dot"></span> public
        </span>
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="card-tags">
        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
      <div className="card-actions">
        <a href="#" className="card-link">README.md</a>
        <a href="#" className="card-link">Demo</a>
      </div>
    </div>
  )
}

// Navigation
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <span className="logo-bracket">[</span>
        KEVIN
        <span className="logo-bracket">]</span>
      </div>
      <div className="nav-links">
        <a href="#home" className="nav-link active">~/home</a>
        <a href="#projects" className="nav-link">~/projects</a>
        <a href="#about" className="nav-link">~/about</a>
      </div>
    </nav>
  )
}

// Stats Counter
function Stats() {
  const stats = [
    { number: '20+', label: 'Projects' },
    { number: '6', label: 'Categories' },
    { number: 'AI', label: 'Focus' },
  ]
  
  return (
    <div className="stats">
      {stats.map(s => (
        <div key={s.label} className="stat">
          <span className="stat-number">{s.number}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

// Projects Section
function Projects() {
  const projects = [
    { name: 'AutoLearning', description: 'AI驱动的自动化学习系统', tags: ['Python', 'TensorFlow'], icon: '🤖' },
    { name: 'OpenClaw', description: 'AI Agent 管理面板', tags: ['React', 'Tauri'], icon: '🕶️' },
    { name: 'TradingAgents', description: 'AI股票分析交易系统', tags: ['Python', 'LangChain'], icon: '📈' },
    { name: 'Moltbook', description: '全栈笔记应用', tags: ['Next.js', 'PostgreSQL'], icon: '📚' },
  ]
  
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <GlitchText tag="h2">PROJECTS</GlitchText>
        <p className="section-subtitle">// some of my recent work</p>
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
        <GlitchText tag="h2">ABOUT</GlitchText>
        <p className="section-subtitle">// who am i</p>
      </div>
      <div className="about-content">
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">about.md</span>
          </div>
          <div className="terminal-body">
            <p><span className="comment"># Developer | Creator | Learner</span></p>
            <p></p>
            <p><span className="keyword">const</span> <span className="variable">Kevin</span> = {'{'}</p>
            <p>  <span className="property">role</span>: <span className="string">"Full-Stack Developer"</span>,</p>
            <p>  <span className="property">focus</span>: <span className="string">"AI & Automation"</span>,</p>
            <p>  <span className="property">location</span>: <span className="string">"Dongguan, China"</span>,</p>
            <p>  <span className="property">skills</span>: [<span className="string">"Python"</span>, <span className="string">"JavaScript"</span>, <span className="string">"Rust"</span>, <span className="string">"Go"</span>]</p>
            <p>{'}'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <p>Built with React + Vite</p>
      <p className="copyright">© 2026 Kevin Zhang. All rights reserved.</p>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <MatrixRain />
      <Nav />
      
      <section id="home" className="hero">
        <GlitchText>K-E-V-I-N</GlitchText>
        <TerminalText texts={['Full-Stack Developer', 'AI Enthusiast', 'Open Source Contributor', 'Building the future']} />
        <Stats />
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#about" className="btn btn-secondary">Learn More</a>
        </div>
      </section>
      
      <Projects />
      <About />
      <Footer />
    </div>
  )
}

export default App
