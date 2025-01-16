import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import app from './App.tsx'

const root = createRoot(document.getElementById('root')!)

const renderApp = () => {
  root.render(
    <StrictMode>
      <app.App />
    </StrictMode>,
  )
}


renderApp()
app.store.subscribe(renderApp)
