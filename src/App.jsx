import { useState, useEffect } from 'react'
import './App.css'

// Matrix Rain Background
function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById('matrix')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const chars = '凯文张开发者创造者学习者AI'.split('')
    const fontSize = 16
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
          <span className="dot"></span> 公开
        </span>
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="card-tags">
        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
      <div className="card-actions">
        <a href="#" className="card-link">说明文档</a>
        <a href="#" className="card-link">在线演示</a>
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
        凯文
        <span className="logo-bracket">]</span>
      </div>
      <div className="nav-links">
        <a href="#home" className="nav-link active">~/首页</a>
        <a href="#projects" className="nav-link">~/项目</a>
        <a href="#about" className="nav-link">~/关于</a>
      </div>
    </nav>
  )
}

// Stats Counter
function Stats() {
  const stats = [
    { number: '20+', label: '项目总数' },
    { number: '6', label: '技术分类' },
    { number: 'AI', label: '主攻方向' },
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
    { name: 'AI自动学习', description: '基于人工智能的自动化学习系统，帮助提升学习效率', tags: ['Python', 'TensorFlow'], icon: '🤖' },
    { name: 'OpenClaw面板', description: 'AI Agent 管理面板，黑客风格界面', tags: ['React', 'Tauri'], icon: '🕶️' },
    { name: '股票分析', description: 'AI驱动的股票分析和自动交易系统', tags: ['Python', 'LangChain'], icon: '📈' },
    { name: '全栈笔记', description: '现代化的全栈笔记应用，支持多端同步', tags: ['Next.js', 'PostgreSQL'], icon: '📚' },
    { name: '多市场交易', description: '支持多个交易所的量化交易系统', tags: ['Go', 'API'], icon: '🌐' },
    { name: '后台管理系统', description: '企业级后台管理解决方案', tags: ['React', 'Node.js'], icon: '⚙️' },
  ]
  
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <GlitchText tag="h2">项目作品</GlitchText>
        <p className="section-subtitle">// 最近完成的一些项目</p>
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
        <GlitchText tag="h2">关于我</GlitchText>
        <p className="section-subtitle">// 个人信息</p>
      </div>
      <div className="about-content">
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">info.json</span>
          </div>
          <div className="terminal-body">
            <p><span className="comment">// 基本信息</span></p>
            <p>{'{'}</p>
            <p>  <span className="property">"姓名"</span>: <span className="string">"凯文"</span>,</p>
            <p>  <span className="property">"职业"</span>: <span className="string">"全栈开发者"</span>,</p>
            <p>  <span className="property">"位置"</span>: <span className="string">"中国东莞"</span>,</p>
            <p>  <span className="property">"专注"</span>: <span className="string">"AI与自动化"</span>,</p>
            <p>  <span className="property">"技能"</span>: [<span className="string">"Python"</span>, <span className="string">"JavaScript"</span>, <span className="string">"Rust"</span>, <span className="string">"Go"</span>]</p>
            <p>{'}'}</p>
            <p></p>
            <p><span className="comment">// 座右铭</span></p>
            <p><span className="string">"用代码创造未来"</span></p>
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
      <p>使用 React + Vite 构建</p>
      <p className="copyright">© 2026 凯文. 保留所有权利.</p>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <MatrixRain />
      <Nav />
      
      <section id="home" className="hero">
        <GlitchText>凯文</GlitchText>
        <TerminalText texts={['全栈开发者', 'AI爱好者', '开源贡献者', '正在改变世界']} />
        <Stats />
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary">查看项目</a>
          <a href="#about" className="btn btn-secondary">了解更多</a>
        </div>
      </section>
      
      <Projects />
      <About />
      <Footer />
    </div>
  )
}

export default App
