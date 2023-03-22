import axios from 'axios'

const baseUrl = 'https://centroapi.azurewebsites.net/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)

  localStorage.setItem('token', response.data.token)
  return response
}
export default login
