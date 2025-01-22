import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { SyntheticEvent } from 'react'
import { IFilterAction } from '../ifx'
import { setFilter } from '../reducers/filterReducer'

const FilterForm = () => {
  const dispatch = useDispatch<Dispatch<IFilterAction>>()

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
