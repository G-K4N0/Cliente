import { useState } from 'react'
import styles from './Carreras.module.scss'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
export const Agregar = () => {
  const [carrera, setCarrera] = useState('')
  const axiosPrivate = useAxiosPrivate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const dataCarrera = { name: carrera }
    axiosPrivate
      .post('/carreras', dataCarrera)
      .then((response) => {
        setCarrera('')
        alert(`${carrera} Agregado satisfactoriamente`)
      })
      .catch((error) => {
        alert(`No es posible agregar una Carrera. Intenta mas tarde ${error}`)
      })
  }

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <div className={`input-group ${styles.grupo}`}>
            <input
              type="text"
              className={`form-control ${styles.txtCarrera} h-100 mt-3`}
              placeholder="Carrera"
              aria-label="Carrera"
              aria-describedby="button-addon2"
              value={carrera}
              onChange={(event) => setCarrera(event.target.value)}
            />
            <button
              className="btn btn-primary mb-2 "
              type="submit"
              id="button-addon2"
            >
              Agregar Carrera
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
