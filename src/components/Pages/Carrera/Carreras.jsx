import { Agregar } from './Agregar'
import { Carrera } from './Carrera'

export function Carreras () {
  return (
    <div className="container">
      <div className="container">
        <Agregar />
      </div>
      <div>
        <Carrera />
      </div>
    </div>
  )
}
