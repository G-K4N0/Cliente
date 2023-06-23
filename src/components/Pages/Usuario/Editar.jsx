import { useState, useEffect } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

export function Editar(props) {
  const [name, setName] = useState(props.usuarioSeleccionado.name);
  const [user, setUser] = useState(props.usuarioSeleccionado.user);
  const [password, setPassword] = useState(props.usuarioSeleccionado.password);
  const [image, setImage] = useState(null);
  const [originalValues, setOriginalValues] = useState({});
  const idUser = parseInt(props.usuarioSeleccionado.id);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getOriginalValues = async () => {
      axiosPrivate
        .get(`/usuarios/${idUser}`)
        .then((response) => {
          setOriginalValues(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getOriginalValues();
  }, [idUser, axiosPrivate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const fieldsToUpdate = {};

    if (name !== originalValues.name) {
      formData.append('name', name);
      fieldsToUpdate.name = name;
    }

    if (user !== originalValues.user) {
      formData.append('user', user);
      fieldsToUpdate.user = user;
    }

    if (password !== originalValues.password) {
      formData.append('password', password);
      fieldsToUpdate.password = password;
    }
    if (image) {
      formData.append('image', image);
      fieldsToUpdate.image = image;
    }

    axiosPrivate
      .put(`/usuarios/${idUser}`, formData)
      .then((response) => {
        alert(`${response.data.message}`);
        props.setUpdateTable(true);
      })
      .catch((error) => {
        alert(`${error}`);
      });
  };

  return (
    <Modal show={true} onHide={props.cancelar}>
      <Modal.Header className='encabezado'>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form >
            <Form.Group controlId='nombre'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
              type="text"
              id='name'
              placeholder="Ingrese el título"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
            </Form.Group>

            <label htmlFor="user">Usuario</label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <label htmlFor="image">Imagen</label>
            <input
              type="file"
              id="image"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.cancelar}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
