import { Store } from 'redux'

export enum EFeedback {
  GOOD = 'GOOD',
  OK = 'OK',
  BAD = 'BAD',
  ZERO = 'ZERO',
  DO_NOTHING = 'DO_NOTHING',
}

export interface ICounterAction {
  type: EFeedback
}

export interface IAppState {
  good: number
  ok: number
  bad: number
}

export interface IAppProps {
  store: Store<IAppState, ICounterAction>
}
