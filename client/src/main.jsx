import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Store from './context/Store.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Store>
    <App />
  </Store>,
)
