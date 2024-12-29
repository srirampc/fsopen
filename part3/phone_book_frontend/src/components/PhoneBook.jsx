import Person from './Person'
import personsService from '../services/persons'

const PhoneBook = (props) => {

    const personsShown = props.filterTxt.length > 0 ?
        props.persons.filter((person) => person.name.toLowerCase().includes(props.filterTxt.toLowerCase())) : props.persons

    const deletePerson = (person) => {
        if (window.confirm(`Do you really want to delete ${person.name} ?`)) {
            personsService
                .deletePerson(person.id)
                .then(removedState => {
                    console.log("Removed", removedState)
                    const persons = props.persons.filter((p) => p.id != person.id)
                    props.setPersons(persons)
                    // alert(`Sucessfully deleted ${removedPerson.name}`)
                    props.setNotifyMessage([
                        ` ${person.name} was sucessfully removed`,
                        "notify"
                    ])
                    setTimeout(() => {
                        props.setNotifyMessage([null, ""])
                    }, 5000)
                }).catch(error => {
                    // console.log(error)
                    const persons = props.persons.filter((p) => p.id != person.id)
                    props.setPersons(persons)
                    props.setNotifyMessage([
                        ` ${person.name} was already removed from the Phone book`,
                        "error"
                    ])
                    setTimeout(() => {
                        props.setNotifyMessage([null, ""])
                    }, 5000)
                })
        }
    }

    return (
        <>
            <ul>
                {
                    personsShown.map(person =>
                        <Person key={person.name} person={person} deletePerson={deletePerson} />)
                }
            </ul>

        </>
    )
}


export default PhoneBook
