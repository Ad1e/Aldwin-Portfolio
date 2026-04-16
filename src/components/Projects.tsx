import { useReveal } from '../hooks/useReveal'
import { projectsData } from '../data/projectsData'

export function Projects() {
  const projectsRef = useReveal()

  const getTagIcon = (tag: string): string => {
    const iconMap: Record<string, string> = {
      'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'Leaflet Maps': 'https://api.iconify.design/mdi/map.svg?color=%236c5ce7',
      'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
      'Chart.js': 'https://api.iconify.design/mdi/chart-line.svg?color=%236c5ce7',
      'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      'Dart': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
      'ESP32': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
      'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'CustomTkinter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'Matplotlib': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg'
    };
    return iconMap[tag] || '';
  };

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

        <div className="projects-carousel">
          {projectsData.map((project) => (
            <div className="project-card-carousel" key={project.id} id={`project-${project.id}`}>
              <div className="project-card-header">
                <div className={`project-icon-circle project-image-placeholder ${project.bgClass}`}>
                  <span className="project-emoji-large">{project.emoji}</span>
                </div>
                <h3>{project.title}</h3>
              </div>
              
              <div className="project-card-body">
                <p className="project-description-short">{project.description}</p>
                
                <div className="project-tags-carousel">
                  {project.tags.map((tag) => (
                    <span className="project-tag-carousel" key={tag} title={tag}>
                      <img src={getTagIcon(tag)} alt={tag} />
                    </span>
                  ))}
                </div>

                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    View on GitHub →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
