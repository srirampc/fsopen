import { IHCountryProps } from '../ifx'

const Country = ({ uCountry }: IHCountryProps) => {
  console.log('Country render')
  if (uCountry == null || uCountry.country == null) {
    return <></>
  }

  const country = uCountry.country

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital : {country.capital[0]}</p>
        <p>Area : {country.area.toString()} </p>
      </div>
      <h2>languages:</h2>
      <div>
        <ul>
          {Object.keys(country.languages).map((lx) => (
            <li key={lx}>{country.languages[lx]}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          style={{ border: '1px solid black' }}
        />
      </div>
    </div>
  )
}

export default Country
