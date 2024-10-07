import React from 'react'
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { IoHeartCircleSharp } from 'react-icons/io5';
import {PiPopcornFill} from 'react-icons/pi';
import { GiTicket } from 'react-icons/gi';
import './Section.css';

const Section = () => {
  return (
    <div className="section-container">
      <Row className="justify-content-evenly">
        <Col xs="auto" className="text-center icon-item">
          <Link to="/favoritos" className="text-decoration-none section-link">
            <IoHeartCircleSharp className="section-icon heart-icon" style={{width:'70px', height:'70px'}}/>
            <p className="section-text">Favoritos</p>
          </Link>
        </Col>
        <Col xs="auto" className="text-center icon-item">
          <Link to="/maraton" className="text-decoration-none section-link">
            <img src="/iconpopcorn.png" alt="" style={{width:'68px', height:'68px'}}/>
            <p className="section-text">Maratón</p>
          </Link>
        </Col>
        <Col xs="auto" className="text-center icon-item">
          <Link to="/estrenos" className="text-decoration-none section-link">
            <img src="/iconticket.png" alt="" style={{width:'65px', height:'65px'}} />
            <p className="section-text">Estrenos</p>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Section
