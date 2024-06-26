// MessageModal.jsx
// MessageModal.js

import React, { useEffect } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import './MessageModal.css';

const MessageModal = ({ show, handleClose, message }) => {
  // Cerrar automáticamente el modal después de 3 segundos
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        handleClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, handleClose]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className='message-modal'>
        <Alert variant='success' className="text-center message-alert">
          <h5 className='message-title'>{message}</h5>
        </Alert>
      </Modal.Body>
    </Modal>
  );
};

export default MessageModal;



