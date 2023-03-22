import { getAllMateriasRequest } from '../../../services/Materia.js'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

export const Materia = () => {
  const [materias, setMaterias] = useState([])

  useEffect(() => {
    const getMaterias = async () => {
      const datosMaterias = await getAllMateriasRequest()
      setMaterias(datosMaterias.data)
    }
    getMaterias()
  }, [])

  return (
   <div>
      <Table responsive striped bordered hover variant='dark' >
        <thead>
          <tr>
            <th >id</th>
            <th >Materia</th>
            <th ></th>
            <th ></th>
          </tr>
        </thead>
        <tbody>

          {materias.map(materia => (
            <tr key={materia.id}>
            <td>{materia.id}</td>
            <td>{materia.name}</td>
            <td>  <Button variant="danger">Editar</Button></td>
            <td>  <Button variant="danger" >Eliminar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
   </div>
  )
}
