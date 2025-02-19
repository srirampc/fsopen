import axios from 'axios'
import { IBlog } from '../ifx'
const baseUrl = '/api/blogs'

let currToken: string | null = null

const setToken = (newToken: string) => {
  currToken = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject: IBlog) => {
  const config = {
    headers: { Authorization: currToken },
  }
  return axios
    .post(baseUrl, newObject, config)
    .then((response) => response.data)
}

const update = (updateObject: IBlog) => {
  const config = {
    headers: { Authorization: currToken },
    params: {
      id: updateObject.id,
    },
  }
  return axios
    .put(`${baseUrl}/${updateObject.id}`, updateObject, config)
    .then((response) => response.data as IBlog)
}

const deleteBlog = (delObject: IBlog) => {
  const config = {
    headers: { Authorization: currToken },
    params: {
      id: delObject.id,
    },
  }
  return axios
    .delete(`${baseUrl}/${delObject.id}`, config)
    .then((response) => response.data)
}

export default { getAll, create, update, deleteBlog, setToken }
