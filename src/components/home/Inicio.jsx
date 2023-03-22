import { useEffect, useState } from 'react'
import { getAllHorarioRequest } from '../../services/horario'
import styles from '../styleComponents/Inicio.module.scss'
import { Card } from '../Card/Card'
import { Navbar } from './Navbar'

export function Inicio () {
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
    async function horarios () {
      try {
        const horas = await getAllHorarioRequest()
        setHorarios(horas.data)
      } catch (error) {
        console.log(error)
      }
    }

    horarios()
  }, [])

  if (!horarios) return null

  return (
    <div>
      <Navbar />
      <div className={styles.containerInicio}>
        {
          horarios.map((item) => (
            <Card key={item.id}
            inicio = {item.timeInit}
            fin = {item.timeEnd}
            grupo = {item.grupo.name}
            semestre = {item.grupo.semestre.semester}
            status = {item.lab.status}
            usuario = {item.usuario.name}
            laboratorio = {item.lab.name}
            materia = {item.materium.name}
            carrera = {item.grupo.carrera.name}
            imagen = {item.usuario.imageUrl}
            />
          ))
        }
      </div>
    </div>
  )
}
