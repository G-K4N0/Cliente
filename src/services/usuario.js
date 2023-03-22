import axios from 'axios'

const baseUrl = 'https://centroapi.azurewebsites.net/users'
const token = localStorage.getItem('token')
export const getAllUsersRequest = async () =>
  await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const getUserRequest = async (id) =>
  await axios.get(baseUrl + `/${id}`)

export const createUserRequest = async (data) =>
  await axios.post(baseUrl, data)

export const updateUserRequest = async (id, newData) =>
  await axios.put(baseUrl + `/${id}`, newData)

export const deleteUserRequest = async (id) =>
  await axios.delete(baseUrl + `/${id}`)
