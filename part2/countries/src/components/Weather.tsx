import { useState, useEffect } from "react";
import { WeatherInterface } from "../services/DataInterfaces";
import weatherService from "../services/weather";
import { WeatherPropsInterface } from "./CompInterfaces";

interface WeatherState {
    temp: number,
    wind: number,
    icon: string,
    desc: string
}

interface WeatherLocation {
    lat: number,
    lon: number,

}

const Weather = (props: WeatherPropsInterface) => {
    if (props.displayCountry === null) {
        return <></>
    }
    console.log("Display : ", props.displayCountry.name.common)
    const [weatherState, setWeatherState] = useState<WeatherState>({
        temp: 0, wind: 0, icon: '', desc: ''
    })
    const [weatherLoc, setWeatherLoc] = useState<WeatherLocation>({
        lat:0, lon: 0
    })
    useEffect(() => {
        const lat = props.displayCountry.capitalInfo.latlng[0];
        const lon = props.displayCountry.capitalInfo.latlng[1];
        console.log("called for ", lat, lon, weatherLoc.lat, weatherLoc.lon)
        if (lat != weatherLoc.lat && lon != weatherLoc.lon) {
            console.log("in loop ", lat, lon, weatherLoc.lat, weatherLoc.lon)
            setWeatherLoc({
                lat: lat,
                lon: lon
            })
            weatherService
                .getWeather(lat, lon)
                .then((weather: WeatherInterface) => {
                    console.log(weather)
                    setWeatherState({
                        temp: weather.main.temp,
                        wind: weather.wind.speed,
                        icon: weather.weather[0].icon,
                        desc: weather.weather[0].description
                    })
            
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [props.displayCountry])

    if (weatherState.temp == 0) {
        return <></>
    }
    const tempCelcius = weatherState.temp - 273.0
    return (<div>
        <h2> Weather in {props.displayCountry.capital[0]}</h2>
        <p> temperature : {tempCelcius.toString()} Celcius </p>
        <img src={weatherService.getIconUrl(weatherState.icon)} alt={weatherState.desc} style={{ border: "1px solid black" }} />
        <p>Wind  : {weatherState.wind} m/s</p>
    </div>)
}

export default Weather
