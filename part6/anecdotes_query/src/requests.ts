import axios from 'axios'
import { IAnecdote } from './ifx'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const createAnecdote = (newAnecdote: IAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data)


export const updateAnecdote = (updAnecdote: IAnecdote) =>
  axios.put(`${baseUrl}/${updAnecdote.id}`, updAnecdote).then((res) => res.data)
