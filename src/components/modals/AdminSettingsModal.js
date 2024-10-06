import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AdminSettingsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Configuración de Administrador</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Cambiar nombre de usuario</Form.Label>
            <Form.Control type="text" placeholder="Nuevo nombre de usuario" />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Cambiar contraseña</Form.Label>
            <Form.Control type="password" placeholder="Nueva contraseña" />
          </Form.Group>
          <Form.Group controlId="formManageUsers">
            <Form.Label>Gestionar usuarios</Form.Label>
            <Form.Control as="select">
              <option>Ver usuarios</option>
              <option>Editar usuarios</option>
              <option>Eliminar usuarios</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AdminSettingsModal;
