import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'

const initialState = ''

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification: (_st: string, action: PayloadAction<string>) =>
      action.payload,
    resetNotification: () => '',
  },
})

export const { updateNotification, resetNotification } =
  notificationReducer.actions

export const setNotification = (notif: string, delay: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateNotification(notif))
    setTimeout(() => {
      dispatch(resetNotification())
    }, delay * 1000)
  }
}
export default notificationReducer.reducer
