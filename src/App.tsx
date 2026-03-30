import { useState, useEffect, useRef } from 'react'
import profileImg from './assets/profile.png'
import './App.css'

/* ================================================
   Intersection Observer hook for scroll reveals
   ================================================ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ================================================
   SVG Icon components (inline for reliability)
   ================================================ */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
)

/* ================================================
   Tech stack data
   ================================================ */
const techStack = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'Cybersecurity', icon: 'https://api.iconify.design/mdi/shield-lock-outline.svg?color=%236c5ce7' },
  { name: 'Networking', icon: 'https://api.iconify.design/mdi/lan.svg?color=%236c5ce7' },
]

/* ================================================
   Certifications data
   ================================================ */
const certsData = [
  {
    id: 1,
    title: "AWS Academy Graduate — Cloud Security",
    issuer: "Amazon Web Services",
    image: "https://images.credly.com/size/340x340/images/7f7ea828-a10d-44f8-8baa-58a9c1af7671/blob",
    description: "Earners of this badge have completed AWS Academy Cloud Security Foundations. They have basic knowledge of cloud security concepts.",
    issued: "2026",
    url: "https://www.credly.com/badges/f306dcb0-adb3-44f2-9807-4d2fffd90a85/public_url"
  },
  {
    id: 2,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    image: "https://images.credly.com/size/340x340/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob",
    description: "Introductory knowledge of cybersecurity, including vulnerabilities, global implications of cyber threats, and threat detection and defense.",
    issued: "2026",
    url: "https://www.credly.com/badges/d25594a7-198c-4bdf-aab6-50d15b989c80/public_url"
  },
  {
    id: 3,
    title: "Network Defense",
    issuer: "Cisco",
    image: "https://images.credly.com/size/340x340/images/51526f76-711b-4caf-b04d-27f89512b112/NetworkDefense_v1_091721.png",
    description: "Broad understanding of techniques to monitor and protect the network, including access control, firewalls, cloud security, and cryptography.",
    issued: "2026",
    url: "https://www.credly.com/badges/38cc390e-c432-4ad7-bbe0-f648f2844969/public_url"
  },
  {
    id: 4,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    image: "https://images.credly.com/size/340x340/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
    description: "Introductory knowledge of cybersecurity, including vulnerabilities, global implications of cyber threats, and threat detection and defense.",
    issued: "2026",
    url: "https://www.credly.com/badges/92d8dcbb-6c84-4249-8450-a24d30aa216c/public_url"
  }
];

/* ================================================
   Main App Component
   ================================================ */
