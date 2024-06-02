import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './UserModal.css';
import { IoClose } from 'react-icons/io5';
import { text } from '@fortawesome/fontawesome-svg-core';

const UserRegister = ({ show, handleClose, handleUserModalClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log('Iniciar sesión con:', email, password);
    // Luego puedes cerrar el modal
    handleClose();
    handleUserModalClose();
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName='custom-modal-login' centered>
      <Modal.Header closeButton={false} className="custom-header">
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
            <Form.Label style={{color:'white'}}>Nombre</Form.Label>
            <Form.Control
              type="name"
              placeholder="Ingrese su nombre"
              value={text}
              
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{color:'white'}}>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su mail"
              value={email}
              
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{color:'white'}}>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="dark" onClick={handleLogin}>
          Aceptar
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default UserRegister;