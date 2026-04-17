import './App.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Certs } from './components/Certs'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import PortfolioChat from './chatbot/AI'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Certs />
      <Contact />
      <Footer />
      <PortfolioChat />
    </>
  )
}

export default App
