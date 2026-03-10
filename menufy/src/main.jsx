import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MenuProvider } from './context/MenuContext.jsx';
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuProvider>
      <Toaster position="top-center" />
      <App />
    </MenuProvider>
  </StrictMode>,
)
