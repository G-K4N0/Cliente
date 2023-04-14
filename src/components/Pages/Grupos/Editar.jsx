import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { Modal, Button, Form } from 'react-bootstrap'
import styles from './Grupos.module.scss'
export const Editar = ({ setUpdateTable, showEditar, handleCancelEditar, setShowEditar }) => {
  const axiosPrivate = useAxiosPrivate()
  const [semestres, setSemestres] = useState([])
  const [modalidades, setModalidades] = useState([])
  const [fases, setFases] = useState([])
  const [tipos, setTipos] = useState([])
  const [carreras, setCarreras] = useState([])

  const [semestre, setSemestre] = useState('')
  const [grupo, setGrupo] = useState('')
  const [modalidad, setModalidad] = useState('')
  const [fase, setFase] = useState('')
  const [tipo, setTipo] = useState('')
  const [carrera, setCarrera] = useState('')
  useEffect(() => {
    axiosPrivate
      .get('/semestres')
      .then((response) => {
        setSemestres(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axiosPrivate
      .get('/modalidades')
      .then((response) => {
        setModalidades(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axiosPrivate
      .get('/fases')
      .then((response) => {
        setFases(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axiosPrivate
      .get('/tipos')
      .then((response) => {
        setTipos(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axiosPrivate
      .get('/carreras')
      .then((response) => {
        setCarreras(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  const handleAgregar = () => {
    const formData = new FormData()
    formData.append('name', grupo)
    formData.append('idMod', modalidad)
    formData.append('idTipo', tipo)
    formData.append('idFase', fase)
    formData.append('idSemestre', semestre)
    formData.append('idCarrera', carrera)

    axiosPrivate
      .post('/grupos', formData)
      .then((response) => {
        setModalidad('')
        setSemestre('')
        setCarrera('')
        setGrupo('')
        setFase('')
        setTipo('')
        setUpdateTable(true)
        setShowEditar(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <Modal
        centered={true}
        size="sm"
        show={showEditar}
        onHide={handleAgregar}
      >
        <Modal.Title className={`${styles.fondo} ${styles.titulo}`}>Editar</Modal.Title>
        <Modal.Body className={styles.fondo}>
          <Form>
            <Form.Group controlId="grupo">
              <Form.Label>Grupo</Form.Label>
              <Form.Control
                className={styles.ancho}
                size="sm"
                type="text"
                name="grupo"
                value={grupo}
                onChange={(e) => setGrupo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="carrera">
              <Form.Label>Carrera</Form.Label>
              <Form.Select
                className={styles.ancho}
                size="sm"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
                required
              >
                <option value="">Seleccione una Carrera</option>
                {carreras.map((carrera) => (
                  <option key={carrera.id} value={carrera.id}>
                    {carrera.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="semestre">
              <Form.Label>Semestre</Form.Label>
              <Form.Select
                className={styles.ancho}
                size="sm"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                required
              >
                <option value="">Seleccione un semestre</option>
                {semestres.map((semestre) => (
                  <option key={semestre.id} value={semestre.id}>
                    {semestre.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="modalidad">
              <Form.Label>Modalidad</Form.Label>
              <Form.Select
                className={styles.ancho}
                size="sm"
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
                required
              >
                <option value="">Seleccione una modalidad</option>
                {modalidades.map((modalidad) => (
                  <option key={modalidad.id} value={modalidad.id}>
                    {modalidad.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="tipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                className={styles.ancho}
                size="sm"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value="">Seleccione un tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="fase">
              <Form.Label>Fase</Form.Label>
              <Form.Select
                className={styles.ancho}
                size="sm"
                value={fase}
                onChange={(e) => setFase(e.target.value)}
                required
              >
                <option value="">Seleccione una fase</option>
                {fases.map((fase) => (
                  <option key={fase.id} value={fase.id}>
                    {fase.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.fondo}>
          <Button variant="danger" onClick={handleCancelEditar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAgregar}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
