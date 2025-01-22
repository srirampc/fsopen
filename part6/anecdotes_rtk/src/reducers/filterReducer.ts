import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = ''

const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (_st: string, action: PayloadAction<string>) => action.payload,
    resetFilter: () => '',
  },
})

export const { setFilter, resetFilter } = filterReducer.actions
export default filterReducer.reducer
