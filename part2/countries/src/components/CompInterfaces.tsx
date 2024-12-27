import { CountryInterface } from "../services/DataInterfaces"

export interface FilterPropsInterface {
    countries: Array<CountryInterface>,
    selectedCountries: Array<CountryInterface>,
    setSelectedCountries: React.Dispatch<React.SetStateAction<Array<CountryInterface>>>
}


export interface CountryPropsInterface {
    selectedCountries: Array<CountryInterface>,
}

