import { SyntheticEvent, useState } from 'react'
import './App.css'
import { IField, IAListProps, IAnecdote, ICreateProps } from './ifx'
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
import Notification from './components/Notification'
import { useField } from './hooks'

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
  const content = useField<string>('', 'text')
  const author = useField<string>('', 'text')
  const info = useField<string>('', 'text')

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log('Event', e.type)
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const handleReset = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log('Reset')
    content.reset()
    author.reset()
    info.reset()
  }

  function validInputProps<T>(rtx: IField<T>) {
    const { reset: _rst, ...vprops } = rtx
    return vprops
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...validInputProps(content)} />
        </div>
        <div>
          author
          <input {...validInputProps(author)} />
        </div>
        <div>
          url for more info
          <input {...validInputProps(info)} />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
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
  const navigate = useNavigate()

  const addNew = (anecdote: IAnecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote '${anecdote.content}' created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/')
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
      <Notification notification={notification} />
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
