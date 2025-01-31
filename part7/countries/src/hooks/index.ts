import { useState, useEffect, SyntheticEvent } from 'react'
import weatherService from '../services/weather'
import countriesService from '../services/countries'
import {
  ICountry,
  IWeatherState,
  IWeatherLocation,
  IWeather,
  IUseCountry,
  IField,
} from '../ifx'

export const useCountry = (name: string): IUseCountry => {
  const [countryName, setCountryName] = useState<string>(name)
  const [country, setCountry] = useState<ICountry | null>(null)
  const [weatherState, setWeatherState] = useState<IWeatherState>({
    temp: 0,
    wind: 0,
    icon: '',
    iconUrl: '',
    desc: '',
  })
  const [weatherLoc, setWeatherLoc] = useState<IWeatherLocation>({
    lat: 360,
    lon: 360,
  })

  useEffect(() => {
    console.log('useEffect run ', countryName)
    if (countryName)
      countriesService.getCountry(countryName).then((ctdata: ICountry) => {
        setCountry(ctdata)
        console.log('Loaded Country')
        const lat = ctdata.capitalInfo.latlng[0]
        const lon = ctdata.capitalInfo.latlng[1]
        if (lat != weatherLoc.lat && lon != weatherLoc.lon) {
          setWeatherLoc({
            lat: lat,
            lon: lon,
          })
        }
      })
  }, [countryName])

  useEffect(() => {
    console.log('called for ', weatherLoc.lat, weatherLoc.lon)
    if (weatherLoc.lat == 360 || weatherLoc.lon == 360) {
      return
    }
    weatherService
      .getWeather(weatherLoc.lat, weatherLoc.lon)
      .then((weather: IWeather) => {
        console.log(weather)
        const wicon = weather.weather[0].icon
        setWeatherState({
          temp: weather.main.temp,
          wind: weather.wind.speed,
          icon: wicon,
          iconUrl: weatherService.getIconUrl(wicon),
          desc: weather.weather[0].description,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [weatherLoc])

  const onChange = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      value: string
    }
    setCountryName(target.value)
  }

  return {
    countryName,
    onChange,
    setCountryName,
    country,
    weatherState,
    weatherLoc,
  }
}

export function useField<T>(defaultValue: T, type: string): IField<T> {
  const [value, setValue] = useState<T>(defaultValue)

  const onChange = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      value: T
    }
    setValue(target.value)
  }

  const reset = () => {
    setValue(defaultValue)
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}
