import React, { useEffect, useState } from 'react'
import styles from '../styleComponents/Inicio.module.scss'
import { Card } from '../Card/Card'
import { BarraNavegacion } from './Navbar'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

export function Inicio () {
  const [horarios, setHorarios] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    async function obtenerHorarios () {
      try {
        const horas = await axiosPrivate.get('/')
        setHorarios(horas.data)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerHorarios()
  }, [axiosPrivate])

  if (!horarios) return null

  const estaEnRango = (horaActual, inicio, fin) => {
    const horaInicioParts = inicio.split(':')
    const horaFinParts = fin.split(':')
    const horaActualParts = horaActual.split(':')

    const horaInicio = new Date(
      1970,
      0,
      1,
      parseInt(horaInicioParts[0]),
      parseInt(horaInicioParts[1]),
      0
    )
    const horaFin = new Date(
      1970,
      0,
      1,
      parseInt(horaFinParts[0]),
      parseInt(horaFinParts[1]),
      0
    )
    const horaActualDate = new Date(
      1970,
      0,
      1,
      parseInt(horaActualParts[0]),
      parseInt(horaActualParts[1]),
      0
    )

    return horaActualDate >= horaInicio && horaActualDate <= horaFin
  }

  return (
    <div>
      <BarraNavegacion />
      <div className={styles.containerInicio}>
        {horarios.map((horario) => {
          const enRango = estaEnRango(
            currentTime,
            horario.inicia,
            horario.finaliza
          )
          if (enRango) {
            return (
              <Card
                key={horario.id}
                inicio={horario.inicia}
                fin={horario.finaliza}
                grupo={horario.grupo.name}
                semestre={horario.grupo.semestre.semester}
                status={horario.lab.status}
                usuario={horario.usuario.name}
                laboratorio={horario.lab.name}
                materia={horario.materium.name}
                carrera={horario.grupo.carrera.name}
                imagen={horario.usuario.image.url}
              />
            )
          } else {
            return null
          }
        })}
      </div>
    </div>
  )
}
