import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { INotification } from '../ifx'

const initialState: INotification = { message: '', className: '' }

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification: (_st, action: PayloadAction<INotification>) =>
      action.payload,
    resetNotification: () => { return { message: '', className: '' } },
  },
})

export const { updateNotification, resetNotification } =
    notificationReducer.actions

export const setNotification = (notif: INotification, delay: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateNotification(notif))
    setTimeout(() => {
      dispatch(resetNotification())
    }, delay * 1000)

  }
}

export default notificationReducer.reducer
