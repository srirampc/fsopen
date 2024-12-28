import { CountryPropsInterface } from "./CompInterfaces"

const Country = (props: CountryPropsInterface) => {
    console.log('Country render')
    if (props.displayCountry == null) {
        return (<></>)
    }

    return (
        <div>
            <h1>
                {props.displayCountry.name.common}
            </h1>
            <div>
                <p>Capital : {props.displayCountry.capital[0]}</p>
                <p>Area : {props.displayCountry.area.toString()} </p>
            </div>
            <h2>
                languages:

            </h2>
            {props.displayCountry == null ? "" :
                <>
                    <div>
                        <ul>
                            {Object.keys(props.displayCountry.languages).map(
                                lx => <li key={lx}>{
                                    props.displayCountry == null ? "" :
                                        props.displayCountry.languages[lx]
                                }</li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <img src={props.displayCountry.flags.png} alt={props.displayCountry.flags.alt} style={{ border: "1px solid black" }} />
                    </div>
                </>
            }
        </div>
    )
}


export default Country
