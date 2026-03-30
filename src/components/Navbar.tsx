import { useState, useEffect } from 'react'

export function Navbar() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('theme') === 'light'
  })

  useEffect(() => {
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'dark')
    }
  }, [isLight])

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeNav = () => setMobileNav(false)

  return (
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
          <li><a href="#projects" onClick={closeNav}>Projects</a></li>
          <li><a href="#certifications" onClick={closeNav}>Certs</a></li>
          <li><a href="#connect" onClick={closeNav}>Contact</a></li>
          <li>
            <button 
              className="theme-toggle-btn" 
              onClick={() => setIsLight(!isLight)}
              aria-label="Toggle theme"
            >
              {isLight ? '🌙' : '☀️'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
