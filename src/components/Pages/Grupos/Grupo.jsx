import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import styles from './Grupos.module.scss'
import { Agregar } from './Agregar'
import { Editar } from './Editar'
export const Grupo = () => {
  const [grupos, setGrupos] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const [showAgregar, setShowAgregar] = useState(false)
  const [showEditar, setShowEditar] = useState(false)
  const [updateTable, setUpdateTable] = useState(false)
  const [selected, setSelected] = useState([])
  useEffect(() => {
    axiosPrivate('/grupos')
      .then((response) => {
        setGrupos(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [updateTable, axiosPrivate])

  const handleCancel = () => {
    setShowAgregar(false)
  }
  const handleCancelEditar = () => {
    setShowEditar(false)
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(grupos.map((grupo) => grupo.id))
    } else {
      setSelected([])
    }
  }

  const handleSelect = (event, id) => {
    if (event.target.checked) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter((selectedId) => selectedId !== id))
    }
  }
  const gruposRender = grupos.map((grupo) => (
    <tr key={grupo.id}>
      <td className="text-center">
        <input
          type="checkbox"
          checked={selected.includes(grupo.id)}
          onChange={(event) => handleSelect(event, grupo.id)}
        />
      </td>
      <td className="text-center">{grupo.name}</td>
      <td className="text-center">{grupo.carrera.name}</td>
      <td className="text-center">{grupo.semestre.name}</td>
      <td className="text-center">{grupo.modalidad.name}</td>
      <td className="text-center">{grupo.tipo.name}</td>
      <td className="text-center">{grupo.fase.name}</td>
      <td className="text-center">
        <Button
          variant="danger"
          onClick={() => {
            setShowEditar(true)
          }}
        >
          Editar
        </Button>
      </td>
    </tr>
  ))
  return (
    <div className="container">
      <Editar
      showEditar={showEditar}
      setShowEditar={setShowEditar}
      handleCancelEditar={handleCancelEditar}
      setUpdateTable={setUpdateTable}
      />
      <Agregar
        showAgregar={showAgregar}
        setShowAgregar={setShowAgregar}
        handleCancel={handleCancel}
        setUpdateTable={setUpdateTable}
      />
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>
            Concluir
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.length === grupos.length}
                  onChange={handleSelectAll}
                />
              </div>
            </th>

            <th className={`text-center ${styles.encabezado}`}>Grupo</th>
            <th className={`text-center ${styles.encabezado}`}>Carrera</th>
            <th className={`text-center ${styles.encabezado}`}>Semestre</th>
            <th className={`text-center ${styles.encabezado}`}>Modalidad</th>
            <th className={`text-center ${styles.encabezado}`}>Tipo</th>
            <th className={`text-center ${styles.encabezado}`}>Fase</th>
            <th className={`text-center ${styles.encabezado}`}>
              <Button
                variant="primary"
                onClick={() => {
                  setShowAgregar(true)
                }}
              >
                Crear
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>{gruposRender} </tbody>
      </Table>
    </div>
  )
}
