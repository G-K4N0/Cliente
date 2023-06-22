import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Editar } from './Editar.jsx'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
import { SuccessAlert } from '../../Alerts/Success.jsx'
import { ErrorAlert } from '../../Alerts/Error.jsx'

export function Lab () {
  const navigate = useNavigate()
  const [labs, setLabs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedLabId, setSelectedLabId] = useState(null)
  const [newNameValue, setNewNameValue] = useState('')
  const [newStatusValue, setNewStatusValue] = useState('')
  const [renderTable, setRenderTable] = useState(false)
  const [isOcupado, setIsOcupado] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [showError, setShowError] = useState(false)
  const [showSucces, setShowSucces] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    axiosPrivate
      .get('/labs')
      .then((response) => {
        if (Object.keys(response.data).length === 0) {
          setMensaje('Aun no hay datos en la base de datos')
          setShowSucces(true)
          setRenderTable(false)
        } else {
          setLabs(response?.data)
          setRenderTable(false)
        }
      })
      .catch((error) => {
        if (!error?.response) {
          setMensaje('El servidor no responde')
          setShowError(true)
        } else if (error.response?.message) {
          setMensaje(error.response.message)
          setShowError(true)
        }
      })
  }, [axiosPrivate, renderTable])

  const handleEdit = async () => {
    const newName = document.querySelector('input[name="labName"]').value
    const updateLab = {
      ...labs.find((lab) => lab.id === selectedLabId),
      name: newName
    }
    try {
      const response = await axiosPrivate.put(
        `/labs/${selectedLabId}`,
        updateLab
      )
      const updatedLabs = labs.map((lab) =>
        lab.id === selectedLabId ? response.data : lab
      )
      setLabs(updatedLabs)
      setRenderTable(true)
    } catch (error) {
      if (!error?.response) {
        setMensaje('El servidor no responde')
        setShowError(true)
      } else if (error.response?.message) {
        setMensaje(error.response.message)
        setShowError(true)
      }
    }
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/labs/${id}`)
      if (!response?.message) {
        setMensaje('El servidor no responde')
        setShowError(true)
      } else if (response?.message) {
        setMensaje(response.message)
        setShowSucces(true)
      }
    } catch (error) {
      if (!error?.response) {
        setMensaje('El servidor no responde')
        setShowError(true)
      } else if (error.response?.message) {
        setMensaje(error.response.message)
        setShowError(true)
      }
    }
  }

  const handleOcupado = async (id) => {
    const dataForm = new FormData()
    if (isOcupado !== true) {
      dataForm.append('ocupado', true)
      axiosPrivate
        .put(`/labs/ocupar/${id}`, dataForm)
        .then((response) => {
          setIsOcupado(true)
          setRenderTable(true)
        })
        .catch((error) => {
          setMensaje(error.response.data)
        })
    } else {
      dataForm.append('ocupado', false)
      axiosPrivate
        .put(`/labs/ocupar/${id}`, dataForm)
        .then((response) => {
          setIsOcupado(false)
          setRenderTable(true)
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            setMensaje(error.response.data)
            navigate('/login')
          }
        })
    }
  }
  const labsRender = labs.map((lab) => (
    <tr key={lab.id}>
      <td>{lab.id}</td>
      <td>{lab.name}</td>
      <td>
        <Button onClick={() => handleOcupado(lab.id)}>
          {lab.ocupado ? 'Ocupado' : 'Libre'}
        </Button>
      </td>
      <td>
        <Button
          key={lab.id}
          variant='danger'
          onClick={() => {
            setShowModal(true)
            setSelectedLabId(lab.id)
          }}
        >
          Editar
        </Button>
      </td>
      <td>
        <Button
          key={lab.id}
          onClick={() => handleDelete(lab.id)}
          variant='danger'
        >
          Eliminar
        </Button>
      </td>
    </tr>
  ))

  return (
    <div>
      <SuccessAlert
      mensaje={mensaje}
      show={showSucces}
      setShow={setShowSucces}
      />
      <ErrorAlert
      error={mensaje}
      show={showError}
      setShow={setShowSucces}
      />
      <Editar
        selectedMateriaId={selectedLabId}
        showModal={showModal}
        handleCancel={handleCancel}
        labs={labs}
        handleEdit={handleEdit}
        setNewNameValue={setNewNameValue}
        newName={newNameValue}
        setNewStatusValue={setNewStatusValue}
        newStatusValue={newStatusValue}
      />
      <Table responsive striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th></th>
            <th>Laboratorio</th>
            <th>Disponibilidad</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{labsRender}</tbody>
      </Table>
    </div>
  )
}
