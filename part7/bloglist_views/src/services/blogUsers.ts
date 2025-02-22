import axios from 'axios'
import { IBlogUser } from '../ifx'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data as IBlogUser[])
}

export default { getAll }
