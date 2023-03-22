import { Card } from '../Card/Card'
import { useEffect, useState } from 'react'
import { getAllHorarioRequest } from '../../services/horario'

export function Home () {
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
  return (

    <div>
      { horarios.map(horario => (
        <Card key={horario.id}
        inicio={ horario.timeInit }
        fin = { horario.timeEnd }
        grupo = { horario.grupo.name }
        semestre = {horario.grupo.semestre.semester}
        status = {horario.lab.status}
        usuario = {horario.name}
        laboratorio = {horario.lab.name}
        materia = {horario.materium.name}
        carrera = {horario.grupo.carrera.name}
        imagen = {horario.usuario.imagenUrl}
        />
      )) }
    </div>
  )
}
