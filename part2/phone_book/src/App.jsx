import { useState, useEffect } from 'react'
import axios from 'axios'
import AddPerson from './components/AddPerson'
import FilterPerson from './components/FilterPerson'
import DisplayPhoneBook from './components/DisplayPhoneBook'


const App = () => {
    const [persons, setPersons] = useState([])
    const [filterTxt, setFilterText] = useState('')

    useEffect(() => {
        console.log('persons')
        axios
            .get("http://localhost:3001/persons")
            .then((response) => {
                console.log('promise fullfilled')
                setPersons(response.data)
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <FilterPerson filterTxt={filterTxt} setFilterText={setFilterText} />
            <h2>add a person</h2>
            <AddPerson persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            <DisplayPhoneBook persons={persons} filterTxt={filterTxt} />
        </div>
    )
}


export default App
