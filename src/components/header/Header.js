import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import Button  from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    
    <Navbar bg='dark' variant='dark' expand="lg">
        <Container fluid>
            <Navbar.Brand href='/' style={{"color":'red'}}>
                <FontAwesomeIcon icon={faVideoSlash}/> Cinéfilos
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll'/>
            <Navbar.Collapse id='navbarScroll'>
                <Nav
                    className='me-auto my-3 my-lg-0'
                    style={{maxHeight: '100px'}}>
                    <NavLink className="nav-link" to="/" style={{ marginRight: '12px' }}>Inicio</NavLink>
                    <NavLink className="nav-link" to="/listaFavoritos" style={{ marginRight: '12px' }}>Mi Lista</NavLink>
                    <NavLink className="nav-link" to="/generos" style={{ marginRight: '12px' }}>Generos</NavLink>
                </Nav>
                <Button variant="outline-info" className="me-2" style={{"color":'red', "border":'1px solid red'}}>Login</Button>
                <Button variant="outline-info" className="me-2" style={{"color":'red', "border":'1px solid red'}}>Register</Button>

            </Navbar.Collapse>
        </Container>

    </Navbar>

  )
}

export default Header
