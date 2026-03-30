import React from 'react';
import profileImg from '../assets/profile.png'
import { Skills } from './Skills';

export function Hero() {
  return (
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

      <Skills />
    </section>
  )
}
