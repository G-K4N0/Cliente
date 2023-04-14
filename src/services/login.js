import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL

const login = async (credentials) => {
  const response = await axios.post(`${apiUrl}/login`, credentials, {
    withCredentials: true
  })
  return response
}
export default login
