import { useDispatch } from 'react-redux'
import { SyntheticEvent } from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      anecdote: { value: string }
    }
    const content = target.anecdote.value
    target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => addAnecdote(e)}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm;
