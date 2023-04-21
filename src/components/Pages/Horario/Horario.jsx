import { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
import { ErrorAlert } from '../../Alerts/Error.jsx'
import { SuccessAlert } from '../../Alerts/Success.jsx'
export function Horario () {
  const axiosPrivate = useAxiosPrivate()
  const [selected, setSelected] = useState([])
  const [horarios, setHorarios] = useState([])
  const [showSucces, setShowSucces] = useState(false)
  const [showError, setShowError] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    axiosPrivate
      .get('/')
      .then((response) => {
        if (Object.keys(response.data).length === 0) {
          setMensaje('Aún no hay datos para mostrar')
          setShowSucces(true)
        } else {
          setHorarios(response.data)
        }
      })
      .catch((error) => {
        if (!error?.response) {
          setMensaje('El servidor no responde')
          setShowError(true)
        } else {
          setMensaje(error.response.message)
          setShowError(true)
        }
      })
  }, [axiosPrivate])

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(horarios.map((horario) => horario.id))
    } else {
      setSelected([])
    }
  }

  const handleSelect = (event, id) => {
    if (event.target.checked) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter((selectedId) => selectedId !== id))
    }
  }

  return (
    <div className='container'>
      <SuccessAlert
      mensaje={mensaje}
      show={showSucces}
      setShow={setShowSucces}
      />
      <ErrorAlert
      error={mensaje}
      show={showError}
      setShow={setShowError}
      />
      <Table striped bordered hover responsive variant='dark'>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={selected.length === horarios.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Docente</th>
            <th>Materia</th>
            <th>Grupo</th>
            <th>Semestre</th>
            <th>Laboratorio</th>
            <th>Dia</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.id}>
              <td>
                <input
                  type='checkbox'
                  checked={selected.includes(horario.id)}
                  onChange={(event) => handleSelect(event, horario.id)}
                />
              </td>
              <td>{horario.usuario.name}</td>
              <td>{horario.materium.name}</td>
              <td>
                {horario.grupo.name} - {horario.grupo.tipo.name}
              </td>
              <td>{horario.grupo.semestre.name}</td>
              <td>{horario.lab.name}</td>
              <td>{horario.dia}</td>
              <td>{`${horario.inicia}-${horario.finaliza} `}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Button variant='danger' onClick={() => setSelected([])}>
                Concluir horarios
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
      )
    </div>
  )
}
