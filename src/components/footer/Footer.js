import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './Footer.css'; 


const Footer = () => {
  return (
    <footer className="footer-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto" className="text-center">
            <FaInstagram className="footer-icon" />
          </Col>
          <Col xs="auto" className="text-center">
          <FaXTwitter className="footer-icon"/>
          </Col>
          <Col xs="auto" className="text-center">
            <FaFacebook className="footer-icon" />
          </Col>
          <Col xs="auto" className="text-center">
            <FaEnvelope className="footer-icon" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center" style={{paddingTop:"20px"}}>
            <p className="footer-text">© 2024 Cinéfilos</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

