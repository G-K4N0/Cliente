import Card from "react-bootstrap/Card";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { convertStringToDate } from "../../../services/convertStringToTime";
import './Reporte.scss'
export const Reporte = () => {
  const axiosPrivate = useAxiosPrivate();
  const [reportes, setReportes] = useState([]);
  const [update, setUpdate] =useState(false)
  useEffect(() => {
    axiosPrivate
      .get("/reportes")
      .then((response) => {
        setReportes(response.data);
        console.log(response.data);
        setUpdate(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPrivate, update]);

  const atender = async (id) => {
    const data = new FormData()
    data.append('revisado', true)
    axiosPrivate.put(`/reportes/${id}`, data).then(response => {
        console.log(response)
        setUpdate(true)
    }).catch(error => {
        console.log(error)
    })
  }

  const fecha = (fecha) => {
    return convertStringToDate(fecha);
  };
  console.log(reportes);
  return (
    <div className="container-cards">
      {reportes.map((reporte) => (
        <Card className="w-100 fondo"  key={reporte.id}>
          <Card.Header className='encabezado'>{reporte.usuario.name}</Card.Header>
          <Card.Title className='titulo_reporte' >{reporte.problema}</Card.Title>
          <Card.Body className='cuerpo'>
            <Card.Text>{reporte.lab.name}</Card.Text>
            <Card.Text>{reporte.descripcion}</Card.Text>
            <Card.Text>{fecha(reporte.createdAt)}</Card.Text>
          </Card.Body>
          <Card.Footer>
            {reporte.revisado ? (
              <button
              className="btn btn-success"
              >Atendido</button>
            ) : (
              <button
              className="btn btn-danger"
              onClick={() => atender(reporte.id)}
              >Atender</button>
            )}
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};
