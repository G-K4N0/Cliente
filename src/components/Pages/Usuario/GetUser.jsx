import { useEffect, useState } from 'react'
import { Editar } from './Editar'
import styles from './Registrar.module.scss'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import RegistroUsuario from './RegistroUsuario.jsx'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { ErrorAlert } from '../../Alerts/Error'

const Users = () => {
  const [usuarios, setUsuarios] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [updateTable, setUpdateTable] = useState(false)
  const [error, setError] = useState(null)

  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getUsers = () => {
      return axiosPrivate
        .get('/usuarios')
        .then((response) => {
          setUsuarios(response.data)
          setUpdateTable(false)
        })
        .catch((error) => {
          setError(error)
          navigate('/login', { state: { from: location }, replace: true })
        })
    }
    getUsers()
  }, [axiosPrivate, location, location.search, navigate, updateTable])

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleDelete = (id) => {
    return axiosPrivate
      .delete(`/usuarios/${id}`)
      .then((response) => {
        console.log(response.status)
        setUpdateTable(true)
      })
      .catch((error) => {
        alert(error)
      })
  }

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario)
    setShowEdit(true)
  }

  const handleCancelarEdicion = () => {
    setUsuarioSeleccionado(null)
    setShowEdit(false)
  }

  return (
    <div className="container table-responsive">
      {error && <ErrorAlert error={error} />}
      <Table
        responsive
        striped
        bordered
        hover
        variant="dark"
        className="table-sm table-hover"
      >
        <thead>
          <tr>
            <th className="text-center">Imagen</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Usuario</th>
            <th className="text-center">Contraseña</th>
            <th className="text-center">Privilegio</th>
            <th className="text-center"></th>
            <th className="text-center">
              {!showForm
                ? (
                <Button onClick={handleShowForm} className={styles.btnShow}>
                  Registrar
                </Button>
                  )
                : (
                <Button onClick={handleShowForm} className={styles.btnShow}>
                  Cancelar
                </Button>
                  )}
              {showForm && (
                <div>
                  <RegistroUsuario
                    setUpdateTable={setUpdateTable}
                    showForm={showForm}
                    setShowForm={setShowForm}
                  />
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>
                {' '}
                <img
                  src={usuario.image ? usuario.image.url : ' '}
                  alt=""
                  width={100}
                  className="img-fluid"
                />
              </td>
              <td className="text-center"> {usuario.name}</td>
              <td className="text-center"> {usuario.user}</td>
              <td className="text-center"> {usuario.password} </td>
              <td className="text-center"> {usuario.privilegio.name} </td>
              <td className="text-center">
                {!showEdit
                  ? (
                  <Button
                    onClick={() => handleEditarUsuario(usuario)}
                    className={styles.btnShow}
                  >
                    Editar
                  </Button>
                    )
                  : (
                  <Button
                    onClick={handleCancelarEdicion}
                    className={styles.btnShow}
                  >
                    Cancelar
                  </Button>
                    )}
                {showEdit && (
                  <div>
                    <Editar
                      usuarioSeleccionado={usuarioSeleccionado}
                      cancelar={handleCancelarEdicion}
                      mostrar={showEdit}
                      setUpdateTable={setUpdateTable}
                    />
                  </div>
                )}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(usuario.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default Users
