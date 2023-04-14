import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Avisos } from './Avisos'
import { CrearAviso } from './CrearAviso' // Importar el componente CrearAviso

export const Aviso = () => {
  const [showAddAviso, setShowAddAviso] = useState(false)

  const crearAviso = () => {
    setShowAddAviso(true)
  }

  return (
    <section>
      <div>
        <Button onClick={crearAviso}>Crear aviso</Button>
      </div>
      <div>
        <CrearAviso show={showAddAviso} onHide={() => setShowAddAviso(false)} />
      </div>
      <div>
        <Avisos />
      </div>
    </section>
  )
}
