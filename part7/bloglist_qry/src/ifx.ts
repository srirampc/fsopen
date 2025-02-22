import { ReactNode } from 'react'

export interface IHandleTogglable {
  toggleVisibility: () => void
}

export interface IBlog {
  title: string
  author: string
  url: string
  likes: number
  id?: string
  user?: IUser
}

export interface IUser {
  username: string
  password: string
  name?: string
  token?: string
}

export interface INotification {
  message: string
  className: string
}

export interface IPropsBlog {
  blog: IBlog
}

export interface IPropsAddBlog {
  toggleUI: () => void
}

export interface IPropsTogglable {
  buttonLabel: string
  children?: ReactNode
}
