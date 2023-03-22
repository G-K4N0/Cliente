import axios from 'axios'
const baseUrl = 'https://centroapi.azurewebsites.net/'

export const getAllHorarioRequest = async () =>
  await axios.get(baseUrl)

export const getHorarioRequest = async (id) =>
  await axios.get(baseUrl + `times/${id}`)

export const createHorarioRequest = async (horario) =>
  await axios.post(baseUrl + '/times', horario)

export const updateHorarioRequest = async (id, newHorario) =>
  await axios.put(baseUrl + `times/${id}`, newHorario)

export const deleteHorarioRequest = async (id) =>
  await axios.delete(baseUrl + `times/${id}`)
