import { Card } from '../Card/Card'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './Home.scss'
import { SuccessAlert } from '../Alerts/Success'
import { ErrorAlert } from '../Alerts/Error'
import { convertStringToTime } from '../../services/convertStringToTime.js'

export function Home () {
  const [horarios, setHorarios] = useState([])
  const [showSucces, setShowSucces] = useState(false)
  const [showError, setShowError] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const axiosPrivate = useAxiosPrivate()
  const [time, setTime] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const hora = new Date()
      setTime(hora.toLocaleTimeString('es-MX'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function getHorarios () {
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
    }

    getHorarios()
  }, [axiosPrivate, time])

  const elementos = horarios.length > 0
    ? (
        horarios.map((horario, index) => (
      <Card
        key={index}
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
    <h1>No hay horarios en Home</h1>
      )

  return (
    <>
      <div>
        <SuccessAlert
          show={showSucces}
          setShow={setShowSucces}
          mensaje={mensaje}
        />
        <ErrorAlert show={showError} setShow={setShowError} error={mensaje} />
      </div>
      <div className="container-fluid  disposicion">{elementos}</div>
    </>
  )
}
