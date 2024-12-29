
const FilterPerson = (props) => {

    const handleFilterChange = (event) => {
        props.setFilterText(event.target.value)
    }

    return (
        <div>
            filter shown with <input value={props.filterTxt} onChange={handleFilterChange} />
        </div >
    )
}


export default FilterPerson
