import { IAnecdote } from '../ifx'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useAppDispatch, useAppSelector } from '../hooks'

const AnecdoteList = () => {
  const anecdotes = useAppSelector((state) => {
    console.log('state in l', state)
    if (state.filter.length == 0) {
      return state.anecdotes
    }
    return state.anecdotes.filter((acx) => acx.content.includes(state.filter))
  })
  const dispatch = useAppDispatch()
  const vote = (anecdote: IAnecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
