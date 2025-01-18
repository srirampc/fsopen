import { EActionType, IAnecdote, IAnecdoteAction } from '../ifx'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote: string): IAnecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action: IAnecdoteAction) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case EActionType.CREATE:
        return state.concat(action.payload as IAnecdote)
    case EActionType.VOTE: {
      const fid = action.payload.id
      const foundNote = state.find((anx) => anx.id === fid)
      if (foundNote) {
        return state.map((anx) =>
          anx.id !== fid ? anx : { ...anx, votes: anx.votes + 1 },
        )
      } else {
        return state
      }
    }
    default:
      break
  }

  return state
}

export const createAnecdote = (content: string) : IAnecdoteAction => {
   return {
        type: EActionType.CREATE, 
        payload: asObject(content) 
    }
}

export const voteAnecdote = (id: string): IAnecdoteAction => {
  return {
    type: EActionType.VOTE,
    payload: { id },
  }
}

export default reducer
