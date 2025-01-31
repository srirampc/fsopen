import { SyntheticEvent } from 'react'
import { useField } from '../hooks'
import { IHCountryProps } from '../ifx'

const FindCountry = ({ uCountry }: IHCountryProps) => {
  console.log('filter render')
  const nameInput = useField('', 'text')
  const fetch = (e: SyntheticEvent) => {
    e.preventDefault()
    uCountry?.setCountryName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
    </div>
  )
}

export default FindCountry
