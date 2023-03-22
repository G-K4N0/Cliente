import axios from 'axios'

const baseUrl = 'https://centroapi.azurewebsites.net/topics'
const token = localStorage.getItem('token')
export const getAllMateriasRequest = async () =>
  await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const getMateriaRequest = async (id) =>
  await axios.get(baseUrl + `/${id}`)

export const createMateriaRequest = async (materiaData) =>
  await axios.post(baseUrl, materiaData)

export const updateMateriaRequest = async (id, newData) =>
  await axios.put(baseUrl + `/${id}`, newData)

export const deleteMateriaRequest = async (id) =>
  await axios.delete(baseUrl + `/${id}`)
