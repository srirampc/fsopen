import blogService from '../services/blogs'
import loginService from '../services/login'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILoginUser } from '../ifx'
import { AppDispatch } from '../store'

const emptyState: ILoginUser = { username: '', password: '' }

const userReducer = createSlice({
  name: 'user',
  initialState: emptyState,
  reducers: {
    updateUser: (_st, action: PayloadAction<ILoginUser>) => {
      return action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      return { ...state, username: action.payload }
    },
    setPassword: (state, action: PayloadAction<string>) => {
      return { ...state, password: action.payload }
    },
    resetUser: () => { return emptyState },
  },
})


export const { updateUser, setUserName, setPassword, resetUser } =
  userReducer.actions

export const initializeUser = () => {
  return async (dispatch: AppDispatch) => {
    const loggedUserJSON = window.localStorage.getItem(loginService.tokenKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(updateUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginUser = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    const user = (await loginService
      .login({
        username,
        password,
      })) as ILoginUser
    console.log(user)
    window.localStorage.setItem(loginService.tokenKey, JSON.stringify(user))
    if (user.token) {
      blogService.setToken(user.token)
    }
    dispatch(updateUser(user))
  }
}

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    window.localStorage.removeItem(loginService.tokenKey)
    dispatch(resetUser())
  }
}

export default userReducer.reducer
