import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { IAnecdote, IAnecdoteAction } from './ifx'
import { Dispatch } from 'redux'
import { voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector<IAnecdote[], IAnecdote[]>((state) => state)
  const dispatch = useDispatch<Dispatch<IAnecdoteAction>>()

  const vote = (id: string) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <div className="card">
        {anecdotes.map((anecdote: IAnecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form>
          <div>
            <input />
          </div>
          <button>create</button>
        </form>
      </div>
    </div>
  )
}

export default App
