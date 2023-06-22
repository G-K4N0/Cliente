import { Modal, Button } from 'react-bootstrap'

export const Editar = ({ setNewValue, showModal, handleEdit, newValue, handleCancel }) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value
    setNewValue(newValue)
  }

  return (
    <div>
      <Modal show={showModal} onHide={() => handleEdit()}>
        <Modal.Header className='encabezado'>
          <Modal.Title>Editar materia</Modal.Title>
        </Modal.Header>
        <Modal.Body className='cuerpo fondo'>
          <form>
            <label>Materia:</label>
            <input
              type="text"
              name="name"
              value={newValue}
              onChange={handleInputChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer className='fondo'>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEdit}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
