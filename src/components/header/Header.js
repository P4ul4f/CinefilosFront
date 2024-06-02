import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Button  from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import {Form, FormControl} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import './Header.css';
import UserModal from '../modals/UserModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    //MODAL USUARIO (LOGIN O REGISTER)
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => {
    setShowModal(false);
    };

    const handleUserClick = () => {
    setShowModal(true);
    };

  return (
    <>
    <Navbar variant='dark' fixed='top' style={{backgroundColor:'black'}} className='custom-header'>
        <Container fluid>
            <Navbar.Brand href='/' style={{"color":'rgb(134, 21, 183)'}}>
                <FontAwesomeIcon icon={faVideoSlash}/> Cinéfilos
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll'/>
            <Navbar.Collapse id='navbarScroll'>
                <Nav
                    className='me-auto my-3 my-lg-0'
                    style={{maxHeight: '100px'}}>
                    <NavLink className="nav-link" to="/" style={{ marginRight: '12px'}}>Inicio</NavLink>
                    <NavLink className="nav-link" to="/listaFavoritos" style={{ marginRight: '12px' }}>Mi Lista</NavLink>
                    <NavDropdown
                        title="Generos"
                        className='custom-dropdown'
                        >
                        <NavDropdown.Item as={Link} to="/animadas" className='custom-item-dropdown'>Animadas</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/ciencia-ficcion" className='custom-item-dropdown'>Ciencia Ficción</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/crimen" className='custom-item-dropdown'>Crimen</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/comedia" className='custom-item-dropdown'>Comedia</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/romance" className='custom-item-dropdown'>Romance</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/suspenso" className='custom-item-dropdown'>Suspenso</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/terror" className='custom-item-dropdown'>Terror</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <div className="d-flex align-items-center" style={{gap:'30px'}}>
                        <Form className="d-flex">
                            <div className="input-group">
                                <FormControl
                                    type="search"
                                    placeholder="Buscar"
                                    className="mr-2"
                                    aria-label="Buscar"
                                />
                                <Button variant="outline-light" id="button-addon2">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </div>
                        </Form>
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '2rem', color: 'white', cursor:'pointer'}} onClick={handleUserClick}/>
                </div>

            </Navbar.Collapse>
        </Container>

    </Navbar>
    
    <UserModal show={showModal} handleClose={handleModalClose} />

    </>

  )
}

export default Header
