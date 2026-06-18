import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CrmJuridico from './CrmJuridico.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CrmJuridico />
  </StrictMode>,
)
