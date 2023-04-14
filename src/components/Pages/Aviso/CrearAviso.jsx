import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { SuccessAlert } from '../../Alerts/Success'
export const CrearAviso = ({ show, onHide }) => {
  const [titulo, setTitulo] = useState('')
  const [detalles, setDetalles] = useState('')
  const axiosPrivate = useAxiosPrivate()

  const handleClose = () => onHide()
  const handleSubmit = (e) => {
    e.preventDefault()

    const data = { titulo, detalles }
    axiosPrivate.post('/avisos', data).then(response => {
      <SuccessAlert mensaje={response.data} />
    })
    handleClose()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Form.Group>
            <Form.Group
            controlId="detalles"
            className="mb-3"
            >
              <Form.Label>Detalles</Form.Label>
              <Form.Control as="textarea" rows={3}
                placeholder="Ingrese los detalles"
                value={detalles}
                onChange={(e) => setDetalles(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
