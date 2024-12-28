import { useState, useEffect, SyntheticEvent } from 'react'
import { CountryInterface } from '../services/DataInterfaces.tsx'
import { FilterPropsInterface } from './CompInterfaces.tsx'

const FilterCountry = (props: FilterPropsInterface) => {
    const [filterTxt, setFilterText] = useState<string>("")

    const handleFilterChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setFilterText(target.value)
    }

    const handleShowClick = (showCx: CountryInterface) => {
        const selecteds = props.countries.filter(
            (cx: CountryInterface) => cx.name.common === showCx.name.common
        )
        props.setSelectedCountries(selecteds)
        if (selecteds.length == 1) {
            props.setDisplayCountry(selecteds[0])
        }
    }

    useEffect(() => {
        // console.log(filterTxt, props.countries)
        if (filterTxt != null && filterTxt.length > 0 && props.countries.length > 0) {
            const selecteds = props.countries.filter(
                (cx: CountryInterface) => cx.name.common.toLowerCase().includes(filterTxt.toLowerCase())
            )
            // console.log(selecteds)
            props.setSelectedCountries(selecteds)
            if (selecteds.length == 1) {
                props.setDisplayCountry(selecteds[0])
            }
        } else {
            //setSelectedCountries([])
        }
    }, [filterTxt])

    return (
        <>
            <div>
                filter shown with <input value={filterTxt} onChange={handleFilterChange} />
                {
                    props.selectedCountries == null ? "" :
                        props.selectedCountries.map(
                            (cx: CountryInterface) =>
                                <p key={cx.name.common}>{cx.name.common} <button onClick={() => handleShowClick(cx)}> Show </button></p>
                        )
                }
            </div>
        </>
    )
}


export default FilterCountry
