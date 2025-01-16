import './App.css'
import { EFeedback, IAppProps } from './ifx'

const App = (props: IAppProps) => {
  const addFeeback = (feedback: EFeedback) => {
    props.store.dispatch({
      type: feedback,
    })
  }

  return (
    <>
      <h1>Unicafe Redux</h1>
      <div className="card">
        <button onClick={() => addFeeback(EFeedback.GOOD)}>good</button>
        <button onClick={() => addFeeback(EFeedback.OK)}>ok</button>
        <button onClick={() => addFeeback(EFeedback.BAD)}>bad</button>
        <button onClick={() => addFeeback(EFeedback.ZERO)}>reset stats</button>
        <div>good {props.store.getState().good}</div>
        <div>ok {props.store.getState().ok}</div>
        <div>bad {props.store.getState().bad}</div>
      </div>
    </>
  )
}

export default App
