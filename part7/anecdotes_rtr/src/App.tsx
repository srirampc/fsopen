import { SyntheticEvent, useState } from 'react'
import './App.css'
import { IAListProps, IAnecdote, IAnecdoteProps, ICreateProps } from './ifx'
import Footer from './components/Footer'
import {
  useNavigate,
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
} from 'react-router-dom'
import Anecdote from './components/Anecdote'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/anecdotes">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }: IAListProps) => (
  <div>
    <h3>Anecdotes</h3>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const CreateNew = (props: ICreateProps) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export const Home = ({ anecdotes }: IAListProps) => {
  return <AnecdoteList anecdotes={anecdotes} />
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState<IAnecdote[]>([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState<string>('')

  const addNew = (anecdote: IAnecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id: number) => anecdotes.find((a) => a.id === id)

  const match = useMatch('/anecdotes/:id')
  console.log('match', match, Number(match?.params.id))
  const anecdote = anecdoteById(Number(match?.params.id))

  const vote = (id: number) => {
    const anecdote = anecdoteById(id)
    if (anecdote) {
      const voted = {
        ...anecdote,
        votes: anecdote.votes + 1,
      }

      setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
    }
  }

  return (
    <div>
      <h2>Software Anecdotes</h2>
      <Menu />
      <div className="card">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdote={anecdote} />}
          />
          <Route
            path="/anecdotes"
            element={<AnecdoteList anecdotes={anecdotes} />}
          />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route
            path="/"
            element={<Navigate replace to="/anecdotes" />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
