import { IHCountryProps } from '../ifx'

const Weather = ({ uCountry }: IHCountryProps) => {
  if (uCountry === null || uCountry.country == null) {
    return <></>
  }
  console.log('Display Weather : ', uCountry.country.name.common)
  if (uCountry.weatherState.temp == 0) {
    return <></>
  }
  const tempCelcius = uCountry.weatherState.temp - 273.0
  return (
    <div>
      <h2> Weather in {uCountry.country.capital[0]}</h2>
      <p> temperature : {tempCelcius.toString()} Celcius </p>
      <img
        src={uCountry.weatherState.iconUrl}
        alt={uCountry.weatherState.desc}
        style={{ border: '1px solid black' }}
      />
      <p>Wind : {uCountry.weatherState.wind} m/s</p>
    </div>
  )
}

export default Weather
