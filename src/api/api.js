import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const login = async (credentials) => {
  const response = await axios.post(`${apiUrl}/login`, credentials, {
    withCredentials: true
  })
  return response
}
