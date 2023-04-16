import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth.js'
import useRefreshToken from '../hooks/useRefreshToken.js'
import Cargando from '../components/Alerts/Loading.jsx'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()
  const refresh = useRefreshToken()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(`error -> ${error}`)
      } finally {
        setIsLoading(false)
      }
    }
    !auth?.token ? verifyRefreshToken() : setIsLoading(false)
  }, [auth?.token, refresh])

  return <>{isLoading ? <Cargando /> : <Outlet />}</>
}

export default PersistLogin
