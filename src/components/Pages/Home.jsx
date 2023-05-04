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
        .get('/horarios/dias')
        .then((response) => {
          if (Object.keys(response.data).length === 0) {
            setMensaje('No hay datos para mostrar')
            setShowSucces(true)
          } else {
            console.log(response.data)
            setHorarios(response.data)
            setRenderHorarios(
              horarios.map((horario) => (
                <Card
                  key={horario.id}
                  inicio={horario.inicia}
                  fin={horario.finaliza}
                  grupo={horario.grupo}
                  status={horario.ocupado}
                  usuario={horario.docente}
                  laboratorio={horario.laboratorio}
                  materia={horario.materia}
                  carrera={horario.carrera}
                  imagen={horario.image.url}
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
  }, [axiosPrivate, setRenderHorarios])

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

      <div className='container-fluid  disposicion' >{renderHorarios}</div>
    </>
  )
}
