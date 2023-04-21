import Alert from 'react-bootstrap/Alert'
import styles from './Alerts.module.scss'

export const ErrorAlert = ({ show, setShow, error }) => {
  return (
    <div className={styles.alertSucces}>
      <Alert
        show={show}
        variant='danger'
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{error}</Alert.Heading>
      </Alert>
    </div>
  )
}
