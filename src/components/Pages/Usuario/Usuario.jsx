import Users from './GetUser'
import Registrar from './Registrar'
import styles from './Registrar.module.scss'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
export const Usuario = () => {
  const [showForm, setShowForm] = useState(false)

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  return (
        <div>
            <div className={styles.contenedorBoton}>
              { !showForm ? (<Button onClick={handleShowForm} className={styles.btnShow}>Registrar</Button>) : <Button onClick={handleShowForm} className={styles.btnShow}>Cancelar</Button> }
            </div>

            <div>
                {showForm &&
                    (<div>
                        <Registrar />
                    </div>)
                }

                <div className={styles.seccionList}>
                    <Users/>
                </div>

            </div>
        </div>)
}
