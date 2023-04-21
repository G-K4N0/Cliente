import Alert from 'react-bootstrap/Alert'
import styles from './Alerts.module.scss'

export const SuccessAlert = ({ mensaje, show, setShow }) => {
  return (
    <div className={styles.alertSucces}>
      <Alert
        show={show}
        variant='success'
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading> {mensaje} </Alert.Heading>
      </Alert>
    </div>
  )
}
