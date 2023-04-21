import styles from '../styleComponents/Details.module.scss'
import { Image } from 'react-bootstrap'
export function Details (props) {
  const imagen = props.imagen
  return (
    <div className={styles.containerDetails}>
      <div className={styles.containerImage}>
        <Image src={imagen} roundedCircle />
      </div>
      <div className={styles.franja}></div>
      <div className={styles.scheduleContainer}>
        <h1 className={styles.scheduleTitle}>Inicia</h1>
        <div className={styles.hour}>
          <h3>{props.inicio}</h3>
        </div>
        <h1 className={styles.scheduleTitle}>Termina</h1>
        <div className={styles.hour}>
          <h3> {props.fin} </h3>
        </div>
        <div className={styles.scheduleTitle}>
          <p> {props.semestre} </p>
        </div>
      </div>
    </div>
  )
}
