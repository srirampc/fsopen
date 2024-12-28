import { CountryInterface } from "../services/DataInterfaces"

export interface FilterPropsInterface {
    countries: Array<CountryInterface>,
    selectedCountries: Array<CountryInterface> | null,
    setSelectedCountries: React.Dispatch<React.SetStateAction<Array<CountryInterface> | null>>
    setDisplayCountry: React.Dispatch<React.SetStateAction<CountryInterface | null>>
}


export interface CountryPropsInterface {
    displayCountry: CountryInterface | null,
}

export interface WeatherPropsInterface {
    displayCountry: CountryInterface | null,
}
