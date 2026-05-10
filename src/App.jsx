import { useEffect, useState } from 'react'
import './App.css'

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'services', label: '能力' },
  { id: 'projects', label: '项目' },
  { id: 'about', label: '关于' },
  { id: 'contact', label: '联系' },
]

const roles = ['AI 自动化产品构建者', '全栈开发者', '开源项目实践者']

const metrics = [
  { value: '20+', label: '项目实践' },
  { value: 'AI', label: '核心方向' },
  { value: 'OSS', label: '开源沉淀' },
]

const serviceCards = [
  {
    eyebrow: '01 / AI Workflow',
    title: '把 AI 能力做成可运行的产品流程',
    description: '从数据接入、Agent 编排到前端控制台，重点不是概念展示，而是让工具真正进入日常工作流。',
    tags: ['LangChain', 'Python', 'MCP', 'Automation'],
  },
  {
    eyebrow: '02 / Product UI',
    title: '有质感的 Web 与桌面端界面',
    description: '用清晰的信息层级、动效节奏和响应式布局，把技术型产品做得更容易理解、更愿意使用。',
    tags: ['React', 'Tauri', 'TypeScript', 'CSS'],
  },
  {
    eyebrow: '03 / Engineering',
    title: '快速验证，但保留工程质量',
    description: '重视可维护结构、构建部署、自动化脚本和 Git 工作流，让原型能够自然演进为长期项目。',
    tags: ['Node.js', 'Docker', 'CI/CD', 'Git'],
  },
]

const projects = [
  {
    name: 'AI 股票交易系统',
    type: 'Agent Research',
    description: '面向多市场股票分析的 AI 研究与交易工作流，覆盖数据管线、策略分析和自动化决策辅助。',
    tags: ['Python', 'LangChain', 'TensorFlow'],
    github: 'https://github.com/MXD706/TradingAgents-CN',
    featured: true,
  },
  {
    name: 'OpenClaw Dashboard',
    type: 'AI Control Panel',
    description: 'AI Agent 管理面板，整合本地工具、多渠道任务和 MCP 能力，面向桌面自动化场景。',
    tags: ['React', 'Tauri', 'TypeScript'],
    github: 'https://github.com/MXD706/ai007-panel',
  },
  {
    name: 'Deep Live Cam',
    type: 'Realtime AI Video',
    description: '实时 AI 视频实验，聚焦 GPU 加速、虚拟摄像头输出和低延迟视觉处理链路。',
    tags: ['Python', 'DeepFace', 'CUDA'],
  },
  {
    name: '个人作品集',
    type: 'Portfolio System',
    description: '这个站点本身，使用 React + Vite 构建并部署到 GitHub Pages，持续作为项目展示入口。',
    tags: ['React', 'Vite', 'GitHub Pages'],
    github: 'https://github.com/MXD706/portfolio',
    demo: 'https://mxd706.github.io/portfolio/',
  },
]

const timeline = [
  { year: 'Now', title: 'AI Agent 与自动化工具', text: '围绕交易、内容生产、桌面控制台做可落地的系统。' },
  { year: 'Stack', title: 'Python + React + Tauri', text: '偏向能快速验证产品价值，又能长期维护的技术组合。' },
  { year: 'Style', title: '结果导向的工程方式', text: '先把关键链路跑通，再持续打磨体验、稳定性和部署效率。' },
]

function AmbientBackground() {
  return (
    <>
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
    </>
  )
}

