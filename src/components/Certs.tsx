import { useReveal } from '../hooks/useReveal'

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
