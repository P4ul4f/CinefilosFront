import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ChangeUsernameModal from './ChangeUsernameModal';
import ChangePasswordModal from './ChangePasswordModal';
import './SettingModal.css' // Importa tu archivo de estilos para SettingsModal si es necesario

const SettingsModal = ({ show, handleClose, loggedInUser}) => {
  const [showChangeUsernameModal, setShowChangeUsernameModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleOpenChangeUsernameModal = () => {
    setShowChangeUsernameModal(true);
  };

  const handleCloseChangeUsernameModal = () => {
    setShowChangeUsernameModal(false);
  };

  const handleOpenChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className='modal-container-settings'>
        <Modal.Header closeButton>
          <Modal.Title>Configuración</Modal.Title>
        </Modal.Header>
        <Modal.Body className='custom-body'>
          <div className="custom-row" onClick={handleOpenChangeUsernameModal}>
            Cambiar nombre de usuario
          </div>
          <div className="custom-row" onClick={handleOpenChangePasswordModal}>
            Cambiar contraseña
          </div>
        </Modal.Body>
      </Modal>

      <ChangeUsernameModal
        show={showChangeUsernameModal}
        handleClose={handleCloseChangeUsernameModal}
      />

      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={handleCloseChangePasswordModal}
        loggedInUser={loggedInUser}
      />
    </>
  );
};

export default SettingsModal;

