import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

import styles from './Horarios.module.scss'

export const Agregar = () => {
  const [inicio, setInicio] = useState('')
  const [fin, setFin] = useState('')
  const [dia, setDia] = useState('')
  const [grupos, setGrupos] = useState([])
  const [materias, setMaterias] = useState([])
  const [labs, setLabs] = useState([])
  const [usuarios, setUsuarios] = useState([])

  const [seleccionGrupo, setSeleccionGrupo] = useState('')
  const [seleccionMateria, setSeleccionMateria] = useState('')
  const [seleccionLab, setSeleccionLab] = useState('')
  const [seleccioUsuario, setSeleccioUsuario] = useState('')
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    axiosPrivate
      .get('/grupos/grupos')
      .then((response) => {
        setGrupos(response.data)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    axiosPrivate
      .get('/materias')
      .then((response) => {
        setMaterias(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    axiosPrivate
      .get('/labs')
      .then((response) => {
        setLabs(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    axiosPrivate
      .get('/usuarios')
      .then((response) => {
        setUsuarios(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataHorario = new FormData()
    dataHorario.append('inicia', inicio)
    dataHorario.append('finaliza', fin)
    dataHorario.append('dia', dia)
    dataHorario.append('idGrupo', seleccionGrupo)
    dataHorario.append('idMateria', seleccionMateria)
    dataHorario.append('idLab', seleccionLab)
    dataHorario.append('idUsuario', seleccioUsuario)

    axiosPrivate
      .post('/horarios', dataHorario)
      .then(
        setSeleccionMateria(''),
        setSeleccioUsuario(''),
        setSeleccionGrupo(''),
        setSeleccionLab(''),
        setInicio(''),
        setDia(''),
        setFin('')
      )
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Table responsive variant="dark" >
          <thead>
            <tr>
              <th>
                <select
                  className={styles.input_select}
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                >
                  <option value="">Entrada</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={fin}
                  onChange={(e) => setFin(e.target.value)}
                >
                  <option value="">Salida</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                >
                  <option value="">Dias</option>
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miércoles">Miércoles</option>
                  <option value="Jueves">Jueves</option>
                  <option value="Viernes">Viernes</option>
                  <option value="Sabado">Sábado</option>
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={seleccionGrupo}
                  onChange={(e) => setSeleccionGrupo(e.target.value)}
                >
                  <option value="">Grupos</option>
                  {grupos.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                      {grupo.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={seleccionMateria}
                  onChange={(e) => setSeleccionMateria(e.target.value)}
                >
                  <option value="">Materias</option>
                  {materias.map((materia) => (
                    <option key={materia.id} value={materia.id}>
                      {materia.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={seleccionLab}
                  onChange={(e) => setSeleccionLab(e.target.value)}
                >
                  <option value="">Laboratorios</option>
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={seleccioUsuario}
                  onChange={(e) => setSeleccioUsuario(e.target.value)}
                >
                  <option value="">Usuarios</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <Button
                  className={styles.input_select}
                  type="submit"
                  variant="primary"
                >
                  Enviar
                </Button>
              </th>
              <th>
                <Button
                  className={styles.input_select}
                  type="button"
                  variant="danger"
                >
                  Cancelar
                </Button>
              </th>
            </tr>
          </thead>
        </Table>
      </form>
    </div>
  )
}
