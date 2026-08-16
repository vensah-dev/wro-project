import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainMenu from './main-menu'
import BodyDetector from './body-detector'
import './assets/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BodyDetector />
  </StrictMode>
)
