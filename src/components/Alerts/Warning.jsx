import Alert from 'react-bootstrap/Alert'
import styles from './Alerts.module.scss'
export const WarningAlert = ({ show, setShow, mensaje }) => {
  return (
    <div className={styles.alertSucces}>
      <Alert
      show={show}
      variant='warning'
      onClose={() => setShow(false)}
      dismissible
      >
        <Alert.Heading>{mensaje}!</Alert.Heading>
      </Alert>
    </div>
  )
}
