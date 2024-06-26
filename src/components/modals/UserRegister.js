// UserRegister.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './UserModal.css';
import { IoClose } from 'react-icons/io5';
import backendApiClient from '../../api/backendConfig';

const UserRegister = ({ show, handleClose, handleUserModalClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await backendApiClient.post('/sign-up', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Usuario registrado exitosamente:', response.data);
      // Cierra ambos modales después del registro exitoso
      handleClose();
      handleUserModalClose();
    } catch (error) {
      console.error('Error de registro de usuario:', error);
      setErrorMessage('Error de registro de usuario: Prueba otro nombre de usuario');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName='custom-modal-login' centered>
      <Modal.Header closeButton className="custom-header">
        <h2 className='register-title centered-title'>Registrarse</h2>
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
        <Button variant="dark" onClick={handleRegister}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserRegister;
