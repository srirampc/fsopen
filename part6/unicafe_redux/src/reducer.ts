import { EFeedback, IAppState, ICounterAction } from "./ifx"

const initialState: IAppState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action: ICounterAction) => {
  console.log(action)
  switch (action.type) {
    case EFeedback.GOOD:
      return { ...state, good: state.good + 1 }
    case EFeedback.OK:
      return { ...state, ok: state.ok + 1 }
    case EFeedback.BAD:
      return { ...state, bad: state.bad + 1 }
    case EFeedback.ZERO:
      return { good: 0, bad: 0, ok: 0 }
    default: return state
  }
}

export default counterReducer
