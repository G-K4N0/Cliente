import styles from '../styleComponents/Details.module.scss'
import { Image } from 'react-bootstrap'
export function Details ({ imagen, inicio, fin, usuario }) {
  const image = imagen
  return (
    <div className={styles.containerDetails}>
      <div className={styles.containerImage}>
        <Image src={image} roundedCircle />
      </div>
      <div className={styles.franja}></div>
      <div className={styles.scheduleContainer}>
        <h1 className={styles.scheduleTitle}>Inicia</h1>
        <div className={styles.hour}>
          <h3>{inicio}</h3>
        </div>
        <h1 className={styles.scheduleTitle}>Termina</h1>
        <div className={styles.hour}>
          <h3> {fin} </h3>
        </div>
        <div className={styles.scheduleTitle}>
          <p> {usuario} </p>
        </div>
      </div>
    </div>
  )
}
