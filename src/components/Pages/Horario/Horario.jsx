import { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
export function Horario () {
  const axiosPrivate = useAxiosPrivate()
  const [selected, setSelected] = useState([])
  const [horarios, setHorarios] = useState([])
  useEffect(() => {
    axiosPrivate.get('/').then(response => {
      setHorarios(response.data)
    }).catch(error => {
      console.log(error)
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
      <Table striped bordered hover responsive variant='dark'>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selected.length === horarios.length}
              onChange={handleSelectAll}
            />
          </th>
          <th>Docente</th>
          <th>Materia</th>
          <th>Grupo</th>
          <th>Semestre</th>
          <th>Laboratorio</th>
          <th>Horario</th>
        </tr>
      </thead>
      <tbody>
        {horarios.map((horario) => (
          <tr key={horario.id}>
            <td>
              <input
                type="checkbox"
                checked={selected.includes(horario.id)}
                onChange={(event) => handleSelect(event, horario.id)}
              />
            </td>
            <td>{horario.usuario.name}</td>
            <td>{horario.materium.name}</td>
            <td>{horario.grupo.name}</td>
            <td>{horario.grupo.semestre.name}</td>
            <td>{horario.lab.name}</td>
            <td>{`${horario.inicia}-${horario.finaliza} `}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <Button variant="danger" onClick={() => setSelected([])}>
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
