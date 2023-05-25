import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { ErrorAlert } from '../../Alerts/Error.jsx'
import styles from './Registrar.module.scss'

function RegistroUsuario ({ setUpdateTable, showForm, setShowForm }) {
  const [nombre, setNombre] = useState('')
  const [usuario, setUsuario] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('')
  const [privilegio, setPrivilegio] = useState('')
  const [privilegios, setPrivilegios] = useState([])
  const [imagen, setImagen] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getPrivilegios = () => {
      return axiosPrivate
        .get('/privilegio')
        .then((response) => {
          setPrivilegios(response.data)
          return response
        })
        .catch((error) => {
          if (!error?.response) {
            setError('El servidor no responsde')
            setShowError(true)
          } else if (error.response?.status === 401) {
            setError('La sesión ha expirado')
            setShowError(true)
          }
        })
    }
    getPrivilegios()
  }, [axiosPrivate])

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    if (contrasenia !== confirmarContrasenia) {
      setError('La contraseña no coincide')
      setShowError(true)
      setIsLoading(false)
    } else {
      const formData = new FormData()
      formData.append('name', nombre)
      formData.append('user', usuario)
      formData.append('password', contrasenia)
      formData.append('idPrivilegio', privilegio)
      formData.append('image', imagen)
      axiosPrivate
        .post('/usuarios', formData)
        .then((response) => {
          setUpdateTable(true)
          setNombre('')
          setUsuario('')
          setContrasenia('')
          setConfirmarContrasenia('')
          setPrivilegio('')
          setImagen(null)
          setShowForm(false)
        })
        .catch((error) => {
          if (error?.response) {
            setError('El servidor no responde')
            setShowError(true)
          } else if (error.response?.message) {
            setError(error.response.message)
            setShowError(true)
          }
        })
    }
  }

  const botonRegistro = isLoading
    ? (
    <Button disabled>Registrando...</Button>
      )
    : (
    <Button onClick={handleSubmit}>Registrar</Button>
      )

  return (
    <div>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <ErrorAlert show={showError} setShow={setShowError} error={error} />
        <Modal.Header className={styles.fondo} closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.fondo}>
          <Form>
            <Form.Group controlId='nombre'>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type='text'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='usuario'>
              <Form.Label>Usuario:</Form.Label>
              <Form.Control
                type='text'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='contrasena'>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type='password'
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='confirmarContrasena'>
              <Form.Label>Confirmar Contraseña:</Form.Label>
              <Form.Control
                type='password'
                value={confirmarContrasenia}
                onChange={(e) => setConfirmarContrasenia(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='opciones'>
              <Form.Label>Privilegios:</Form.Label>
              <Form.Select
                value={privilegio}
                onChange={(e) => setPrivilegio(e.target.value)}
                required
              >
                <option value=''>Seleccione un privilegio</option>
                {privilegios.map((privilegio) => (
                  <option key={privilegio.id} value={privilegio.id}>
                    {privilegio.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId='imagen'>
              <Form.Label>Seleccionar imagen:</Form.Label>
              <Form.Control
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setImagen(e.target.files[0])}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.fondo}>
          {botonRegistro}
          <Button onClick={() => setShowForm(false)} variant='danger'>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RegistroUsuario
