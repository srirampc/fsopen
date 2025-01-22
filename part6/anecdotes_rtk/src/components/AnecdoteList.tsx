import { useSelector, useDispatch } from 'react-redux'
import { AppState, IAnecdote } from '../ifx'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  resetNotification,
  setNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector<AppState, IAnecdote[]>((state) => {
    console.log('state in l', state)
    if (state.filter.length == 0) {
      return state.anecdotes
    }
    return state.anecdotes.filter((acx) => acx.content.includes(state.filter))
  })
  const dispatch = useDispatch()
  const vote = (id: string, content: string) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted '${content}'`))

    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <div className="card">
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote: IAnecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
