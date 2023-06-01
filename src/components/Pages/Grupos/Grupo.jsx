import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import styles from './Grupos.module.scss'
import { Agregar } from './Agregar'
import { Editar } from './Editar'
import { ErrorAlert } from '../../Alerts/Error'
import { SuccessAlert } from '../../Alerts/Success'
export const Grupo = () => {
  const [grupos, setGrupos] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const [showAgregar, setShowAgregar] = useState(false)
  const [showEditar, setShowEditar] = useState(false)
  const [updateTable, setUpdateTable] = useState(false)
  const [selected, setSelected] = useState([])
  const [showSucces, setShowSucces] = useState(false)
  const [showError, setShowError] = useState(false)
  const [mensaje, setMensaje] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    axiosPrivate('/grupos', {
      params: {
        page: currentPage,
        limit: 9
      }
    })
      .then((response) => {
        console.log(response.data)
        if (Object.keys(response.data).length === 0) {
          setMensaje('Aún no has grupos para mostrar')
          setShowSucces(true)
        } else {
          console.log(response)
          setGrupos(response?.data?.grupos)
          setTotalPages(response?.data?.totalPages)
        }
      })
      .catch((error) => {
        setMensaje(error.message)
        setShowError(true)
      })
  }, [updateTable, axiosPrivate, currentPage])

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
      <SuccessAlert
        mensaje={mensaje}
        show={showSucces}
        setShow={setShowSucces}
      />
      <ErrorAlert error={mensaje} show={showError} setShow={setShowError} />
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
      <Table responsive="sm" striped bordered hover variant="dark">
        <thead>
          <tr >
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
        <tfoot>
          <tr>
            <td>
              <Button variant="danger" onClick={() => setSelected([])}>
                Concluir
              </Button>
            </td>
            <td><Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage - 1)}
          enabledd={currentPage === totalPages}
          disabled={currentPage === 1}
        >
          Anterior
        </Button></td>
        <td><span>{currentPage} de {totalPages}</span></td>
        <td><Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
