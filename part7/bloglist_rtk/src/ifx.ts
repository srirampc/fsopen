import { ReactNode } from 'react'

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

export interface IHandleTogglable {
  toggleVisibility: () => void
}

export interface INotification {
  message: string | null
  className: string
}

export interface IPropsBlog {
  blog: IBlog
  handleLike: (updatedBlog: IBlog) => void
  handleRemove: (blogToDelete: IBlog) => void
}

export interface IPropsAddBlog {
  toggleVisibility: () => void
}

export interface IPropsTogglable {
  buttonLabel: string
  children?: ReactNode
}