function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  // Section reveal refs
  const aboutRef = useReveal()
  const techRef = useReveal()
  const projectsRef = useReveal()
  const certsRef = useReveal()
  const connectRef = useReveal()

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile nav on link click
  const closeNav = () => setMobileNav(false)

  return (
    <>
      {/* ========== NAVBAR ========== */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container">
          <a href="#" className="nav-logo">
            Aldwin<span>.</span>
          </a>
          <button
            className={`nav-toggle ${mobileNav ? 'open' : ''}`}
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-links ${mobileNav ? 'open' : ''}`}>
            <li><a href="#about" onClick={closeNav}>About</a></li>
            <li><a href="#tech" onClick={closeNav}>Skills</a></li>
            <li><a href="#projects" onClick={closeNav}>Projects</a></li>
            <li><a href="#certifications" onClick={closeNav}>Certs</a></li>
            <li><a href="#connect" onClick={closeNav}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section className="hero-section" id="hero">
        <div className="hero-bg-orb orb-1"></div>
        <div className="hero-bg-orb orb-2"></div>
        <div className="hero-bg-orb orb-3"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="dot"></span>
              Open to opportunities
            </div>
            <h1 className="hero-title">
              Hi, I'm
              <span className="highlight">Aldwin C. Mazan</span>
            </h1>
            <p className="hero-description">
              A fresh graduate in <strong>Information Technology</strong> with a major in <strong>Network Technology</strong>.
              I develop Websites and Mobile applications, design cloud architectures, and bridge the gap between hardware and software.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">View My Work →</a>
              <a href="#connect" className="btn btn-outline">Let's Talk</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img src={profileImg} alt="Aldwin C. Mazan" className="hero-image" />
            </div>
            {/* Orbiting tech icons */}
            <div className="orbit-ring">
              {[
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', alt: 'Firebase' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', alt: 'Flutter' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', alt: 'Dart' },
                { icon: 'https://api.iconify.design/mdi/shield-lock-outline.svg?color=%236c5ce7', alt: 'Cybersecurity' },
                { icon: 'https://api.iconify.design/mdi/lan.svg?color=%236c5ce7', alt: 'Networking' },
              ].map((item, i) => (
                <div className="orbit-icon" key={item.alt} style={{ '--i': i, '--total': 8 } as React.CSSProperties}>
                  <img src={item.icon} alt={item.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="about-section" id="about">
        <div className="container reveal" ref={aboutRef}>
          <span className="section-label">Who I Am</span>
          <h2 className="section-title">
            Dedicated to excellence. <span className="accent">Expertise</span> across
            full-stack development and network architecture.
          </h2>

          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a student of Information Technology specializing in Network Technology, pursuing
                my passion for full-stack development in software, app, and web development. My skills
                span programming, software development, web and mobile app development, cloud computing,
                and cybersecurity principles.
              </p>
              <p>
                With hands-on experience in building real-world applications — from IoT-connected mobile
                apps to financial desktop tools — I bring a practical, solutions-driven mindset to every
                project. I thrive at the intersection of networking infrastructure and modern software
                development.
              </p>
              <blockquote>
                "Building digital solutions that matter — bridging the gap between hardware
                and software, one project at a time."
              </blockquote>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number gradient-text">4</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-card">
                <div className="stat-number gradient-text">6+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-card">
                <div className="stat-number gradient-text">2</div>
                <div className="stat-label">AWS Certification</div>
              </div>
              <div className="stat-card">
                <div className="stat-number gradient-text">∞</div>
                <div className="stat-label">Passion for Learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TECH STACK ========== */}
      <section className="tech-section" id="tech">
        <div className="container reveal" ref={techRef}>
          <span className="section-label">Technologies &amp; Expertise</span>
          <h2 className="section-title">
            My <span className="accent">Tech Stack</span>
          </h2>

          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[...techStack, ...techStack].map((tech, i) => (
                <div className="tech-card" key={`${tech.name}-${i}`}>
                  <img src={tech.icon} alt={tech.name} loading="lazy" />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS ========== */}
      <section className="projects-section" id="projects">
        <div className="container reveal" ref={projectsRef}>
          <span className="section-label">Selected Works</span>
          <h2 className="section-title">
            Featured <span className="accent">Projects</span>
          </h2>
          <p className="projects-description">
            A collection of mobile solutions, web platforms, and desktop tools.
            Each project reflects my dedication to practical, well-crafted software.
          </p>

          <div className="projects-grid">
            <div className="project-card" id="project-tilux">
              <div className="project-image project-image-placeholder tilux-bg">
                <span className="project-emoji">🔥</span>
              </div>
              <div className="project-info">
                <h3>TiluX Kitchen Monitoring</h3>
                <p>
                  A solar-powered IoT-based smart ventilation and fire safety system
                  for Alaw Tiluk. Monitors temperature, smoke, and humidity in real time
                  using ESP32 sensors, automatically controls exhaust fans, and triggers
                  fire safety alerts — all accessible via a Mobile Application.
                </p>
                <div className="project-tags">
                  <span className="project-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" />Flutter</span>
                  <span className="project-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" />Firebase</span>
                  <span className="project-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart" />Dart</span>
                  <span className="project-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" alt="ESP32" />ESP32</span>
                </div>
              </div>
            </div>

            <div className="project-card" id="project-cashflow">
              <div className="project-image project-image-placeholder cashflow-bg">
                <span className="project-emoji">💰</span>
              </div>
              <div className="project-info">
                <h3>CashFlow Tracker</h3>
                <p>
                  A sleek, dark-themed desktop financial tool built with Python.
                  Leverages CustomTkinter for the UI and MySQL for secure data persistence.
                  Track transactions, income, and expenses with ease.
                </p>
                <div className="project-tags">
                  <span className="project-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />Python</span>
                  <span className="project-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Tkinter" />CustomTkinter</span>
                  <span className="project-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />MySQL</span>
                  <span className="project-tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" alt="Matplotlib" />Matplotlib</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CERTIFICATIONS ========== */}
      <section className="certs-section" id="certifications">
        <div className="container reveal" ref={certsRef}>
          <span className="section-label">Credentials</span>
          <h2 className="section-title">
            Certifications &amp; <span className="accent">Achievements</span>
          </h2>
          <div className="certs-carousel">
            {certsData.map((cert) => (
              <div className="cert-card" key={cert.id}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cert-badge"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/340x340/1a1a2e/6c5ce7?text=Badge'
                  }}
                />
                <div className="cert-details">
                  <h3>{cert.title}</h3>
                  <div className="cert-issuer">{cert.issuer}</div>
                  <p className="cert-description">{cert.description}</p>
                  <div className="cert-date">Issued • {cert.issued}</div>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                  >
                    View on Credly →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONNECT ========== */}
      <section className="connect-section" id="connect">
        <div className="container reveal" ref={connectRef}>
          <div className="connect-wrapper">
            <div className="connect-text">
              <span className="section-label">Get in Touch</span>
              <h2>
                Let's <span className="gradient-text">Connect</span>
              </h2>
              <p>
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Whether it's a collaboration
                or just a hello — feel free to reach out!
              </p>

              <a href="mailto:aldwincatilo21@gmail.com" className="connect-email">
                <span className="email-icon">✉️</span>
                aldwincatilo21@gmail.com
              </a>

              <div className="social-links">
                <a
                  href="https://www.instagram.com/x.adiyu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link instagram"
                  id="social-instagram"
                >
                  <InstagramIcon />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/dev.aldwin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link facebook"
                  id="social-facebook"
                >
                  <FacebookIcon />
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com/in/aldwin-mazan-3b29462ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                  id="social-linkedin"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a
                  href="mailto:aldwinmazan@gmail.com"
                  className="social-link gmail"
                  id="social-gmail"
                >
                  <GmailIcon />
                  Gmail
                </a>
              </div>
            </div>

            <div className="connect-visual">
              <img src={profileImg} alt="Aldwin C. Mazan" className="connect-image" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}

      <footer className="footer">
        <div className="container">
          <p>© 2026 Aldwin C. Mazan. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
