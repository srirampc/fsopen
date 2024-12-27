import axios from 'axios'

const baseUrl = "http://api.openweathermap.org/data/2.5/weather"

const weather_api_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

const getWeather = (lat: Number, lon: Number) => {
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&APPID=${weather_api_key}`)
    return request.then(response => response.data)
}

const getIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export default { getWeather, getIconUrl }
