export interface IAnecdote {
  content: string
  id: string
  votes: number
}

export interface IUpdateAction {
  id: string
}

export enum EActionType {
  CREATE = 'CREATE',
  VOTE = 'VOTE',
}

export interface IAnecdoteAction {
  type: EActionType
  payload: IAnecdote | IUpdateAction
}

export enum EFilterAction {
  SET_FILTER = 'SET_FILTER',
  RESET_FILTER = 'RESET_FILTER',
}

export interface IFilterAction {
  type: EFilterAction
  payload: string
}

export interface AppSate {
    anecdotes: IAnecdote[]
    filter: string
}
