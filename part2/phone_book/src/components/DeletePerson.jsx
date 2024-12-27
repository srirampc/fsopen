const DeletePerson = ({ person, deletePerson }) => {
    return (
        <button onClick={() => deletePerson(person)}> delete </button>
    )
}

export default DeletePerson
