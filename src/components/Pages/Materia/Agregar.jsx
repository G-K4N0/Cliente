import { useState } from 'react'
import styles from './Materias.module.scss'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { ErrorAlert } from '../../Alerts/Error'

export const Agregar = ({ setUpdateTable }) => {
  const axiosPrivate = useAxiosPrivate()
  const [materia, setMateria] = useState('')
  const [showError, setShowError] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const dataMateria = new FormData()
    dataMateria.append('name', materia)
    axiosPrivate
      .post('/materias', dataMateria)
      .then((response) => {
        const message = response?.data?.message || ''

        if (message.includes(`La materia ${materia} ya existe`)) {
          setMensaje(message)
          setShowError(true)
        }
        setMateria('')
        setUpdateTable(true)
      })
      .catch((error) => {
        if (!error?.response) {
          setMensaje('El servidor no responde')
          setShowError(true)
        } else if (error?.response?.message) {
          setMensaje(error?.response?.message)
          setShowError(true)
        }
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <ErrorAlert show={showError} setShow={setShowError} error={mensaje} />
        <div className={`input-group ${styles.grupo}`}>
          <input
            type="text"
            className={`form-control ${styles.txtMateria} h-100 mt-3`}
            placeholder="Materia"
            aria-label="Materia"
            aria-describedby="button-addon2"
            value={materia}
            onChange={(event) => setMateria(event.target.value)}
            required
          />
          <button
            className="btn btn-primary mb-2 "
            type="submit"
            id="button-addon2"
          >
            Agregar Materia
          </button>
        </div>
      </form>
    </div>
  )
}
