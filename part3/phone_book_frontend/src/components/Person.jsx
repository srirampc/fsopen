import DeletePerson from './DeletePerson'

const Person = ({ person, deletePerson }) => {
    return (
        <li>
            {person.name}  {person.number} 
            <DeletePerson person={person} deletePerson={deletePerson} />
        </li>
    )
}

export default Person
