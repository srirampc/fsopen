import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import reducer from './reducer'
import { createStore } from 'redux'


const store = createStore(reducer)

const root = createRoot(document.getElementById('root')!)

const renderApp = () => {
  root.render(
    <StrictMode>
      <App store={store}/>
    </StrictMode>,
  )
}


renderApp()
store.subscribe(renderApp)
