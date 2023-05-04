import useAuth from './useAuth'
import { useEffect } from 'react'
import { axiosPrivate } from '../services/AxiosPrivate.js'
import useRefreshToken from './useRefreshToken.js'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    let requestIntercept
    let responseIntercept

    const configureAxiosInterceptors = () => {
      requestIntercept = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${auth?.token}`
          }
          return config
        },
        (error) => Promise.reject(error)
      )

      responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config
          if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true
            try {
              const newAccessToken = await refresh()
              prevRequest.headers.Authorization = `Bearer ${newAccessToken}`
              return axiosPrivate(prevRequest)
            } catch (error) {
              return Promise.reject(error)
            }
          }
          return Promise.reject(error)
        }
      )
    }

    configureAxiosInterceptors()

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate
