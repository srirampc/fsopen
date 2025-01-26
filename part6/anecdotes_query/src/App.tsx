import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { IAnecdote } from './ifx'
import { getAnecdotes, updateAnecdote } from './requests'
import './App.css'
import { useNotificationDispatch } from './contexts/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updNote) => {
      // queryClient.invalidateQueries({ queryKey: ['notes'] })
      const anecdotes: IAnecdote[] | undefined = queryClient.getQueryData([
        'anecdotes',
      ])
      if (anecdotes) {
        queryClient.setQueryData(
          ['anecdotes'],
          anecdotes.map((itx) => (itx.id == updNote.id ? updNote : itx)),
        )
      }
    },
  })

  const dispatch = useNotificationDispatch()
  const handleVote = (anecdote: IAnecdote) => {
    console.log('vote', anecdote)
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'SET',
      payload: `Anecdote '${anecdote.content}' is voted`,
    })
    setTimeout(() => dispatch({ type: 'RESET' }), 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading anecdotes data...</div>
  }

  if (result.isError) {
    if (result.error.message.includes('Network Error')) {
      return (
        <div>
          Error: anecdote service not available due to problems in the server.
        </div>
      )
    }
    return <div>Error: {result.error.message}</div>
  }

  const anecdotes: IAnecdote[] = result.data

  return (
    <div>
      <h2>Anecdotes + Query</h2>
      <Notification />
      <AnecdoteForm />
      <div className="card">
        {anecdotes
          .sort((ax, ay) => ay.votes - ax.votes)
          .map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
      </div>
      <p className="read-the-docs"></p>
    </div>
  )
}

export default App
