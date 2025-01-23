import { SyntheticEvent } from 'react'
import { setFilter } from '../reducers/filterReducer'
import { useAppDispatch } from '../hooks'

const FilterForm = () => {
  const dispatch = useAppDispatch()

  const updateFilter = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      value: string 
    }
    const content = target.value
    dispatch(setFilter(content))
  }

  return (
    <div>
      filter anecdotes
      <input name="anecdote" onChange={updateFilter}/>
    </div>
  )
}

export default FilterForm
