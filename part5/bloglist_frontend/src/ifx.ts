import { SetStateAction, Dispatch, ReactNode } from 'react'

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

export interface IMessage {
  message: string | null
  className: string
}

export interface IPropsBlog {
  blog: IBlog
  updateBlog: (updatedBlog: IBlog) => void
  deleteBlog: (blogToDelete: IBlog) => void
  user: IUser | null
}

export interface IPropsBlogList {
  blogs: IBlog[]
  setBlogs: Dispatch<SetStateAction<IBlog[]>>
  user: IUser | null
  setNotifyMessage: Dispatch<IMessage>
}

export interface IPropsLogin {
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
  setNotifyMessage: Dispatch<IMessage>
}

export interface IPropsNotification {
  message: string | null
  className: string
}

export interface IPropsLogout {
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
}

export interface IPropsAddBlog {
  blogs: IBlog[]
  setBlogs: Dispatch<SetStateAction<IBlog[]>>
  setNotifyMessage: Dispatch<IMessage>
  updateUI: () => void
}

export interface IPropsTogglable {
  buttonLabel: string
  children?: ReactNode
}

export interface IHandleTogglable {
  toggleVisibility: () => void
}
