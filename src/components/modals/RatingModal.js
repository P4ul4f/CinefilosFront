import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import HeartIcon from './icons/HeartIcon';
import HeartBrokenIcon from './icons/HeartBrokenIcon';
import './UserModal.css';
import backendApiClient from '../../api/backendConfig';

const RatingModal = ({ show, handleClose, movieId, loggedInUser }) => {
  const [liked, setLiked] = useState(null);

  const handleLike = async (isLiked) => {
    try {

      if (!loggedInUser || !loggedInUser.userId) {
        console.error('loggedInUser no está definido o no tiene una propiedad id válida.');
        return;
      }
  
      const response = await backendApiClient.post('/rate', {
        userId: loggedInUser.userId,
        movieId: movieId,
        liked: isLiked
      });
  
      
      if (response && response.data) {
        console.log('Calificación enviada correctamente:', response.data);
      } else {
        console.error('Error: respuesta vacía o sin datos');
      }
      handleClose(); // Cierra el modal después de enviar la calificación
    } catch (error) {
      console.error('Error al enviar la calificación:', error);
      // Maneja el error de acuerdo a tus requerimientos
    }
  };

  console.log('loggedInUser en RatingModal:', loggedInUser);

  return (
    <Modal show={show} onHide={handleClose} centered className='custom-modal-rating'>
      <Modal.Header closeButton>
        <Modal.Title>Calificar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Qué opinas de esta película?</p>
        <div className="d-flex justify-content-center">
          <Button
            variant="light"
            className="heart-button"
            onClick={() => handleLike(true)}
          >
            <HeartIcon size={30} color={liked === true ? 'white' : 'white'} />
          </Button>
          <Button
            variant="light"
            className="heart-button"
            onClick={() => handleLike(false)}
          >
            <HeartBrokenIcon size={30} color={liked === false ? 'white' : 'white'} />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default RatingModal;