import { IBlogUser } from '../ifx'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import blogUserService from '../services/blogUsers'

const emptyState: IBlogUser[] = []

const blogUsersSlice = createSlice({
  name: 'blogs',
  initialState: emptyState,
  reducers: {
    setBlogUsers: (_st: IBlogUser[], action: PayloadAction<IBlogUser[]>) => {
      return action.payload
    },
  }
})


export const { setBlogUsers } = blogUsersSlice.actions


export const initializeBlogUsers = () => {
  return async (dispatch: AppDispatch) => {
    const blogUsers = await blogUserService.getAll()
    dispatch(setBlogUsers(blogUsers))
  }
}


export default blogUsersSlice.reducer
