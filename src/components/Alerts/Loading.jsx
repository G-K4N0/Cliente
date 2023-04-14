import styles from './Alerts.module.scss'
function Cargando () {
  return (
    <div className={ styles.fondo }>
      <span className={ styles.loader }></span>
    </div>
  )
}

export default Cargando
