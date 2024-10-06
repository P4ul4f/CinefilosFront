import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faInfoCircle, faCog, faSignOut, faUserEdit, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import UserDataModal from './UserDataModal';
import { useLoggedInUser } from '../../api/AuthContext';
import backendApiClient from '../../api/backendConfig';
import './UserDetailsModal.css';
import SettingsModal from './SettingsModal';
import UserManagementModal from './UserManagementModal';

const UserDetailsModal = ({ show, handleClose, handleSettings, handleLogout }) => {
  const { loggedInUser } = useLoggedInUser();
  const [showUserDataModal, setShowUserDataModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showUserManagementModal, setShowUserManagementModal] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setError(null);
      try {
        const response = await backendApiClient.get('/user-details');
        setUserRole(response.data.userRole);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
      }
    };

    if (loggedInUser) {
      fetchUserDetails();
    }
  }, [loggedInUser]);

  const handleOpenUserDataModal = () => {
    setShowUserDataModal(true);
  };

  const handleCloseUserDataModal = () => {
    setShowUserDataModal(false);
  };

  const handleOpenSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const handleOpenUserManagementModal = () => {
    setShowUserManagementModal(true);
  };

  const handleCloseUserManagementModal = () => {
    setShowUserManagementModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className='modal-container-detailsuser'>
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title className="custom-modal-title">
            <FontAwesomeIcon icon={faUserCircle} />
            {loggedInUser.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='custom-body'>
          {error && (
            <div className="error-message">
              <FontAwesomeIcon icon={faExclamationCircle} /> Error: {error}
            </div>
          )}
          {!error && (
            <>
              <div className="custom-row" onClick={handleOpenUserDataModal}>
                <span className="custom-icon"><FontAwesomeIcon icon={faInfoCircle} /></span>
                <span className="custom-text">Mis Datos</span>
              </div>
              <div className="custom-row" onClick={handleOpenSettingsModal}>
                <span className="custom-icon"><FontAwesomeIcon icon={faCog} /></span>
                <span className="custom-text">Configuración</span>
              </div>
              {userRole === 'ADMIN' && (
                <div className="custom-row" onClick={handleOpenUserManagementModal}>
                  <span className="custom-icon"><FontAwesomeIcon icon={faUserEdit} /></span>
                  <span className="custom-text">Gestionar Usuarios</span>
                </div>
              )}
              <div className="custom-row" onClick={handleLogout}>
                <span className="custom-icon"><FontAwesomeIcon icon={faSignOut} /></span>
                <span className="custom-text">Cerrar Sesión</span>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      <UserDataModal
        show={showUserDataModal}
        handleClose={handleCloseUserDataModal}
      />
      <SettingsModal
        show={showSettingsModal}  // Pasar el estado y funciones al SettingsModal
        handleClose={handleCloseSettingsModal}
        loggedInUser={loggedInUser}
      />
      <UserManagementModal
        show={showUserManagementModal} // Pasar el estado al UserManagementModal
        handleClose={handleCloseUserManagementModal}
      />
    </>
  );
};

export default UserDetailsModal;



