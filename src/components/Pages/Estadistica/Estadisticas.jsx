import { RegistrosByLabs } from './RegistrosByLabs'
import { RegistrosByMaterias } from './RegistrosByMaterias'
import { RegistrosByDocentes } from './RegistrosByDocentes'
import { RegistrosByActividades } from './RegistrosByActividades'
import { RegistrosByCarreras } from './RegistrosByCarreras'
import './Estadistica.scss'
import { RegistrosByMes } from './RegistrosByMes'

export function Estadisticas () {
  const colores = ['#6200EA', '#FFAB00', '#00BFA5', '#AEEA00', '#64DD17', '#00C853', '#00B8D4', '#0091EA', '#2962FF', '#304FFE', '#AA00FF', '#C51162', '#D50000', '#DD2C00', '#FF6D00', '#FFD600']
  return (
    <div className='container-custom'>

      <div className='title'>
        <h1>Registros por Laboratorios</h1>
      </div>
      <RegistrosByLabs colores={colores} />

      <div className='title'>
        <h1>Registros por Docentes</h1>
      </div>
      <RegistrosByDocentes colores={colores} />

      <div className='title'>
        <h1>Registro de por Materias</h1>
      </div>
      <RegistrosByMaterias colores={colores} />

      <div className='title'>
        <h1>Registro de por Actividades</h1>
      </div>
      <RegistrosByActividades colores={colores} />

      <div className='title'>
        <h1>Registro de por  Carreras</h1>
      </div>
      <RegistrosByCarreras colores={colores}/>

      <div className='title'>
        <h1>Registro de por Mes</h1>
      </div>
      <RegistrosByMes colores={colores}/>
    </div>
  )
}
