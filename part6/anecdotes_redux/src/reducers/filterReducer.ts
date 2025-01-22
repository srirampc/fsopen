import { EFilterAction, IFilterAction } from "../ifx";


const filterReducer = (state: string = '', action: IFilterAction) => {
  switch (action.type) {
    case EFilterAction.RESET_FILTER:
        return ''
    case EFilterAction.SET_FILTER:
        return action.payload
    default:
      return state
  }
}

export const setFilter = (filter: string) : IFilterAction => {
    return {
        type: EFilterAction.SET_FILTER,
        payload: filter
    }
}

export default filterReducer
