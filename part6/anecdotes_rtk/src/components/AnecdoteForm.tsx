import { useDispatch } from 'react-redux'
import { SyntheticEvent } from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import ancedoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      anecdote: { value: string }
    }
    const content = target.anecdote.value
    target.anecdote.value = ''
    const newAnecdote = await ancedoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
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
