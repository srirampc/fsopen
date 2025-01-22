import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import { combineReducers } from 'redux'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer
})

const store = createStore(reducer)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
