export interface CountryInterface {
    name: { common: string },
    area: Number,
    capital: Array<string>,
    capitalInfo: {
        latlng: Array<number>,
    }
    flags: {
        png: string,
        alt: string,
    },
    languages: {
        [key: string]: string
    }
}

export interface WeatherDescInterface {
      id: number,
      main: string,
      description: string,
      icon: string
}

export interface WeatherInterface {
  coord: {
    lon: number,
    lat: number
  },
  weather: Array<WeatherDescInterface>,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number,
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number,
    gust: number 
  },
}
