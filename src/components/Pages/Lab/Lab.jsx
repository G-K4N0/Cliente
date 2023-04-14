import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Editar } from './Editar.jsx'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
import useAuth from '../../../hooks/useAuth.js'

export function Lab () {
  const navigate = useNavigate()
  const [labs, setLabs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedLabId, setSelectedLabId] = useState(null)
  const [newNameValue, setNewNameValue] = useState('')
  const [newStatusValue, setNewStatusValue] = useState('')
  const [renderTable, setRenderTable] = useState(false)
  const [isOcupado, setIsOcupado] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    axiosPrivate
      .get('/labs')
      .then((response) => {
        setLabs(response?.data)
        console.log(response?.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  const handleEdit = async () => {
    const newName = document.querySelector('input[name="labName"]').value
    const newStatus = document.querySelector('input[name="labStatus"]').value
    const updateLab = {
      ...labs.find((lab) => lab.id === selectedLabId),
      name: newName,
      ocupado: newStatus
    }
    try {
      const response = await axiosPrivate.put(`/labs/${selectedLabId}`, updateLab)
      const updatedLabs = labs.map((lab) =>
        lab.id === selectedLabId ? response.data : lab
      )
      setLabs(updatedLabs)
      setRenderTable(renderTable)
    } catch (error) {
      alert(error)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/labs/${id}`)
      console.log(response.data)
    } catch (error) {
      alert('No es posible eliminar el elemento')
    }
  }

  const handleOcupado = async (id) => {
    const dataForm = new FormData()
    if (isOcupado !== true) {
      dataForm.append('ocupado', true)
      axiosPrivate.put(`/labs/${id}`, dataForm, useAuth).then(response => {
        setIsOcupado(true)
      }).catch(error => {
        console.log(error)
      })
    } else {
      dataForm.append('ocupado', false)
      axiosPrivate
        .put(`/labs/${id}`, dataForm, useAuth)
        .then((response) => {
          console.log(response.data)
          setIsOcupado(false)
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            alert(`${error.response.data}`)
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
          variant="danger"
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
      <Table responsive striped bordered hover variant="dark">
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
