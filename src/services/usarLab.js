import axios from 'axios'

const baseUrl = 'https://centroapi.azurewebsites.net/labs'
const token = localStorage.getItem('token')
export const getAllLabsRequest = async () =>
  await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const getLabsRequest = async (id) =>
  await axios.get(baseUrl + `/${id}`)

export const createLabRequest = async (lab) =>
  await axios.post(baseUrl, lab)

export const updateLabRequest = async (id, newData) =>
  await axios.put(baseUrl + `/${id}`, newData)

export const deleteLabRequest = async (id) =>
  await axios.delete(baseUrl + `/${id}`)
