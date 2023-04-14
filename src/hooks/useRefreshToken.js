import { axiosCustom } from '../services/AxiosPrivate.js'
import useAuth from './useAuth.js'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const response = await axiosCustom.get('/refresh', {
      withCredentials: true
    })

    setAuth((prev) => {
      return { ...prev, rol: [response.data.rol], token: response.data.token }
    })
    return [response.data.token, response.data.rol]
  }
  return refresh
}

export default useRefreshToken
