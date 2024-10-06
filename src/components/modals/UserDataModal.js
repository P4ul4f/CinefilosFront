import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useLoggedInUser } from '../../api/AuthContext';
import backendApiClient from '../../api/backendConfig';
import './UserDataModal.css';
import { format } from 'date-fns';

const UserDataModal = ({ show, handleClose }) => {
  const { loggedInUser } = useLoggedInUser();
  const [userDetailedData, setUserDetailedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!loggedInUser || !loggedInUser.userId) {
          console.error('loggedInUser no está definido o no tiene una propiedad userId válida.');
          setError('User not logged in or invalid user ID');
          setIsLoading(false);
          return;
        }

        const response = await backendApiClient.get('/user-details');
        if (response && response.data) {
          console.log('Fetched user details:', response.data);
          setUserDetailedData(response.data);
        } else {
          console.error('Error: respuesta vacía o sin datos');
          setError('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (loggedInUser && loggedInUser.userId) {
      fetchUserDetails();
    }
  }, [loggedInUser]);

  const formattedDate = userDetailedData.registrationDate ? format(new Date(userDetailedData.registrationDate), 'dd/MM/yyyy') : '';

  return (
    <Modal show={show} onHide={handleClose} centered className='modal-container-userdata'>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title className="custom-modal-title">
          <FontAwesomeIcon icon={faInfoCircle} />
          {' '}
          Detalles del Usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='custom-body'>
        {isLoading && (
          <div className="loading-message">
            Cargando datos del usuario...
          </div>
        )}
        {error && (
          <div className="error-message">
            <FontAwesomeIcon icon={faExclamationCircle} /> Error: {error}
          </div>
        )}
        {userDetailedData && !isLoading && !error && (
          <>
            <div className="custom-row" style={{cursor:'default'}}>
              <span className="custom-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span className="custom-text">{userDetailedData.username}</span>
            </div>
            <div className="custom-row" style={{cursor:'default'}}>
              <span className="custom-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span className="custom-text">Rol: {userDetailedData.userRole}</span>
            </div>
            <div className="custom-row" style={{cursor:'default'}}>
              <span className="custom-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span className="custom-text">Fecha de registro: {formattedDate}</span>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UserDataModal;


