import styles from '../styleComponents/Inicio.module.scss'
import { BarraNavegacion } from './Navbar'

export function Inicio () {
  return (
    <div>
      <BarraNavegacion login="Iniciar sesión" />
      <div className={styles.containerInicio}>
      </div>
    </div>
  )
}
