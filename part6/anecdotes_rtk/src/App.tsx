import './App.css'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import FilterText from './components/FilterText'
import Notification from './components/Notification'

const App = () => {
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
