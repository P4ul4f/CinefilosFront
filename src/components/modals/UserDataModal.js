import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import './UserDetailsDataModal.css'; // Create a separate CSS file for styling this modal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useLoggedInUser } from '../../api/AuthContext'; 
import { useState, useEffect } from 'react';

const UserDataModal = ({ show, handleClose }) => {

const { loggedInUser } = useLoggedInUser();
  const [userDetailedData, setUserDetailedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user detailed data on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/users/${loggedInUser.id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUserDetailedData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (loggedInUser.id) { // Check if user ID is available before fetching
      fetchUserDetails();
    }
  }, [loggedInUser.id]);
  

  return (
    <Modal show={show} onHide={handleClose} centered className='modal-container-userdetailsdata'>
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
            <div className="custom-row">
              <span className="custom-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span className="custom-text">{userDetailedData.username}</span>
            </div>
            <div className="custom-row">
              <span className="custom-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span className="custom-text">Rol: {userDetailedData.rol}</span>
            </div>
            <div className="custom-row">
              <span className="custom-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span className="custom-text">Fecha de registro: {userDetailedData.registrationDate}</span>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UserDataModal;
