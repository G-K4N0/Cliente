import axios from 'axios'

const baseUrl = 'https://centroapi.azurewebsites.net/privilegio'
export const getAllPrivilegiosRequest = async () =>
  await axios.get(baseUrl)
