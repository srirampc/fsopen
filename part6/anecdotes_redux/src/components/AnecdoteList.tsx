import { useSelector, useDispatch } from 'react-redux'
import { AppSate, IAnecdote, IAnecdoteAction } from '../ifx'
import { Dispatch } from 'redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector<AppSate, IAnecdote[]>((state) => {
    console.log('state in l', state)
    if (state.filter.length == 0) {
      return state.anecdotes
    }
    return state.anecdotes.filter((acx) => acx.content.includes(state.filter))
  })
  const dispatch = useDispatch<Dispatch<IAnecdoteAction>>()
  const vote = (id: string) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <div className="card">
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote: IAnecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
