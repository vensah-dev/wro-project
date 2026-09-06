import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import MainMenu from './main-menu'
import './assets/main.css'
import { SerialProvider } from './components/hooks/SerialContext';

import { loadMediapipe,  } from './components/hooks/usePoseLandmarks';
loadMediapipe().catch(() => {});

createRoot(document.getElementById('root')).render(
  <SerialProvider>
    <StrictMode>
      <MainMenu />
    </StrictMode>
  </SerialProvider>
)
