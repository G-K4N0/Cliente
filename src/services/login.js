import axios from 'axios'

const baseUrl = 'https://centroapi.azurewebsites.net/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials, {
    withCredentials: true
  })
  return response
}
export default login
