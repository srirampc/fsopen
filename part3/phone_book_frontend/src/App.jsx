import { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson'
import FilterPerson from './components/FilterPerson'
import PhoneBook from './components/PhoneBook'
import Notification from './components/Notification.jsx'
import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filterTxt, setFilterText] = useState('')
    const [notifyMessage, setNotifyMessage] = useState([null, "notify"])

    useEffect(() => {
        console.log('persons')
        personsService
            .getAll()
            .then((persons) => {
                console.log('promise fullfilled')
                setPersons(persons)
            })
    }, [])

    // console.log("In App", notifyMessage)

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notifyMessage={notifyMessage} />
            <FilterPerson filterTxt={filterTxt} setFilterText={setFilterText} />
            <h2>add a person</h2>
            <AddPerson persons={persons} setPersons={setPersons} setNotifyMessage={setNotifyMessage} />
            <h2>Numbers</h2>
            <PhoneBook persons={persons} filterTxt={filterTxt} setPersons={setPersons} setNotifyMessage={setNotifyMessage}/>
        </div>
    )
}


export default App
