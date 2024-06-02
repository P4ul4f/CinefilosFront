import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './UserModal.css';
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';

const UserModal = ({ show, handleClose }) => {

    //MODAL LOGIN
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    

    const handleLoginClick = () => {
        setShowLoginModal(true);
        handleClose();
    };

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
    };

    //MODAL REGISTER

    const handleRegisterClick = () => {
        setShowRegisterModal(true);
        handleClose();
    };

    const handleRegisterModalClose = () => {
        setShowRegisterModal(false);
    };
  return (
    <>
    <Modal show={show} onHide={handleClose} centered dialogClassName='custom-modal'>
      <Modal.Header closeButton={false} className="custom-header">
        <div className="close-button" onClick={handleClose} style={{color:'white', fontSize:'2rem', position: 'absolute', right: '10px', color: 'white', fontSize: '1.8rem', zIndex: '1000', margin:'20px 0'}}>
            <IoClose cursor="pointer"/>
        </div>
      </Modal.Header>
      <Modal.Body className="text-center align-content-center">
        <div className="custom-button-container">
          <Button variant="dark" className="d-flex align-items-center mb-2 custom-button" onClick={handleLoginClick}>
            <FontAwesomeIcon icon={faUser} className="me-2" />
            Iniciar sesión
          </Button>
          <Button variant="dark" className="d-flex align-items-center custom-button" onClick={handleRegisterClick}>
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
            Registrarse
          </Button>
        </div>
      </Modal.Body>

      {/* MODAL LOGIN */}
      <Modal show={showLoginModal} onHide={handleLoginModalClose}  centered>
            {/* Contenido del modal de inicio de sesión */}
        </Modal>

    </Modal>
    <UserLogin show={showLoginModal} handleClose={handleLoginModalClose} handleUserModalClose={handleClose} />
    <UserRegister show={showRegisterModal} handleClose={handleRegisterModalClose} handleUserModalClose={handleClose}></UserRegister>
    </>
  );
}

export default UserModal;
