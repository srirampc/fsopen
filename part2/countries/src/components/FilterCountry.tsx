import { SyntheticEvent } from 'react'
import { CountryInterface } from '../services/DataInterfaces.tsx'
import { FilterPropsInterface } from './CompInterfaces.tsx'

const FilterCountry = (props: FilterPropsInterface) => {
    console.log("filter render")

    const handleFilterChange = (event: SyntheticEvent) => {
        console.log("filter change")
        const target = event.target as HTMLInputElement;
        const filterTxt = target.value
        if (filterTxt != null && filterTxt.length > 0 && props.countries.length > 0) {
            const selecteds = props.countries.filter(
                (cx: CountryInterface) => cx.name.common.toLowerCase().includes(filterTxt.toLowerCase())
            )
            // console.log(selecteds)
            props.setSelectedCountries(selecteds)
            if (selecteds.length == 1) {
                props.setDisplayCountry(selecteds[0])
            }
        }
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

    return (
        <>
            <div>
                filter shown with <input onChange={handleFilterChange} />
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
