import { useState, useEffect, ChangeEvent } from 'react'
import { CountryInterface } from '../services/DataInterfaces.tsx'
import { FilterPropsInterface } from './CompInterfaces.tsx'

const FilterCountry = (props: FilterPropsInterface) => {
    const [filterTxt, setFilterText] = useState<string>("")

    const handleFilterChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setFilterText(target.value)
    }

    const handleShowClick = (showCx: CountryInterface) => {
        const selecteds = props.countries.filter(
            (cx: CountryInterface) => cx.name.common === showCx.name.common
        )
        props.setSelectedCountries(selecteds)
    }

    useEffect(() => {
        console.log(filterTxt, props.countries)
        if (filterTxt != null && filterTxt.length > 0 && props.countries.length > 0) {
            const selecteds = props.countries.filter(
                (cx: CountryInterface) => cx.name.common.toLowerCase().includes(filterTxt.toLowerCase())
            )
            console.log(selecteds)
            props.setSelectedCountries(selecteds)
        } else {
            //setSelectedCountries([])
        }
    }, [filterTxt])


    return (
        <>
            <div>
                filter shown with <input value={filterTxt} onChange={handleFilterChange} />
                {
                    props.selectedCountries.map(
                        (cx: CountryInterface) =>
                            <p>{cx.name.common} <button onClick={() => handleShowClick(cx)}> Show </button></p>
                    )
                }
            </div>
        </>
    )
}


export default FilterCountry
