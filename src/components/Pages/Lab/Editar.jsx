import { Modal, Button } from 'react-bootstrap'

export const Editar = (props) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'labName') {
      props.setNewNameValue(value)
    } else if (name === 'labStatus') {
      props.setNewStatusValue(value)
    }
  }

  return (
    <div>
      <Modal show={props.showModal} onHide={() => props.handleEdit()}>
        <Modal.Header closeButton>
          <Modal.Title>Editar materia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Laboratorio:</label>
            <input
              type="text"
              name="labName"
              value={props.newName}
              onChange={handleInputChange}
            />
          </form>
          <form>
            <label>Disponibilidad:</label>
            <input
              type="text"
              name="labStatus"
              value={props.newStatusValue}
              onChange={handleInputChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => props.handleEdit()}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
