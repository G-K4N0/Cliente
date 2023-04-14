import { useState } from 'react'
import styles from './Labs.module.scss'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
export const Agregar = () => {
  const [lab, setLab] = useState('')
  const axiosPrivate = useAxiosPrivate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const dataLab = { name: lab, status: 'libre' }
    axiosPrivate
      .post('/labs', dataLab)
      .then((response) => {
        setLab('')
        alert(`${lab} Agregado satisfactoriamente`)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <div className={`input-group ${styles.grupo}`}>
            <input
              type="text"
              className={`form-control ${styles.txtLab} h-100 mt-3`}
              placeholder="Laboratorio"
              aria-label="Laboratorio"
              aria-describedby="button-addon2"
              value={lab}
              onChange={(event) => setLab(event.target.value)}
            />

            <button
              className="btn btn-primary mb-2 "
              type="submit"
              id="button-addon2"
            >
              Agregar Laboratiorio
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
