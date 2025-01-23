import './App.css'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import FilterText from './components/FilterText'
import Notification from './components/Notification'
import ancedoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    ancedoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)))
  })

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
