import { SyntheticEvent } from 'react'
import './App.css'
import { useField, useResource } from './hooks'
import { INote, IPerson } from './ifx'

function App() {
  const content = useField<string>('', 'text')
  const name = useField<string>('', 'text')
  const number = useField<string>('', 'text')

  const [notes, noteService] = useResource<INote>('http://localhost:3005/notes')
  const [persons, personService] = useResource<IPerson>('http://localhost:3005/persons')

  const handleNoteSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }
  return (
    <>
      <div className="card">
        <h3>Resource : notes</h3>
        <form onSubmit={handleNoteSubmit}>
          <input {...content} />
          <button>create</button>
        </form>
        {notes.map((n) => (
          <p key={n.id}>{n.content}</p>
        ))}
      </div>
      <div className="card">
        <h3>Resource: persons</h3>
        <form onSubmit={handlePersonSubmit}>
          name <input {...name} /> <br />
          number <input {...number} />
          <button>create</button>
        </form>
        {persons.map((n) => (
          <p key={n.id}>
            {n.name} {n.number}
          </p>
        ))}
      </div>
      <p className="read-the-docs" />
    </>
  )
}

export default App
