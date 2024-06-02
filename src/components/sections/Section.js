import React from 'react'
import { IoHeartCircleSharp } from "react-icons/io5";
import { PiPopcornFill } from "react-icons/pi";
import { GiTicket } from "react-icons/gi";
import { Container, Row, Col } from 'react-bootstrap';
import './Section.css';
import { Link } from 'react-router-dom';
import Premiere from './Premiere';

const Section = () => {
  return (
    <div className="section-container">
        <Row className="justify-content-evenly">
          <Col xs="auto" className="text-center icon-item">
          <Link to="/favoritos" className="text-decoration-none">
            <IoHeartCircleSharp className="section-icon"/>
            <p className="section-text">Favoritos </p>
          </Link>
          </Col>
          <Col xs="auto" className="text-center icon-item">
          <Link to="/maraton" className="text-decoration-none">
          <PiPopcornFill className="section-icon"/>
          <p className="section-text">Maratón</p>
          </Link>
          </Col>
          <Col xs="auto" className="text-center icon-item">
          <Link to="/estrenos" className="text-decoration-none">
            <GiTicket className="section-icon" />
            <p className="section-text">Estrenos</p>
          </Link>
          </Col>
        </Row>
    </div>
  )
}

export default Section
