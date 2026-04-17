import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PortfolioChat from './chatbot/AI.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Now it is INSIDE the render block as a sibling to App */}
    <PortfolioChat />
  </StrictMode>
)