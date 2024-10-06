import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import backendApiClient from '../../api/backendConfig';
import './ChangeModal.css'; // Importa tu archivo de estilos para los modales de cambio si es necesario

const ChangePasswordModal = ({ show, handleClose, loggedInUser }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    setIsLoading(true);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    try {
        const response = await backendApiClient.post('/change-password', {
          username: loggedInUser.username,
          currentPassword,
          newPassword
        });
    
        console.log('Cambio de contraseña exitoso:', response.data);
        handleClose();
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        setError('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <Modal show={show} onHide={handleClose} centered className='modal-container-change'>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Contraseña Actual"
          className="form-control"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nueva Contraseña"
          className="form-control mt-2"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Nueva Contraseña"
          className="form-control mt-2"
        />
        {error && <div className="error-message">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleChangePassword} className='settings-button' disabled={!currentPassword || !newPassword || !confirmPassword || isLoading}>
          {isLoading ? 'Cargando...' : 'Guardar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;

