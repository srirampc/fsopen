import axios from 'axios'
import { IUser } from '../ifx'

const baseUrl = '/api/login'

const login = async (credentials: IUser) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
