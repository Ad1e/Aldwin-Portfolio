import { useReveal } from '../hooks/useReveal'
import { projectsData } from '../data/projectsData'
import { certsData } from '../data/certsData'
import { technologiesData } from '../data/technologiesData'

export function About() {
  const aboutRef = useReveal()
  const projectCount = projectsData.length
  const certCount = certsData.length
  const techCount = technologiesData.length

  return (
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
              With hands-on experience in building real-world applications from IoT-connected mobile
              apps to financial desktop tools I bring a practical, solutions-driven mindset to every
              project. I thrive at the intersection of networking infrastructure and modern software
              development.
            </p>
            <blockquote>
              "Transforming ideas into elegant solutions. Crafting code that powers innovation and drives real-world impact."
            </blockquote>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number gradient-text">{projectCount}</div>
              <div className="stat-label">Projects Built</div>
            </div>
            <div className="stat-card">
              <div className="stat-number gradient-text">{techCount}+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-card">
              <div className="stat-number gradient-text">{certCount}</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat-card">
              <div className="stat-number gradient-text">∞</div>
              <div className="stat-label">Passion for Learning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