function CodeRain() {
  useEffect(() => {
    const canvas = document.getElementById('coderain')
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    const characters = '01<>/{}[]constletasyncawaitAI'.split('')
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
      drops = Array.from({ length: columns }, () => Math.random() * -45)
    }

    const draw = (timestamp) => {
      if (timestamp - lastDraw > 80) {
        ctx.fillStyle = 'rgba(5, 8, 16, 0.105)'
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Consolas, monospace`

        for (let i = 0; i < drops.length; i += 1) {
          const char = characters[Math.floor(Math.random() * characters.length)]
          ctx.fillStyle = i % 9 === 0 ? 'rgba(245, 158, 11, 0.68)' : 'rgba(45, 212, 191, 0.62)'
          ctx.fillText(char, i * fontSize, drops[i] * fontSize)
          if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.976) drops[i] = 0
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

function TerminalText({ texts, speed = 80 }) {
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
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="主导航">
      <a className="nav-logo" href="#home" aria-label="返回首页">
        <span>MXD</span>
        <strong>Kevin</strong>
      </a>
      <div className="nav-links">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={`nav-link ${activeSection === item.id ? 'active' : ''}`}>
            {item.label}
          </a>
        ))}
      </div>
      <a className="nav-status" href="#contact">
        <span className="status-dot" aria-hidden="true" />
        可合作
      </a>
    </nav>
  )
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="orbital-card main-card">
        <span className="card-kicker">LIVE SYSTEM</span>
        <strong>AI + Web + Automation</strong>
        <p>把想法变成能上线、能演示、能持续迭代的产品。</p>
      </div>
      <div className="floating-chip chip-one">React</div>
      <div className="floating-chip chip-two">Python</div>
      <div className="floating-chip chip-three">Agent</div>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <div className="hero-badge">
          <span className="badge-dot" aria-hidden="true" />
          接 AI 自动化 / 全栈开发 / 工具产品
        </div>
        <p className="eyebrow">Developer Portfolio</p>
        <h1>
          把 AI 想法
          <span>做成可用产品</span>
        </h1>
        <p className="hero-subtitle">
          我是 Kevin，专注 AI Agent、自动化工作流、全栈应用和桌面工具。比起堆技术名词，我更在意项目能不能跑通、能不能上线、能不能持续变好。
        </p>
        <TerminalText texts={roles} />
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary">查看项目</a>
          <a href="#contact" className="btn btn-secondary">联系我</a>
        </div>
      </div>
      <div className="hero-side">
        <HeroVisual />
        <div className="stats" aria-label="作品集亮点">
          {metrics.map((metric) => (
            <div key={metric.label} className="stat">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section section-wide">
      <div className="section-header split-header">
        <div>
          <p className="section-label">Capabilities</p>
          <h2>我能把复杂技术做成清晰体验</h2>
        </div>
        <p className="section-subtitle">
          页面之前偏单薄，是因为只有信息列表。现在用“能力、项目、工作方式、联系”的节奏，让访问者更快理解你能解决什么问题。
        </p>
      </div>
      <div className="service-grid">
        {serviceCards.map((card) => (
          <article key={card.title} className="service-card">
            <p>{card.eyebrow}</p>
            <h3>{card.title}</h3>
            <span>{card.description}</span>
            <div className="tag-row">
              {card.tags.map((tag) => <em key={tag}>{tag}</em>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ name, type, description, tags, github, demo, featured }) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`}>
      <div className="card-topline">
        <span>{type}</span>
        <span className="card-status"><span className="dot" aria-hidden="true" />公开项目</span>
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="card-tags">{tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
      <div className="card-actions">
        {github && <a href={github} target="_blank" rel="noreferrer" className="card-link">GitHub</a>}
        {demo && <a href={demo} target="_blank" rel="noreferrer" className="card-link">在线预览</a>}
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <p className="section-label">Selected Work</p>
        <h2>项目不是摆出来，是要讲出价值</h2>
        <p className="section-subtitle">选择几个最能代表方向的项目，用不同尺寸和视觉权重展示重点。</p>
      </div>
      <div className="projects-grid">
        {projects.map((project) => <ProjectCard key={project.name} {...project} />)}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="about-panel">
        <div className="section-header left-header">
          <p className="section-label">About</p>
          <h2>我更像一个能落地的技术合伙人</h2>
          <p className="section-subtitle">
            适合从 0 到 1 的产品验证、自动化工具、AI 控制台、内容生产系统和复杂前端界面。
          </p>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article key={item.title} className="timeline-item">
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
          <span className="terminal-title">profile.json</span>
        </div>
        <pre className="terminal-body">{`{
  "name": "Kevin",
  "role": "Full Stack Developer",
  "focus": "AI automation products",
  "principles": ["快速验证", "工程可维护", "体验有质感"],
  "building": ["AI trading tools", "agent dashboards", "creator systems"]
}`}</pre>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-shell">
        <div>
          <p className="section-label">Contact</p>
          <h2>有项目想法，直接聊目标和交付</h2>
          <p>
            如果你需要 AI 自动化、全栈产品原型、项目页面升级或工具系统开发，可以从 GitHub 或邮件联系我。
          </p>
        </div>
        <div className="contact-grid">
          <a href="https://github.com/MXD706" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-icon">GH</span>
            <span className="contact-label">GitHub</span>
            <span className="contact-value">@MXD706</span>
          </a>
          <a href="mailto:mxd706@example.com" className="contact-card">
            <span className="contact-icon">@</span>
            <span className="contact-label">邮箱</span>
            <span className="contact-value">mxd706@example.com</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>KEVIN.DEV</span>
        <span>//</span>
        <span>AI AUTOMATION PORTFOLIO</span>
      </div>
      <p>React + Vite 构建，部署在 GitHub Pages。</p>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <AmbientBackground />
      <CodeRain />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
