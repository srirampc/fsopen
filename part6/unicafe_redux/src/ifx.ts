export enum EActionType {
  GOOD = 'GOOD',
  OK = 'OK',
  BAD = 'BAD',
  ZERO = 'ZERO',
  DO_NOTHING = 'DO_NOTHING',
}

export interface ICounterAction {
  type: EActionType
}
