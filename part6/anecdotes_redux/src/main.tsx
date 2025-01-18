import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import { IAnecdote, IAnecdoteAction } from './ifx'

const store = createStore<IAnecdote[], IAnecdoteAction>(reducer)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
