import axios from 'axios'

const baseUrl = 'https://centroapi.azurewebsites.net/careers'
const token = localStorage.getItem('token') 
export const getAllCareersRequest = async () =>
  await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const getCareerRequest = async (id) =>
  await axios.get(baseUrl + `/${id}`)

export const createCareerRequest = async (career) =>
  await axios.post(baseUrl, career)

export const updateCareerRequest = async (id) =>
  await axios.put(baseUrl + `/${id}`)

export const deleteCareerRequest = async (id) =>
  await axios.delete(baseUrl + `/${id}`)
