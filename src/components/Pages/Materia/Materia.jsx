import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Editar } from './Editar.jsx'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'

export const Materia = () => {
  const [materias, setMaterias] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedMateriaId, setSelectedMateriaId] = useState(null)
  const [newValue, setNewValue] = useState('')
  const [renderTable, setRenderTable] = useState(false)
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    axiosPrivate
      .get('/materias')
      .then((response) => {
        if (Object.keys(response.data).length === 0) {
          alert('Aún no hay materias por mostrar')
        } else {
          console.log(response.data)
          setMaterias(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate, renderTable])

  const handleEdit = async (event) => {
    event.preventDefault()

    const updatedMateria = {
      ...materias.find((m) => m.id === selectedMateriaId),
      name: newValue
    }
    console.log(updatedMateria.name)

    try {
      const dataForm = new FormData()
      dataForm.append('name', updatedMateria.name)
      const response = await axiosPrivate.put(`/materias/${selectedMateriaId}`, dataForm)
      const updatedMaterias = materias.map((materia) =>
        materia.id === selectedMateriaId ? response.data : materia
      )
      setMaterias(updatedMaterias)
      setShowModal(false)
      setRenderTable((prev) => !prev)
      setRenderTable(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCancel = () => {
    setShowModal(false)
  }

  const handleDelete = async (id) => {
    axiosPrivate.delete(`/materias/${id}`).then(response => {
      console.log(response.data.message)
      setRenderTable(true)
    }).catch(error => {
      console.log(error)
    })
  }
  const materiasRender = materias.map((materia) => (
    <tr key={materia.id}>
      <td>{materia.id}</td>
      <td>{materia.name}</td>
      <td>
        <Button
          key={materia.id}
          variant="danger"
          onClick={() => {
            setShowModal(true)
            setSelectedMateriaId(materia.id)
          }}
        >
          Editar
        </Button>
      </td>
      <td>
        <Button
          key={materia.id}
          onClick={() => handleDelete(materia.id)}
          variant="danger"
        >
          Eliminar
        </Button>
      </td>
    </tr>
  ))

  return (
    <div>
      <Editar
        selectedMateriaId={selectedMateriaId}
        showModal={showModal}
        handleCancel={handleCancel}
        materias={materias}
        handleEdit={handleEdit}
        setNewValue={setNewValue}
        newValue={newValue}
      />
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>Materia</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{materiasRender}</tbody>
      </Table>
    </div>
  )
}
