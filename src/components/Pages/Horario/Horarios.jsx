import { Agregar } from './Agregar.jsx'
import { Horario } from './Horario.jsx'
import './Horarios.module.scss'
export function Horarios () {
  return (
    <div className='container'>
      <div >
      <Agregar />
      </div>

      <div className='container-custom-horarios'>
        <Horario />
      </div>
    </div>
  )
}
