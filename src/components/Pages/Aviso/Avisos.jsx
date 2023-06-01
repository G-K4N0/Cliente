import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import './Aviso.scss'
export const Avisos = () => {
  const axiosPrivate = useAxiosPrivate()
  const [reportes, setReportes] = useState([])

  useEffect(() => {
    axiosPrivate
      .get('/reportes')
      .then((response) => {
        setReportes(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  return (
    <div className='container-cards'>
      {reportes.map((reporte) => (
        <Card className="w-100" key={reporte.id}>
          <Card.Header>{reporte.usuario.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              {reporte.problema}
            </Card.Text>
            <Card.Text>
              {reporte.descripcion}
            </Card.Text>
            <Button variant="primary">Revisado</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
