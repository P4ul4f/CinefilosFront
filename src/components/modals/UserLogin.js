import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import backendApiClient from '../../api/backendConfig';
import { useLoggedInUser } from '../../api/AuthContext'; 
import ResetPasswordModal from './ResetPasswordModal';


const UserLogin = ({ show, handleClose, setShowLoginMessage }) => {
  const { setLoggedInUser } = useLoggedInUser(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await backendApiClient.post('/log-in', {
        username,
        password
      });
      
      // Verifica que response.data contenga el userId y el token JWT
      if (response.data && response.data.jwt && response.data.userId) {
        // Almacenar el token en localStorage
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('userId', response.data.userId);

        // Establecer loggedInUser con todos los datos del usuario
        const loggedInUserData = {
          username: response.data.username,
          userId: response.data.userId,
          // Otros campos necesarios del usuario si los hubiera
        };
        setLoggedInUser(loggedInUserData);
        setShowLoginMessage(true);
        handleClose();
        
      } else {
        console.error('Respuesta de inicio de sesión incompleta:', response.data);
        setErrorMessage('Credenciales inválidas. Intenta de nuevo');
}
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Error de respuesta del servidor (status code fuera del rango 2xx)
        console.error('Error al iniciar sesión:', error.response.data);
        setErrorMessage('Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
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
  };

  const handleShowResetModal = () => {
    setShowResetModal(true);
  };

  const handleCloseResetModal = () => {
    setShowResetModal(false);
  };

  return (
    <>
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
          {/* Botón para abrir el modal de reseteo */}
          <Button variant="link" className='centered' style={{justifyContent:'center', color:'rgb(134, 21, 183)', width:'100%'}} onClick={handleShowResetModal}>
            Olvidé mi contraseña
          </Button>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="dark" onClick={handleLogin}>
            Aceptar
          </Button>
        </Modal.Footer>
        <ResetPasswordModal show={showResetModal} handleClose={handleCloseResetModal} />
      </Modal>

      
  </>
  );
};

export default UserLogin;

