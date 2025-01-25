import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SyntheticEvent } from 'react'
import { createAnecdote } from '../requests'
import { IAnecdote } from '../ifx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const notes: IAnecdote[] | undefined = queryClient.getQueryData(['anecdotes'])
      if (notes) queryClient.setQueryData(['anecdotes'], notes.concat(newAnecdote))
    },
  })

  const onCreate = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      anecdote: { value: string }
    }
    const content = target.anecdote.value
    target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
