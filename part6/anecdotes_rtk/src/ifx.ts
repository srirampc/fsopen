export interface IAnecdote {
  content: string
  id: string
  votes: number
}

export interface AppState {
    anecdotes: IAnecdote[]
    filter: string
    notification: string
}
