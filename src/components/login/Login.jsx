import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import login from '../../services/login'
import styles from '../styleComponents/Login.module.scss'

export const Login = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard/inicio'

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [showPwd, setShowPwd] = useState(false)

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await login({ user, password: pwd })
      const token = response?.data?.token
      const roles = [response?.data?.rol]
      setAuth({ user, pwd, roles, token })
      setUser('')
      setPwd('')
      navigate(from, { replace: true })
    } catch (error) {
      if (!error?.response) {
        setErrMsg('El servidor no responde')
      } else if (error.response?.status === 400) {
        setErrMsg('Usuario y/o contraseña incorrectos')
      } else if (error.response?.status === 401) {
        setErrMsg('Usuario no autorizado')
      } else {
        setErrMsg('Inicio fallido')
      }
    }
  }

  const togglePwdVisibility = () => {
    setShowPwd((prevShowPwd) => !prevShowPwd)
  }

  return (
    <div className={styles.overlay}>

      <form onSubmit={handleLogin} className={styles.formulario}>
        <div className={styles.con}>
          <p
            className={errMsg ? styles.errMsg : styles.offscreen}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <header className={styles.head_form}>
            <h2>Inicio de Sesión</h2>
          </header>

          <br />
          <div className={styles.field_set}>
            <span className={styles.input_item}>
              <i className="fa fa-user-circle"></i>
            </span>

            <input
              className={`${styles.form_input} ${styles.txt_input}`}
              id=""
              type="text"
              placeholder="Usuario"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              autoComplete="off"
              required
            />

            <br />

            <span className={styles.input_item}>
              <i className="fa fa-key"></i>
            </span>

            <input
              className={styles.form_input}
              type={showPwd ? 'text' : 'password'}
              placeholder="Password"
              id="pwd"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              autoComplete="off"
              required
            />

            <span>
              <i
                className={`fa ${showPwd ? 'fa-eye-slash' : 'fa-eye'} ${
                  styles.eye
                }`}
                aria-hidden="true"
                type="button"
                onClick={togglePwdVisibility}
              ></i>
            </span>

            <br />

            <button
              type="submit"
              className={ styles.button_login }
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
