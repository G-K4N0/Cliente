import styles from '../styleComponents/Inicio.module.scss'
import { BarraNavegacion } from './Navbar'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import { useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import { CurrentCard } from '../Card/CurrentCard'
import { convertStringToTime } from '../../services/convertStringToTime'
import { SuccessAlert } from '../Alerts/Success'
import { ErrorAlert } from '../Alerts/Error'

export function Inicio () {
  const axiosPrivate = useAxiosPrivate()
  const [horarios, setHorarios] = useState([])
  const [horario, setHorario] = useState(null)
  const [time, setTime] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [showSucces, setShowSucces] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    axiosPrivate
      .get('/horarios/dias')
      .then((response) => {
        if (Object.keys(response.data).length === 0) {
          setMensaje('No hay datos para mostrar')
          setShowSucces(true)
        } else {
          const horariosFiltrados = response.data.filter((horario) => {
            return (
              time > convertStringToTime(horario.inicia) &&
              time < convertStringToTime(horario.finaliza)
            )
          })
          setHorarios(horariosFiltrados)
        }
      })
      .catch((error) => {
        setMensaje(error)
        setShowError(true)
      })
  }, [axiosPrivate, time])

  useEffect(() => {
    axiosPrivate
      .get(`/horarios/one/${2}`)
      .then((response) => {
        setHorario(response?.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  useEffect(() => {
    const interval = setInterval(() => {
      /* const localTime = new Date()
      const horaActual =
        localTime.getTime() + localTime.getTimezoneOffset() * 6000 */
      const hora = new Date()
      setTime(hora.toLocaleTimeString('es-MX'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const elementos =
    horarios.length > 0
      ? (
          horarios.map((horario, index) => (
        <Card
          key={horario.laboratorio + index}
          laboratorio={horario.laboratorio}
          materia={horario.materia}
          inicio={horario.inicia}
          fin={horario.finaliza}
          grupo={horario.grupo}
          status={horario.ocupado}
          imagen={horario.image.url}
          carrera={horario.carrera}
          usuario={horario.docente}
        />
          ))
        )
      : (
      <h1>No hay horarios en inicio</h1>
        )

  return (
    <div>
      <BarraNavegacion login="Iniciar sesión" />
      <div className={`container-fluid ${styles.containerInicio}`}>
        <SuccessAlert
          show={showSucces}
          setShow={setShowSucces}
          mensaje={mensaje}
        />
        <ErrorAlert show={showError} setShow={setShowError} error={mensaje} />
        <div className={styles.cards}>{elementos}</div>
        <div className={styles.card}>
          {horario == null
            ? (
            <p>Cargando...</p>
              )
            : (
            <CurrentCard
              imagen={horario.usuario.image.url}
              materia={horario.materium.name}
              docente={horario.usuario.name}
              inicio={horario.inicia}
              fin={horario.finaliza}
            />
              )}
        </div>
      </div>
    </div>
  )
}
