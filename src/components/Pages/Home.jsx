import { Card } from '../Card/Card'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
export function Home () {
  const [horarios, setHorarios] = useState([])
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    async function horarios () {
      axiosPrivate
        .get('/')
        .then((response) => {
          setHorarios(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    horarios()
  }, [axiosPrivate])
  return (
    <div>
      {horarios.map((horario) => (
        <Card
          key={horario.id}
          inicio={horario.inicia}
          fin={horario.finaliza}
          grupo={horario.grupo.name}
          semestre={horario.grupo.semestre.name}
          status={horario.lab.ocupado}
          usuario={horario.usuario.name}
          laboratorio={horario.lab.name}
          materia={horario.materium.name}
          carrera={horario.grupo.carrera.name}
          imagen={horario.usuario.image.url}
        />
      ))}
    </div>
  )
}
