import Person from './Person'
import personsService from '../services/persons'

const PhoneBook = (props) => {

    const personsShown = props.filterTxt.length > 0 ?
        props.persons.filter((person) => person.name.toLowerCase().includes(props.filterTxt.toLowerCase())) : props.persons

    const deletePerson = (person) => {
        if (window.confirm(`Do you really want to delete ${person.name} ?`)) {
            personsService
                .deletePerson(person.id)
                .then(removedPerson => {
                    const persons = props.persons.filter((p) => p.id != removedPerson.id)
                    props.setPersons(persons)
                    // alert(`Sucessfully deleted ${deletedPerson.name}`)
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
