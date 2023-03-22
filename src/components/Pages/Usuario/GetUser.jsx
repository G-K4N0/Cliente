import { getAllUsersRequest } from '../../../services/usuario.js'
import { useEffect, useState } from 'react'
import { Editar } from './Editar.jsx'
import styles from './Registrar.module.scss'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
const Users = () => {
  const [usuarios, setUsuarios] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  useEffect(() => {
    const getUsers = async () => {
      const getUsers = await getAllUsersRequest()
      setUsuarios(getUsers.data)
    }
    getUsers()
  }, [])

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario)
  }

  return (
    <div className={styles.tablaUsuarios}>
    <div>
      {usuarioSeleccionado && (<Editar setUsuarioSeleccionado = { setUsuarioSeleccionado } />)}

    </div>
    <div>
      <Table responsive striped bordered hover variant='dark' className={styles.tabla}>
        <thead>
          <tr>
            <th className={styles.itemTituloNombre}>Imagen</th>
            <th className={styles.itemTituloNombre}>Nombre</th>
            <th className={styles.itemTituloNombre}>Usuario</th>
            <th className={styles.itemTituloNombre}>Contraseña</th>
            <th className={styles.itemTituloNombre}>Privilegio</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id} >
              {console.log(usuario)}
              <td className={styles.itemUsuario}> <img src={ usuario.imageUrl} alt="" />{}</td>
              <td className={styles.itemUsuario}> {usuario.name}</td>
              <td className={styles.itemUsuario}> {usuario.nickname}</td>
              <td className={styles.itemUsuario}>  {usuario.password} </td>
              <td className={styles.itemUsuario}>  {usuario.privilegio.name} </td>
              <Button variant="danger" onClick={() => handleEditarUsuario(usuario)}>Editar</Button>
              <td className={styles.itemUsuario}>  <Button variant="danger" >Eliminar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>)
}
export default Users
