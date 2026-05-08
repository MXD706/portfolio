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

// CRT Scanlines & Effects
function CRTOverlay() {
  return (
    <div className="crt-overlay">
      <div className="scanlines"></div>
      <div className="flicker"></div>
      <div className="vignette"></div>
    </div>
  )
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
      setScrolled(window.scrollY > 100)

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
        <span className="logo">[</span>
        凯文
        <span className="logo">]</span>
      </div>
      <div className="nav-links">
        {[
          { id: 'home', label: '首页' },
          { id: 'skills', label: '技能' },
          { id: 'projects', label: '项目' },
          { id: 'about', label: '关于' },
          { id: 'contact', label: '联系' }
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
      <div className="nav-time">
        <span className="time-label">运行时长</span>
        <span className="time-value">{Math.floor(performance.now() / 1000)}秒</span>
      </div>
    </nav>
  )
}

// Hero Section
function Hero() {
  const roles = ['全栈开发者', 'AI 爱好者', '开源贡献者', '◈ 黑客精神 ◈']
  return (
    <section id="home" className="hero">
      <div className="hero-badge">
        <span className="badge-dot"></span>
        <span>在线可用的</span>
      </div>
      <GlitchText tag="h1">KEVIN</GlitchText>
      <TerminalText texts={roles} />
      <Stats />
      <div className="cta-buttons">
        <a href="#projects" className="btn btn-primary">
          <span className="btn-icon">▸</span> 查看项目
        </a>
        <a href="#contact" className="btn btn-secondary">
          <span className="btn-icon">⌂</span> 联系我
        </a>
      </div>
      <div className="scroll-indicator">
        <span>向下滚动</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  )
}

// Stats Counter
function Stats() {
  const stats = [
    { number: '20+', label: '项目数', status: '在线' },
    { number: '∞', label: '代码行数', status: '在线' },
    { number: 'AI', label: '专注领域', status: '在线' },
  ]
  
  return (
    <div className="stats">
      {stats.map(s => (
        <div key={s.label} className="stat">
          <div className="stat-header">
            <span className="stat-indicator"></span>
            <span className="stat-status">{s.status}</span>
          </div>
          <span className="stat-number">{s.number}</span>
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
      name: 'AI / 机器学习',
      icon: '◈',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenCV']
    },
    {
      name: '前端开发',
      icon: '◈',
      skills: ['React', 'Vue', 'TypeScript', 'Tailwind', 'Tauri']
    },
    {
      name: '后端开发',
      icon: '◈',
      skills: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis']
    },
    {
      name: '开发工具',
      icon: '◈',
      skills: ['Git', 'Linux', 'Docker', 'CI/CD', 'Shell']
    },
  ]
  
  return (
    <section id="skills" className="section">
      <div className="section-header">
        <GlitchText tag="h2">{'<技能>'}</GlitchText>
        <p className="section-subtitle">// 系统能力</p>
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
                <span key={skill} className="skill-tag" style={{ animationDelay: `${i * 0.15}s` }}>
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
          <span className="status-text">公开</span>
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
            <span>⌨</span> 源码
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="card-link">
            <span>▸</span> 在线
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
      name: 'AI 股票分析系统',
      description: 'AI驱动股票分析 + 自动交易系统，支持多市场数据',
      tags: ['Python', 'LangChain', 'TensorFlow'],
      icon: '◈',
      github: 'https://github.com/MXD706/TradingAgents-CN',
      demo: null
    },
    {
      name: 'OpenClaw 管理面板',
      description: 'AI Agent 可视化管理面板，支持多渠道集成和 MCP 工具',
      tags: ['React', 'Tauri', 'TypeScript'],
      icon: '◈',
      github: 'https://github.com/MXD706/ai007-panel',
      demo: null
    },
    {
      name: 'Deep Live Cam',
      description: '实时 AI 换脸工具，GPU 加速，虚拟摄像头输出',
      tags: ['Python', 'DeepFace', 'CUDA'],
      icon: '◈',
      github: null,
      demo: null
    },
    {
      name: '个人作品集',
      description: '这个网站 - 黑客终端风格，CRT 特效',
      tags: ['React', 'Vite', 'CSS'],
      icon: '◈',
      github: 'https://github.com/MXD706/portfolio',
      demo: 'https://mxd706.github.io/portfolio'
    },
  ]
  
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <GlitchText tag="h2">{'<项目>'}</GlitchText>
        <p className="section-subtitle">// 最近作品</p>
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
        <GlitchText tag="h2">{'<关于>'}</GlitchText>
        <p className="section-subtitle">// 查看我的信息</p>
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
            <p><span className="comment">{"// 身份"}</span></p>
            <p>{"{"}</p>
            <p>  <span className="property">"名字"</span>: <span className="string">"凯文"</span>,</p>
            <p>  <span className="property">"职业"</span>: <span className="string">"全栈开发者"</span>,</p>
            <p>  <span className="property">"模式"</span>: <span className="string">"黑客 ◈"</span>,</p>
            <p>  <span className="property">"专注"</span>: <span className="string">"AI & 自动化"</span>,</p>
            <p>  <span className="property">"技术栈"</span>: [<span className="string">"Python"</span>, <span className="string">"JS"</span>, <span className="string">"Rust"</span>, <span className="string">"Go"</span>]</p>
            <p>{"}"}</p>
            <p></p>
            <p><span className="comment">{"// 当前项目"}</span></p>
            <p>{"{"}</p>
            <p>  <span className="property">"ai_stock"</span>: <span className="string">"进行中 ◈"</span>,</p>
            <p>  <span className="property">"content_creator"</span>: <span className="string">"活跃中 ◈"</span></p>
            <p>{"}"}</p>
            <p></p>
            <p><span className="comment">{"// 座右铭"}</span></p>
            <p><span className="string">"用代码构建未来 ◈"</span></p>
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
        <GlitchText tag="h2">{'<联系>'}</GlitchText>
        <p className="section-subtitle">// 联系我</p>
      </div>
      <div className="contact-grid">
        <a href="https://github.com/MXD706" target="_blank" rel="noopener noreferrer" className="contact-card">
          <span className="contact-icon">⌘</span>
          <span className="contact-label">GITHUB</span>
          <span className="contact-value">@MXD706</span>
        </a>
        <a href="mailto:mxd706@example.com" className="contact-card">
          <span className="contact-icon">⌂</span>
          <span className="contact-label">邮箱</span>
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
      <CRTOverlay />
      <ScrollProgress />
      <CodeOcean />
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