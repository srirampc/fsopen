import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = ''

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (_st: string, action: PayloadAction<string>) =>
      action.payload,
    resetNotification: () => '',
  },
})

export const { setNotification, resetNotification } =
  notificationReducer.actions
export default notificationReducer.reducer
