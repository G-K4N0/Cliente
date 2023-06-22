import styles from '../styleComponents/Inicio.module.scss'
import { BarraNavegacion } from './Navbar'
export function Inicio () {
  return (
    <div className={styles.back}>
      <BarraNavegacion login="Iniciar sesión" />
      <div className={`container-fluid ${styles.containerInicio}`}>
        <span className={styles.centroTitle}>Centro de Cómputo</span>
      </div>
    </div>
  )
}
