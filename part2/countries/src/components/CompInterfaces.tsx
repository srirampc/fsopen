import { CountryInterface } from "../services/DataInterfaces"

export interface FilterPropsInterface {
    countries: Array<CountryInterface>,
    selectedCountries: Array<CountryInterface>,
    setSelectedCountries: React.Dispatch<React.SetStateAction<Array<CountryInterface>>>
    setDisplayCountry: React.Dispatch<React.SetStateAction<CountryInterface>>
}


export interface CountryPropsInterface {
    displayCountry: CountryInterface,
}

export interface WeatherPropsInterface {
    displayCountry: CountryInterface,
}
