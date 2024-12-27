import { CountryPropsInterface } from "./CompInterfaces"



const Country = (props: CountryPropsInterface) => {

    if(props.selectedCountries.length == 0 ||
       props.selectedCountries.length > 1){
        return (<></>)
    }

    const country = props.selectedCountries[0]

    console.log(Object.keys(country.languages))

    // {props.country.languages.keys().map(lx => <li>props.country.languages[lx]</li>)}
    return (
        <div>
            <h1>
                {country.name.common}
            </h1>
            <div>
                <p>Capital : {country.capital[0]}</p>
                <p>Area : {country.area.toString()} </p>
            </div>
            <h2>
                languages:

            </h2>
            <div>
                <ul>
                    {
                        Object.keys(country.languages).map(
                            lx => <li key={lx}>{country.languages[lx]}</li>
                        )
                    }
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt={country.flags.alt} style={{border:"1px solid black"}}/>
            </div>
        </div>
    )
}


export default Country
