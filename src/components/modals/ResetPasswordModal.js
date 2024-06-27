import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import backendApiClient from '../../api/backendConfig';
import './UserModal.css'

const ResetPasswordModal = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await backendApiClient.post('/reset-password', {
        username,
        currentPassword,
        newPassword
      });

      console.log('Respuesta de cambio de contraseña:', response.data);
      setErrorMessage('Contraseña cambiada exitosamente');
      handleClose();

    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.response ? error.response.data : error.message);
      setErrorMessage('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal-reset">
      <Modal.Header closeButton className="custom-header">
        <Modal.Title>Restablecer Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="custom-form-reset">
          <Form.Group controlId="formUsername">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label>Contraseña actual</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
            />
          </Form.Group>
        </Form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </Modal.Body>
      <Modal.Footer className="custom-modal-reset-footer">
        <Button variant="secondary" onClick={handleClose} className="modal-reset-button">
          Cancelar
        </Button>
        <Button onClick={handleResetPassword} className="modal-reset-button2">
          Restablecer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPasswordModal;
