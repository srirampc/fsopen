import './App.css'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import FilterText from './components/FilterText'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useAppDispatch } from './hooks'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterText />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
