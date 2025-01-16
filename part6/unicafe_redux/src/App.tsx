import './App.css'
import { createStore } from 'redux'
import reducer from './reducer'
import { EActionType } from './ifx'

const store = createStore(reducer)
const App = () => {
  const good = () => {
    store.dispatch({
      type: EActionType.GOOD,
    })
  }

  return (
    <>
      <h1>Unicafe Redux</h1>
      <div className="card">
        <button onClick={good}>good</button>
        <button>ok</button>
        <button>bad</button>
        <button>reset stats</button>
        <div>good {store.getState().good}</div>
        <div>ok</div>
        <div>bad</div>
      </div>
    </>
  )
}

export default { App, store }
