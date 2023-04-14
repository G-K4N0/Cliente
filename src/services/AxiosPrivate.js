import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL
export const axiosCustom = axios.create({
  baseURL: apiUrl
})

export const axiosPrivate = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'multipart/mixed' }
})
