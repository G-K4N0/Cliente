import { useEffect, useState } from 'react'
import { getAllHorarioRequest } from '../../../services/horario.js'
export function GetHorario () {
  const [horarios, setHorarios] = useState([])
  useEffect(() => {
    const getHorarios = async () => {
      const datosHorarios = await getAllHorarioRequest()
      setHorarios(datosHorarios.data)
    }
    getHorarios()
  }, [])
  return (
    <div>
    {horarios.map(horario => (
      <ul key={horario.id}>
        <li>{horario.day}</li>
      <li>{horario.timeInit}</li>
      <li>{horario.timeEnd}</li>
      <li>{horario.lab.name}</li>
      </ul>
    ))}
    </div>
  )
}
