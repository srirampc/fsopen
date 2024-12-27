import { useState, useEffect } from 'react'
import axios from 'axios'
import AddPerson from './components/AddPerson'
import FilterPerson from './components/FilterPerson'
import PhoneBook from './components/PhoneBook'
import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filterTxt, setFilterText] = useState('')

    useEffect(() => {
        console.log('persons')
        personsService
            .getAll()
            .then((persons) => {
                console.log('promise fullfilled')
                setPersons(persons)
            })
    }, [])


    return (
        <div>
            <h2>Phonebook</h2>
            <FilterPerson filterTxt={filterTxt} setFilterText={setFilterText} />
            <h2>add a person</h2>
            <AddPerson persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            <PhoneBook persons={persons} filterTxt={filterTxt} setPersons={setPersons}/>
        </div>
    )
}


export default App
