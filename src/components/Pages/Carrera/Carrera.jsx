import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Editar } from './Editar.jsx'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
export const Carrera = () => {
  const [carreras, setCarreras] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedCarreraId, setSelectedCarreraId] = useState(null)
  const [newValue, setNewValue] = useState('')
  const [renderTable, setRenderTable] = useState(false)
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getCarreras = async () => {
      const datosCarreras = await axiosPrivate.get('/carreras')
      setCarreras(datosCarreras.data)
    }
    getCarreras()
  }, [axiosPrivate])

  const handleEdit = async () => {
    const newValue = document.querySelector('input[name="name"]').value
    const updatedCarrera = {
      ...carreras.find((carrera) => carrera.id === selectedCarreraId),
      name: newValue
    }
    try {
      const response = await axiosPrivate.put(`/carreras${selectedCarreraId}`,
        updatedCarrera
      )

      const updatedCarreras = carreras.map((carrera) =>
        carrera.id === selectedCarreraId ? response.data : carrera
      )
      setCarreras(updatedCarreras)
      setShowModal(false)
      setRenderTable(!renderTable)
    } catch (error) {
      alert('No es posible completar la edición en este momento')
    }
  }

  const handleCancel = () => {
    setShowModal(false)
  }
  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/carreras${id}`)
      console.log(response.data.message)
    } catch (error) {
      alert('No es posible eliminar los datos, intente mas tarde')
    }
  }
  const carrerasRender = carreras.map((carrera) => (
    <tr key={carrera.id}>
      <td>{carrera.id}</td>
      <td>{carrera.name}</td>
      <td>
        <Button
          key={carrera.id}
          variant="danger"
          onClick={() => {
            setShowModal(true)
            setSelectedCarreraId(carrera.id)
          }}
        >
          Editar
        </Button>
      </td>
      <td>
        <Button
          key={carrera.id}
          onClick={() => handleDelete(carrera.id)}
          variant="danger"
        >
          Eliminar
        </Button>
      </td>
    </tr>
  ))

  return (
    <div>
      <div>
        <Editar
          selectedCarreraId={selectedCarreraId}
          showModal={showModal}
          handleCancel={handleCancel}
          carreras={carreras}
          handleEdit={handleEdit}
          setNewValue={setNewValue}
          newValue={newValue}
        />
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>id</th>
              <th>Carrera</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{carrerasRender}</tbody>
        </Table>
      </div>
      )
    </div>
  )
}
