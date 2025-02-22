import axios from 'axios'
import { ILoginUser } from '../ifx'

const baseUrl = '/api/login'
const tokenKey = 'loggedBlogsUser'

const login = async (credentials: ILoginUser) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login, tokenKey }
