import styles from '../styleComponents/Inicio.module.scss'
import { BarraNavegacion } from './Navbar'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import { useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import { CurrentCard } from '../Card/CurrentCard'
export function Inicio () {
  const axiosPrivate = useAxiosPrivate()
  const [horarios, setHorarios] = useState([])
  const [horario, setHorario] = useState(null)
  const [time, setTime] = useState('')

  useEffect(() => {
    axiosPrivate
      .get('/horarios/dias')
      .then((response) => {
        setHorarios(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  useEffect(() => {
    axiosPrivate
      .get(`/horarios/one/${2}`)
      .then((response) => {
        console.log(response.data)
        setHorario(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const localTime = new Date()
      const horaActual =
        localTime.getTime() + localTime.getTimezoneOffset() * 6000
      const hora = new Date(horaActual + 3600000 * 18)
      setTime(hora.toLocaleTimeString('es-MX'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <BarraNavegacion login="Iniciar sesión" />
      <div className={`container-fluid ${styles.containerInicio}`}>
        (<h1>{time}</h1>)
        <div className={styles.cards}>
          {horarios.map((horario) => (
            <Card
              key={horario.id}
              id={horario.id}
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
          ))}
        </div>
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
