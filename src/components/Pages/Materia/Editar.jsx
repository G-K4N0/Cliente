import { Modal, Button } from 'react-bootstrap'

export const Editar = (props) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value
    props.setNewValue(newValue)
  }

  return (
    <div>
      <Modal show={props.showModal} onHide={() => props.handleEdit()}>
        <Modal.Header closeButton>
          <Modal.Title>Editar materia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Materia:</label>
            <input
              type="text"
              name="name"
              value={props.newValue}
              onChange={handleInputChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={props.handleEdit}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
