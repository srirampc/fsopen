import { useState } from 'react'
import personsService from '../services/persons'

const AddPerson = (props) => {
    const [newPerson, setNewPerson] = useState({ name: 'Name', number: 'Number' })
    const createPerson = () => {
        const personObject = {
            "name": newPerson.name,
            "number": newPerson.number,
            //"id": props.persons.length + 1
        }
        personsService
            .create(personObject)
            .then(returnedPerson => {
                setNewPerson({ name: "", number: "" })
                props.setPersons(props.persons.concat(returnedPerson))
                props.setNotifyMessage(
                    [` ${returnedPerson.name} was sucessfully added to the server`,
                        "notify"]
                )
                setTimeout(() => {
                    props.setNotifyMessage([null, ""])
                }, 5000)
            })
    }

    const updatePerson = (foundPerson) => {
        if (window.confirm(`${newPerson.name} is already added to the Phonebook. Do you want to replace old number with new number?`)) {
            //TODO(update)
            const updatedPerson = {
                "name": foundPerson.name,
                "number": newPerson.number
            }
            personsService.update(foundPerson.id, updatedPerson)
                .then(returnedPerson => {
                    console.log(returnedPerson)
                    props.setPersons(props.persons.map(n => n.id == foundPerson.id ? returnedPerson : n))
                })
                .catch(error => {
                    console.log(error)
                    const persons = props.persons.filter((p) => p.id != updatedPerson.id)
                    props.setPersons(persons)
                    props.setNotifyMessage([
                        ` Error in updateing ${updatedPerson.name} in the Phone book`,
                        "error"
                    ])
                    setTimeout(() => {
                        props.setNotifyMessage([null, ""])
                    }, 5000)
                })
            setNewPerson({ name: "", number: "" })
        }
    }

    const addPerson = (event) => {
        event.preventDefault()
        // console.log('button clicked', event.target)
        const foundPerson = props.persons.find((item) => item.name == newPerson.name)
        if (foundPerson == undefined) {
            createPerson()
        } else {
            // props.setNotifyMessage([`Update functionality is not implemented yet. `, "error"])
            // setTimeout(() => {
            //     props.setNotifyMessage([null, ""])
            // }, 5000)

            if (foundPerson.number === newPerson.number) {
                props.setNotifyMessage([`${newPerson.name} is already added to the Phonebook with the same number ${newPerson.number}. `, "error"])
                setTimeout(() => {
                    props.setNotifyMessage([null, ""])
                }, 5000)
            } else {
                updatePerson(foundPerson)
            }
        }
    }
    const handlePersonChange = (event) => {
        // console.log(event.target.id)
        //console.log(event.target.value)
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
