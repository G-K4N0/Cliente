import Card from 'react-bootstrap/Card'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import { convertStringToDate } from '../../../services/convertStringToTime'
import './Aviso.scss'
export const Avisos = () => {
  const axiosPrivate = useAxiosPrivate()
  const [avisos, setAvisos] = useState([])

  useEffect(() => {
    axiosPrivate
      .get('/avisos')
      .then((response) => {
        setAvisos(response?.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  const fecha = (fecha) => {
    return convertStringToDate(fecha)
  }

  return (
    <div className='container-cards'>
      {avisos.map((aviso, index) => (
        <Card className="w-100 fondo" key={index}>
          <Card.Header className='encabezado'>{aviso.titulo}</Card.Header>
          <Card.Body className='cuerpo'>
            <Card.Text>
              {aviso.detalles}
            </Card.Text>
            <Card.Text>
              {fecha(aviso.fecha)}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
