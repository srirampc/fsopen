import FindCountry from './components/FindCountry.tsx'
import Weather from './components/Weather.tsx'
import Country from './components/Country.tsx'
import { useCountry } from './hooks/index.ts'

const App = () => {
  console.log('App render', import.meta.env.MODE)
  const uCountry = useCountry('')

  return (
    <>
      <FindCountry uCountry={uCountry} />
      <Country uCountry={uCountry} />
      <Weather uCountry={uCountry} />
    </>
  )
}

export default App
