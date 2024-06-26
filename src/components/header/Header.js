import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown, Container, Form, Button, FormControl, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useLoggedInUser } from '../../api/AuthContext';
import UserModal from '../modals/UserModal'; // Importar el modal de inicio de sesión / registro
import UserDetailsModal from '../modals/UserDetailsModal'; // Importar el modal de detalles del usuario
import './Header.css';
import MessageModal from '../modals/MessageModal';
import SearchBar from './SearchBar';


const Header = () => {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();

  // Estado para el modal de inicio de sesión / registro
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleUserClick = () => setShowModal(true);

  // Estado para el modal de detalles del usuario
  const [showModalUserDetails, setShowModalUserDetails] = useState(false);
  const handleUserDetailsModalClose = () => setShowModalUserDetails(false);
  const handleUserDetailsClick = () => setShowModalUserDetails(true);

  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);


  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Limpiar el token del localStorage
    setLoggedInUser(null); // Actualizar el estado del usuario autenticado
    setShowModalUserDetails(false);
    setShowLogoutMessage(true);
    setShowLoginMessage(false);

    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 3000);
  };

  const handleCloseLoginMessage = () => {
    setShowLoginMessage(false);
  };

  const handleCloseLogoutMessage = () => {
    setShowLoginMessage(false);
  };
  

  return (
    <>
      <Navbar variant='dark' fixed='top' style={{ backgroundColor: 'black'}} className='custom-header'>
        <Container fluid>
          <Navbar.Brand href='/' style={{ color: 'rgb(134, 21, 183)' }}>
            <img src="/LOGO.png" alt="" style={{ height: '100px', width: '100px' }} />Cinefilos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav className='me-auto my-3 my-lg-0' style={{ maxHeight: '100px' }}>
              <NavLink className="nav-link" to="/" style={{ marginRight: '12px' }}>Inicio</NavLink>
              <NavLink className="nav-link" to="/lista-favoritos" style={{ marginRight: '12px' }}>Mi Lista</NavLink>
              <NavDropdown title="Géneros" className='custom-dropdown'>
                <NavDropdown.Item as={NavLink} to="/animadas" className='custom-item-dropdown'>Animadas</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/ciencia-ficcion" className='custom-item-dropdown'>Ciencia Ficción</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/crimen" className='custom-item-dropdown'>Crimen</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/comedia" className='custom-item-dropdown'>Comedia</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/romance" className='custom-item-dropdown'>Romance</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/suspenso" className='custom-item-dropdown'>Suspenso</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/terror" className='custom-item-dropdown'>Terror</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="d-flex align-items-center" style={{ gap: '30px' }}>
              <SearchBar/>
              {loggedInUser ? (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: '2rem', color: 'white', cursor: 'pointer' }}
                  onClick={handleUserDetailsClick}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: '2rem', color: 'white', cursor: 'pointer' }}
                  onClick={handleUserClick}
                />
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MODAL DE INICIO DE SESIÓN / REGISTRO */}
      <UserModal show={showModal} handleClose={handleModalClose} setShowLoginMessage={setShowLoginMessage}/>

      {/* MODAL DE DETALLES DEL USUARIO */}
      {loggedInUser && (
        <UserDetailsModal show={showModalUserDetails} handleClose={handleUserDetailsModalClose} user={loggedInUser} handleLogout={handleLogout} />
      )}

      <MessageModal show={showLoginMessage} handleClose={handleCloseLoginMessage} message="Inicio de sesión exitoso." />

      {/* Renderizado del modal para mensajes de cierre de sesión */}
      <MessageModal show={showLogoutMessage} handleClose={handleCloseLogoutMessage} message="Sesión cerrada con éxito." />
            
    </>
  );
}

export default Header;

