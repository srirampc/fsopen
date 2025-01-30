import { SyntheticEvent } from "react"

export interface IAnecdote {
  content: string
  author: string
  info: string
  id?: number
  votes: number
}

export interface IAListProps {
    anecdotes: IAnecdote[]
}

export interface IAnecdoteProps {
    anecdote?: IAnecdote
}

export interface ICreateProps {
    addNew: (anew: IAnecdote) => void
}

export interface INotificationProps {
    notification: string
}

export interface IField<T> {
  type: string
  value: T
  onChange: (event: SyntheticEvent) => void
  reset: () => void
}
