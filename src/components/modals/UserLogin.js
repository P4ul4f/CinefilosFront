import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import backendApiClient from '../../api/backendConfig';
import { useLoggedInUser } from '../../api/AuthContext'; // Importa el hook personalizado

const UserLogin = ({ show, handleClose }) => {
  const { setLoggedInUser } = useLoggedInUser(); // Usa el hook para obtener setLoggedInUser del contexto

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await backendApiClient.post('/log-in', {
        username,
        password
      });
      console.log("Login exitoso",response.data);
      
      // Verifica que response.data contenga el userId y el token JWT
      if (response.data && response.data.jwt && response.data.userId) {
        // Almacenar el token en localStorage
        localStorage.setItem('token', response.data.jwt);

        // Establecer loggedInUser con todos los datos del usuario
        const loggedInUserData = {
          username: response.data.username,
          userId: response.data.userId,
          // Otros campos necesarios del usuario si los hubiera
        };
        setLoggedInUser(loggedInUserData);

        // Cierra el modal de inicio de sesión
        handleClose();
      } else {
        console.error('Respuesta de inicio de sesión incompleta:', response.data);
        setErrorMessage('Respuesta de inicio de sesión incompleta');
}
    } catch (error) {
      if (error.response) {
        // Error de respuesta del servidor (status code fuera del rango 2xx)
        console.error('Error al iniciar sesión:', error.response.data);
        setErrorMessage('Error al iniciar sesión: ' + error.response.data.message);
      } else if (error.request) {
        // Error de solicitud (no se recibe respuesta del servidor)
        console.error('No se recibió respuesta del servidor:', error.request);
        setErrorMessage('No se recibió respuesta del servidor');
      } else {
        // Otro tipo de error
        console.error('Error al procesar la solicitud:', error.message);
        setErrorMessage('Error al procesar la solicitud');
      }
    }
    console.log('Se ejecutó handleLogin');
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName='custom-modal-login' centered>
      <Modal.Header closeButton className="custom-header">
        <h2 className='register-title centered-title'>Iniciar Sesión</h2>
        <div
          className="close-button"
          onClick={handleClose}
          style={{
            color: 'white',
            fontSize: '2rem',
            position: 'absolute',
            right: '10px',
            zIndex: '1000',
          }}
        >
          <IoClose cursor="pointer" />
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form className='custom-form'>
          <Form.Group controlId="formBasicName">
            <Form.Label style={{ color: 'white' }} className="custom-label">Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese nombre de usuario"
              value={username}
              className='custom-input'
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: 'white' }} className="custom-label">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese contraseña"
              value={password}
              className="custom-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="dark" onClick={handleLogin}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserLogin;

