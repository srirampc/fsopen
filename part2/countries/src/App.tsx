import { useState, useEffect } from 'react'
import Country from './components/Country.tsx'
import FilterCountry from './components/FilterCountry.tsx'
import countriesService from './services/countries'
import { CountryInterface } from './services/DataInterfaces.tsx'
import Weather from './components/Weather.tsx'

const App = () => {
    console.log("App render", import.meta.env.MODE)

    const [countries, setCountries] = useState<Array<CountryInterface>>([])
    const [selectedCountries, setSelectedCountries] = useState<Array<CountryInterface> | null >(null)
    const [displayCountry, setDisplayCountry] = useState<CountryInterface | null>(null);

    useEffect(() => {
        console.log("useEffect run", countries)
        countriesService
            .getAll()
            .then((ctdata) => {
                setCountries(ctdata)
                console.log('Loaded Countries')
                // setSelectedCountries([countries[0]])
            })
    }, [])

    return (
        <>
            <FilterCountry countries={countries} selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries}
               setDisplayCountry={setDisplayCountry} />
            <Country displayCountry={displayCountry} />
            <Weather displayCountry={displayCountry} />
        </>
    )
}

export default App
