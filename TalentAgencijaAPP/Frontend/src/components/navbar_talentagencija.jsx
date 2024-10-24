import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';

export default function Navbar_talentagencija(){

    const navigate = useNavigate();

    return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Nav.Link href="#Početna">Talent Agencija App</Nav.Link>

        <Nav.Link onClick={navigate(RoutesNames.HOME)}>Početna</Nav.Link>
        <Nav.Link href="#Swagger">Swagger</Nav.Link>
        <Navbar.Brand href="#home">Programi</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Talenti</Nav.Link>
            <Nav.Link href="#link">Swagger</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
    );
}