import { useState, useEffect } from 'react'
import Country from './components/Country.tsx'
import FilterCountry from './components/FilterCountry.tsx'
import countriesService from './services/countries'
import { CountryInterface } from './services/DataInterfaces.tsx'
import Weather from './components/Weather.tsx'

const App = () => {

    const [countries, setCountries] = useState<Array<CountryInterface>>([])
    const [selectedCountries, setSelectedCountries] = useState<Array<CountryInterface> | null >(null)
    const [displayCountry, setDisplayCountry] = useState<CountryInterface | null>(null);

    useEffect(() => {
        countriesService
            .getAll()
            .then((countries) => {
                setCountries(countries)
                console.log('Loaded Countries')
                // setSelectedCountries([countries[0]])
            })
    }, [])

    if (countries.length == 0) {
        return (<></>)
    }

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
