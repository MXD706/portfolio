import { useState, useEffect, useRef } from 'react'
import './App.css'

// Custom Cursor
function CustomCursor() {
  const cursorRef = useRef(null)
  
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])
  
  return <div className="cursor" ref={cursorRef} />
}

// Matrix Rain Background
function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById('matrix')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('')
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
    
    const interval = setInterval(draw, 33)
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
      <span className="prompt">$ </span>
      <span className="text">{displayText}</span>
      <span className="cursor">█</span>
    </div>
  )
}

// Easter Egg Counter - Fun element
function EasterEgg() {
  const [clicks, setClicks] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  
  const handleClick = () => {
    setClicks(c => c + 1)
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 800)
  }
  
  return (
    <div className="easter-egg" onClick={handleClick} title="点我试试？">
      <span className="egg-icon">🎮</span>
      <span className="egg-count">{clicks}</span>
      {showPopup && <span className="popup">+1 🔥</span>}
    </div>
  )
}

// Navigation
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <span className="logo-bracket">[</span>
        凯文
        <span className="logo-bracket">]</span>
      </div>
      <div className="nav-links">
        <a href="#home" className="nav-link active">~/首页</a>
        <a href="#skills" className="nav-link">~/技能</a>
        <a href="#projects" className="nav-link">~/项目</a>
        <a href="#about" className="nav-link">~/关于</a>
        <a href="#contact" className="nav-link">~/联系</a>
      </div>
    </nav>
  )
}

// Stats Counter
function Stats() {
  const stats = [
    { number: '20+', label: '项目总数' },
    { number: '∞', label: '代码行数' },
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

// Skills Section
function Skills() {
  const skillCategories = [
    {
      name: 'AI / 机器学习',
      icon: '🤖',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenCV', 'Deep-Live-Cam']
    },
    {
      name: '前端开发',
      icon: '🎨',
      skills: ['React', 'Vue', 'TypeScript', 'Tailwind CSS', 'Vite', 'Tauri']
    },
    {
      name: '后端开发',
      icon: '⚙️',
      skills: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis', 'Docker']
    },
    {
      name: 'DevOps / 工具',
      icon: '🔧',
      skills: ['Git', 'Linux', 'Nginx', 'CI/CD', 'GitHub Actions', 'Shell']
    },
  ]
  
  return (
    <section id="skills" className="section">
      <div className="section-header">
        <GlitchText tag="h2">技能栈</GlitchText>
        <p className="section-subtitle">// 技术能力展示</p>
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
                <span key={skill} className="skill-tag" style={{ animationDelay: `${i * 0.1}s` }}>{skill}</span>
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
          <span className="dot"></span> 公开
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
            <span className="link-icon">⌨️</span> 源码
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="card-link">
            <span className="link-icon">🚀</span> 演示
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
      name: 'AI 自动交易系统',
      description: '基于 AI 的股票分析和自动交易系统，支持多市场数据源',
      tags: ['Python', 'LangChain', 'TensorFlow'],
      icon: '📈',
      github: 'https://github.com/MXD706/TradingAgents-CN',
      demo: null
    },
    {
      name: 'OpenClaw 控制面板',
      description: 'AI Agent 管理面板，支持多渠道接入、插件管理、MCP 工具',
      tags: ['React', 'Tauri', 'TypeScript'],
      icon: '🕶️',
      github: 'https://github.com/MXD706/ai007-panel',
      demo: null
    },
    {
      name: 'Deep Live Cam',
      description: 'AI 实时换脸工具，支持 GPU 加速和虚拟摄像头输出',
      tags: ['Python', 'DeepFace', 'CUDA'],
      icon: '🎭',
      github: null,
      demo: null
    },
    {
      name: '个人作品集',
      description: 'Hacker 风格作品集网站，Matrix 雨 + Glitch 特效',
      tags: ['React', 'Vite', 'CSS'],
      icon: '🌐',
      github: 'https://github.com/MXD706/portfolio',
      demo: 'https://mxd706.github.io/portfolio'
    },
    {
      name: '多市场量化交易',
      description: '支持多个交易所的量化交易系统，包含策略回测功能',
      tags: ['Go', 'API', 'Docker'],
      icon: '🌐',
      github: null,
      demo: null
    },
    {
      name: '全栈笔记应用',
      description: '现代化的全栈笔记应用，支持多端同步和协作功能',
      tags: ['Next.js', 'PostgreSQL', 'Prisma'],
      icon: '📚',
      github: null,
      demo: null
    },
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
            <span class="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">whoami</span>
          </div>
          <div className="terminal-body">
            <p><span className="comment">// 基本信息</span></p>
            <p>{'{'}</p>
            <p>  <span className="property">"姓名"</span>: <span className="string">"凯文"</span>,</p>
            <p>  <span className="property">"职业"</span>: <span className="string">"全栈开发者 & AI 爱好者"</span>,</p>
            <p>  <span className="property">"模式"</span>: <span className="string">"🕶️ 黑客"</span>,</p>
            <p>  <span className="property">"专注"</span>: <span className="string">"AI 与自动化"</span>,</p>
            <p>  <span className="property">"语言"</span>: [<span className="string">"Python"</span>, <span className="string">"JavaScript"</span>, <span className="string">"Rust"</span>, <span className="string">"Go"</span>]</p>
            <p>{'}'}</p>
            <p></p>
            <p><span className="comment">// 当前项目</span></p>
            <p>{'{'}</p>
            <p>  <span className="property">"AI股票分析"</span>: <span className="string">"正在开发 🔬"</span>,</p>
            <p>  <span className="property">"自媒体内容创作"</span>: <span className="string">"进行中 🎬"</span></p>
            <p>{'}'}</p>
            <p></p>
            <p><span className="comment">// 状态</span></p>
            <p><span className="string">"正在改变世界... 🌏"</span></p>
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
        <GlitchText tag="h2">联系方式</GlitchText>
        <p className="section-subtitle">// 期待与你的合作</p>
      </div>
      <div className="contact-grid">
        <a href="https://github.com/MXD706" target="_blank" rel="noopener noreferrer" className="contact-card">
          <span className="contact-icon">🐙</span>
          <span className="contact-label">GitHub</span>
          <span className="contact-value">@MXD706</span>
        </a>
        <a href="mailto:mxd706@example.com" className="contact-card">
          <span className="contact-icon">📧</span>
          <span className="contact-label">邮箱</span>
          <span className="contact-value">mxd706@example.com</span>
        </a>
        <div className="contact-card">
          <span className="contact-icon">🎮</span>
          <span className="contact-label">游戏</span>
          <span className="contact-value">正在输入...</span>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="https://github.com/MXD706" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span className="divider">|</span>
        <a href="#home">回到顶部</a>
      </div>
      <p>Made with 🤖 and ☕</p>
      <p className="copyright">© 2026 凯文. All rights reserved.</p>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <CustomCursor />
      <ScrollProgress />
      <MatrixRain />
      <Nav />
      <EasterEgg />
      
      <section id="home" className="hero">
        <GlitchText>凯文</GlitchText>
        <TerminalText texts={['全栈开发者', 'AI 爱好者', '开源贡献者', '正在改变世界', 'Build the future']} />
        <Stats />
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary">查看项目</a>
          <a href="#contact" className="btn btn-secondary">联系我</a>
        </div>
      </section>
      
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
