import { Link } from 'react-router-dom'
export function Sidebar () {
  return (
    <div>
      <ul>
          <li> <Link to="inicio">Inicio</Link></li>
          <li> <Link to="usuarios">Usuarios</Link> </li>
          <li> <Link to="materias"> Materias </Link></li>
          <li> <Link to="carreras"> Carreras </Link></li>
          <li> <Link to="labs"> Labroratorios </Link></li>
          <li> <Link to="horarios"> Horarios </Link></li>
          <li> <Link to="avisos"> Avisos </Link></li>
          <li> <Link to="estadisticas"> Estadisticas </Link></li>
        </ul>
    </div>
  )
}
