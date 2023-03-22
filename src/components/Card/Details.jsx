import styles from '../styleComponents/Details.module.scss'

export function Details (props) {
  const imagen = ''
  return (
    <div className={styles.containerDetails}>
      <div className={styles.containerImage}>
        <img src={imagen} alt=""/>
      </div>
      <div className= {styles.franja} ></div>
      <div className={styles.scheduleContainer}>

      <h1 className={styles.scheduleTitle} >Inicia</h1>
      <div className={styles.hour}><h3>{ props.inicio }</h3></div>
      <h1 className={styles.scheduleTitle} >Termina</h1>
      <div className={styles.hour}><h3> { props.fin } </h3></div>
      <div><h2 className={styles.scheduleTitle} > {props.semestre} </h2></div>
      </div>
    </div>
  )
}
