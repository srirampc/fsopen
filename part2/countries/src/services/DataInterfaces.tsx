export interface CountryInterface {
    name: {common: string},
    area: Number,
    capital: Array<string>,
    flags: {
        png: string,
        alt: string,
    },
    languages: {
        [key: string]: string
    }
}


