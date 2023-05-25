import { axiosCustom } from '../services/AxiosPrivate'
import useAuth from './useAuth'

export const useLogOut = () => {
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth({})
    try {
      const response = await axiosCustom('/logout', {
        withCredentials: true
      })

      console.log(response?.data)
    } catch (error) {
      console.log(error)
    }
  }
  return logout
}
