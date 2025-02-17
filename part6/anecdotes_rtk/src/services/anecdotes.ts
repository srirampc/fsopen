import axios from "axios"
import { IAnecdote } from "../ifx"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content: string) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id: string, newObject: IAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default {
  getAll,
  createNew,
  update,
}
