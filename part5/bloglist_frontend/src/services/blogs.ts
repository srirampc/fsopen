import axios from 'axios'
const baseUrl = '/api/blogs'

let currToken : string | null = null

const setToken = (newToken: string) => {
    currToken = `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken }
