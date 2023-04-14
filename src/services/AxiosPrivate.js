import axios from 'axios'

const BASE_URL = 'https://centroapi.azurewebsites.net'

export const axiosCustom = axios.create({
  baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'multipart/mixed' }
})
