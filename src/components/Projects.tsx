import { useReveal } from '../hooks/useReveal'

export function Projects() {
  const projectsRef = useReveal()

  return (
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
                fire safety alerts all accessible via a Mobile Application.
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
  )
}
