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
