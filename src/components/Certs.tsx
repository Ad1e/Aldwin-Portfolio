import { useReveal } from '../hooks/useReveal'
import { certsData } from '../data/certsData'

export function Certs() {
  const certsRef = useReveal()

  return (
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
                  (e.target as HTMLImageElement).src = 'https://api.iconify.design/mdi/certificate.svg?color=%236c5ce7'
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
  )
}
