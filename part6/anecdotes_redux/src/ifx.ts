export interface IAnecdote {
  content: string
  id: string
  votes: number
}

export interface IUpdateAction {
    id: string
}

export enum EActionType {
    CREATE = "CREATE",
    VOTE = "VOTE"
}

export interface IAnecdoteAction {
    type: string,
    payload: IAnecdote | IUpdateAction
}
