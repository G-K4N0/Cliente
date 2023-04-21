import { Card } from '../Card/Card'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './Home.scss'
import { SuccessAlert } from '../Alerts/Success'
import { ErrorAlert } from '../Alerts/Error'
export function Home () {
  const [horarios, setHorarios] = useState([])
  const [renderHorarios, setRenderHorarios] = useState('')
  const [showSucces, setShowSucces] = useState(false)
  const [showError, setShowError] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    function getHorarios () {
      axiosPrivate
        .get('/')
        .then((response) => {
          if (Object.keys(response.data).length === 0) {
            setMensaje('No hay datos para mostrar')
            setShowSucces(true)
          } else {
            setHorarios(response.data)
            setRenderHorarios(
              horarios.map((horario) => (
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
              ))
            )
          }
        })
        .catch((error) => {
          setMensaje(error)
          setShowError(true)
        })
    }

    getHorarios()
  }, [axiosPrivate, setRenderHorarios, horarios])

  return (
    <>
      <div>
        <SuccessAlert
          show={showSucces}
          setShow={setShowSucces}
          mensaje={mensaje}
        />
        <ErrorAlert
        show={showError}
        setShow={setShowError}
        error={mensaje}
         />
      </div>

      <div className='container disposicion'>{renderHorarios}</div>
    </>
  )
}
