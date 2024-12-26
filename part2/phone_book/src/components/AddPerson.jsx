import { useState } from 'react'

const AddPerson = (props) => {

    const [newPerson, setNewPerson] = useState({ name: 'Name', number: 'Number' })
    const addPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        if (props.persons.find((item) => item.name == newPerson.name) != undefined) {
            alert(`${newPerson.name} is already added to the Phonebook`)
        } else {
            props.setPersons(props.persons.concat({
                "name": newPerson.name,
                "number": newPerson.number,
                "id": props.persons.length + 1
            }))
            setNewPerson({ name: "", number: "" })
        }
    }
    const handlePersonChange = (event) => {
        console.log(event.target.id)
        console.log(event.target.value)
        if (event.target.id == "name") {
            setNewPerson({ name: event.target.value, number: newPerson.number })
        } else {
            if (event.target.id == "number") {
                setNewPerson({ name: newPerson.name, number: event.target.value })
            }
        }
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                Number: <input id='name' value={newPerson.name} onChange={handlePersonChange} />
            </div>
            <div>
                Number: <input id='number' value={newPerson.number} onChange={handlePersonChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>

    )
}

export default AddPerson
