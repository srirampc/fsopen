import Person from './Person'

const DisplayPhoneBook = (props) => {

    const personsShown = props.filterTxt.length > 0 ?
        props.persons.filter((person) => person.name.toLowerCase().includes(props.filterTxt.toLowerCase())) : props.persons

    return (
        <>
            <ul>
                {
                    personsShown.map(person =>
                        <Person key={person.name} person={person} />)
                }
            </ul>

        </>
    )
}


export default DisplayPhoneBook
