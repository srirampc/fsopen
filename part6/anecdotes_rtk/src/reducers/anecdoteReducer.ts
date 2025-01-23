import { IAnecdote } from '../ifx'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import ancedoteService from '../services/anecdotes'

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

export const sampleInitState = anecdotesAtStart.map(asObject)

const emptyState: IAnecdote[] = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: emptyState,
  reducers: {
    updateAnecdotes(state: IAnecdote[], action: PayloadAction<IAnecdote>) {
      const fid = action.payload.id
      const foundNote = state.find((anx) => anx.id === fid)
      if (foundNote) {
        return state.map((anx) =>
          anx.id !== fid ? anx : { ...action.payload },
        )
      } else {
        return state
      }
    },
    setAnecdotes(_st: IAnecdote[], action: PayloadAction<IAnecdote[]>) {
      return action.payload
    },
    appendAnecdote(state: IAnecdote[], action: PayloadAction<IAnecdote>) {
      state.push(action.payload)
    },
  },
})

export const { updateAnecdotes, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch: AppDispatch) => {
    const anecdotes = await ancedoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content: string) => {
  return async (dispatch: AppDispatch) => {
    const newAnecdote = await ancedoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote: IAnecdote) => {
  return async (dispatch: AppDispatch) => {
    const updAnecdote = await ancedoteService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(updateAnecdotes(updAnecdote))
  }
}

export default anecdoteSlice.reducer
