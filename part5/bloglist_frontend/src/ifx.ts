import { SetStateAction, Dispatch, ReactNode } from "react"

export interface IBlog {
  title: string
  author: string
  url: string
  likes: number
  id?: string
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
}

export interface IPropsLogin {
    user: IUser | null,
    setUser: Dispatch<SetStateAction<IUser | null>>
}

export interface IPropsNotification {
    message: string | null 
    className: string
}

export interface IPropsLogout {
    user: IUser | null,
    setUser: Dispatch<SetStateAction<IUser | null>>
}

export interface IPropsAddBlog {
    blogs: IBlog[],
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

