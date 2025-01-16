import { EActionType, ICounterAction } from "./ifx"

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action: ICounterAction) => {
  console.log(action)
  switch (action.type) {
    case EActionType.GOOD:
      return state
    case EActionType.OK:
      return state
    case EActionType.BAD:
      return state
    case EActionType.ZERO:
      return state
    default: return state
  }
  
}

export default counterReducer
