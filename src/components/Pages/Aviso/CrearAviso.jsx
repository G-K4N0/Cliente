import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { DateTime } from 'luxon'

export const CrearAviso = ({ show, onHide }) => {
  const [titulo, setTitulo] = useState('')
  const [detalles, setDetalles] = useState('')
  const [fechaExpiracion, setFechaExpiracion] = useState('')
  const axiosPrivate = useAxiosPrivate()

  const handleClose = () => onHide()
  const handleSubmit = (e) => {
    e.preventDefault()

    const expiracion = DateTime.fromISO(fechaExpiracion).toISO()

    const dataForm = new FormData()
    dataForm.append('titulo', titulo)
    dataForm.append('detalles', detalles)
    dataForm.append('fecha', expiracion)

    axiosPrivate.post('/avisos', dataForm).then(response => {
      console.log(response.data)
    })
    handleClose()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='fondo encabezado'>
          <Modal.Title>Crear Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body className='cuerpo fondo'>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
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
                required
              />
            </Form.Group>
            <Form.Group controlId="fechaExpiracion">
              <Form.Label>Fecha de Expiración</Form.Label>
              <Form.Control
                type="date"
                value={fechaExpiracion}
                onChange={(e) => setFechaExpiracion(e.target.value)}
                required
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
