import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

export interface ICountry {
  name: { common: string }
  area: number
  capital: string[]
  capitalInfo: {
    latlng: number[]
  }
  flags: {
    png: string
    alt: string
  }
  languages: {
    [key: string]: string
  }
}

export interface IWeatherDesc {
  id: number
  main: string
  description: string
  icon: string
}

export interface IWeather {
  coord: {
    lon: number
    lat: number
  }
  weather: IWeatherDesc[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
}

export interface IWeatherState {
  temp: number
  wind: number
  icon: string
  desc: string
  iconUrl: string
}

export interface IWeatherLocation {
  lat: number
  lon: number
}

export interface IUseCountry {
  countryName: string
  onChange: (event: SyntheticEvent) => void
  setCountryName: Dispatch<SetStateAction<string>>
  country: ICountry | null
  weatherState: IWeatherState
  weatherLoc: IWeatherLocation
  errorMessage: string
}

export interface IHCountryProps {
  uCountry: IUseCountry | null
}

export interface IField<T> {
  type: string
  value: T
  onChange: (event: SyntheticEvent) => void
  reset: () => void
}
