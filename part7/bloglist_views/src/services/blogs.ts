import axios from 'axios'
import { IBlog } from '../ifx'
const baseUrl = '/api/blogs'
const commentBaseUrl = '/api/comments'

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
  const request = axios.post(baseUrl, newObject, config)
  return request.then((response) => response.data)
}

const update = (updateObject: IBlog) => {
  const config = {
    headers: { Authorization: currToken },
    params: {
      id: updateObject.id,
    },
  }
  const request = axios.put(`${baseUrl}/${updateObject.id}`, updateObject, config)
  return request.then((response) => response.data)
}

const deleteBlog = (delObject: IBlog) => {
  const config = {
    headers: { Authorization: currToken },
    params: {
      id: delObject.id,
    },
  }
  const request = axios.delete(`${baseUrl}/${delObject.id}`, config)
  return request.then((response) => response.data)
}

const addComment = (cBlog: IBlog, cmtText: string) => {
  const config = {
    headers: { Authorization: currToken },
  }
  const request = axios.post(
    commentBaseUrl, { text: cmtText, blog: cBlog.id }, config
  )
  return request.then((response) => response.data)
}

export default { getAll, create, update, deleteBlog, setToken, addComment }
