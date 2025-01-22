import './App.css'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import FilterText from './components/FilterText'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterText />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
