import { useState, useEffect } from 'react'
import styles from './Registrar.module.scss'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export function Editar (props) {
  const [name, setName] = useState(props.usuarioSeleccionado.name)
  const [user, setUser] = useState(props.usuarioSeleccionado.user)
  const [password, setPassword] = useState(props.usuarioSeleccionado.password)

  const [image, setImage] = useState(null)
  const [originalValues, setOriginalValues] = useState({})

  const idUser = parseInt(props.usuarioSeleccionado.id)
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getOriginalValues = async () => {
      axiosPrivate
        .get(`/usuarios/${idUser}`)
        .then((response) => {
          setOriginalValues(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getOriginalValues()
  }, [idUser, axiosPrivate])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    const fieldsToUpdate = {}

    if (name !== originalValues.name) {
      formData.append('name', name)
      fieldsToUpdate.name = name
    }

    if (user !== originalValues.user) {
      formData.append('user', user)
      fieldsToUpdate.user = user
    }

    if (password !== originalValues.password) {
      formData.append('password', password)
      fieldsToUpdate.password = password
    }
    if (image) {
      formData.append('image', image)
      fieldsToUpdate.image = image
    }

    axiosPrivate
      .put(`/usuarios/${idUser}`, formData)
      .then((response) => {
        alert(`${response.data.message}`)
        props.setUpdateTable(true)
      })
      .catch((error) => {
        alert(`${error}`)
      })
  }

  return (
    <div className={`.container ${styles.float}`}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="user">Usuario</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label htmlFor="image">Imagen</label>
        <input
          type="file"
          id="image"
          onChange={(event) => setImage(event.target.files[0])}
        />

        <button type="submit">Confirmar</button>
        <button type="button" onClick={props.cancelar}>
          Cancelar
        </button>
      </form>
    </div>
  )
}
