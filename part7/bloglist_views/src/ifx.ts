import { ReactNode } from 'react'

export interface IBlog {
  title: string
  author: string
  url: string
  likes: number
  id?: string
  user?: ILoginUser
  comments?: IComment[]
}

export interface ILoginUser {
  username: string
  password: string
  name?: string
  token?: string
}

export interface IComment {
  text: string
  blog?: IBlog
  id?: string
}

export interface IBlogUser {
  id: string
  username: string
  name: string
  blogs: IBlog[]
}

export interface IHandleTogglable {
  toggleVisibility: () => void
}

export interface INotification {
  message: string | null
  className: string
}

export interface IPropsAddBlog {
  toggleVisibility: () => void
}

export interface IPropsTogglable {
  buttonLabel: string
  children?: ReactNode
}
