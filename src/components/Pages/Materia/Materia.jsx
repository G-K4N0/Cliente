import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Editar } from './Editar.jsx'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
import { SuccessAlert } from '../../Alerts/Success.jsx'
import { ErrorAlert } from '../../Alerts/Error.jsx'
import { Agregar } from './Agregar.jsx'

export const Materia = () => {
  const [materias, setMaterias] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedMateriaId, setSelectedMateriaId] = useState(null)
  const [newValue, setNewValue] = useState('')
  const [showSucces, setShowSucces] = useState(false)
  const [showError, setShowError] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const axiosPrivate = useAxiosPrivate()
  const [updateTable, setUpdateTable] = useState(false)

  useEffect(() => {
    axiosPrivate
      .get('/materias', {
        params: {
          page: currentPage,
          limit: 6
        }
      })
      .then((response) => {
        if (Object.keys(response.data).length === 0) {
          setMensaje('No hay materias aún')
          setShowSucces(true)
        } else {
          setMaterias(response?.data?.topics)
          setTotalPages(response?.data?.totalPages)
          setUpdateTable(false)
        }
      })
      .catch((error) => {
        setMensaje(error)
        setShowError(true)
      })
  }, [axiosPrivate, updateTable, currentPage])

  const handleEdit = async (event) => {
    event.preventDefault()

    const updatedMateria = {
      ...materias.find((m) => m.id === selectedMateriaId),
      name: newValue
    }

    try {
      const dataForm = new FormData()
      dataForm.append('name', updatedMateria.name)
      const response = await axiosPrivate.put(
        `/materias/${selectedMateriaId}`,
        dataForm
      )
      const updatedMaterias = materias.map((materia) =>
        materia.id === selectedMateriaId ? response.data : materia
      )
      setMaterias(updatedMaterias)
      setShowModal(false)
      setUpdateTable(true)
    } catch (error) {
      setMensaje(error)
      setShowError(true)
    }
  }
  const handleCancel = () => {
    setShowModal(false)
  }

  const handleDelete = async (id) => {
    axiosPrivate
      .delete(`/materias/${id}`)
      .then((response) => {
        setUpdateTable(true)
      })
      .catch((error) => {
        setMensaje(error)
        setShowError(true)
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
      <SuccessAlert
        show={showSucces}
        setShow={setShowSucces}
        mensaje={mensaje}
      />
      <ErrorAlert
        show={showError}
        setShow={setShowError}
        error={mensaje.toString()}
      />
      <Agregar
      setUpdateTable={setUpdateTable}
      />
      <Table responsive striped hover variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>Materia</th>
          </tr>
        </thead>
        <tbody>{materiasRender}</tbody>
        <tfoot>
          <tr>
            <td>
              <Button
                variant="secondary"
                onClick={() => setCurrentPage(currentPage - 1)}
                enabledd={currentPage === totalPages}
                disabled={currentPage === 1}
              >
                {' '}
                Anterior
              </Button>
            </td>
            <td>
              <span>
                {currentPage} de {totalPages}
              </span>
            </td>
            <td>
              <Button
                variant="secondary"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
