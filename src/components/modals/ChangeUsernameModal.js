import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import backendApiClient from '../../api/backendConfig';
import './ChangeModal.css'; // Importa tu archivo de estilos para los modales de cambio si es necesario

const ChangeUsernameModal = ({ show, handleClose }) => {
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUsername = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await backendApiClient.post('/change-username', { newUsername });
      console.log('Cambio de nombre de usuario exitoso:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error al cambiar el nombre de usuario:', error);
      setError('Error al cambiar el nombre de usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className='modal-container-change'>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar nombre de usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body  style={{alignContent:'center'}}>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Nuevo nombre de usuario"
          className="form-control"
          centered
        />
        {error && <div className="error-message">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleChangeUsername} disabled={!newUsername || isLoading} className='settings-button'>
          {isLoading ? 'Cargando...' : 'Guardar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeUsernameModal;

