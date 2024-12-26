import { useState } from 'react'
import Person from './components/Person'
import AddPerson from './components/AddPerson'
import FilterPerson from './components/FilterPerson'
import DisplayPhoneBook from './components/DisplayPhoneBook'
//import './App.css'


const App = (props) => {
    const [persons, setPersons] = useState(props.persons)
    const [filterTxt, setFilterText] = useState('')


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
