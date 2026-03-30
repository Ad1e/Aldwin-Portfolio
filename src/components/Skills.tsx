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

export function Skills() {
  return (
    <div className="hero-footer-marquee">
      <div className="marquee-label">
        <span className="dot"></span>
        My Tech Stack
      </div>
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
  )
}
