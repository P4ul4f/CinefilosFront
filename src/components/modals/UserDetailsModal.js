
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useLoggedInUser } from '../../api/AuthContext'; 
import './UserDetailsModal.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserCircle, faInfoCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UserDataModal from './UserDataModal';

const UserDetailsModal = ({ show, handleClose, handleSettings, handleLogout }) => {
  const { loggedInUser } = useLoggedInUser();
  const [showUserDataModal, setShowUserDataModal] = useState(false);

  const handleOpenUserDataModal = () => {
    setShowUserDataModal(true);
  };

  const handleCloseUserDataModal = () => {
    setShowUserDataModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className='modal-container-detailsuser'>
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title className="custom-modal-title">
          <FontAwesomeIcon icon={faUserCircle}/>
              {loggedInUser.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='custom-body'>
          <div className="custom-row" onClick={handleOpenUserDataModal}>
            <span className="custom-icon"><i className="fa fa-info-circle"></i></span>
            <span className="custom-text">Mis Datos</span>
          </div>
          <div className="custom-row" onClick={handleSettings}>
            <span className="custom-icon"><i className="fa fa-cog"></i></span>
            <span className="custom-text">Configuración</span>
          </div>
          <div className="custom-row" onClick={handleLogout}>
            <span className="custom-icon"><i className="fa fa-sign-out"></i></span>
            <span className="custom-text">Cerrar Sesión</span>
          </div>
        </Modal.Body>
      </Modal>
      <UserDataModal
      show={showUserDataModal}
      handleClose={handleCloseUserDataModal}
    />
  </>
  );
};

export default UserDetailsModal;



