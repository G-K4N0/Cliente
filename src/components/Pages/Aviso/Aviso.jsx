import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Avisos } from './Avisos'
import { CrearAviso } from './CrearAviso'
import './Aviso.scss'
export const Aviso = () => {
  const [showAddAviso, setShowAddAviso] = useState(false)

  const crearAviso = () => {
    setShowAddAviso(true)
  }

  return (
    <section className='container'>
      <div >
        <Button onClick={crearAviso}>Crear aviso</Button>
      </div>
      <div >
        <CrearAviso show={showAddAviso} onHide={() => setShowAddAviso(false)} />
      </div>
      <div>
        <Avisos />
      </div>
    </section>
  )
}
