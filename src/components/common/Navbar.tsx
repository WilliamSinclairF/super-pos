import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Nav, Navbar as ReactNavbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useStoreContext } from '../../context/StoreContext';

export const Navbar = () => {
  const storeCtx = useStoreContext();
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <ReactNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <ReactNavbar.Brand href="/">
          <FontAwesomeIcon icon={faHome} />
        </ReactNavbar.Brand>
        <ReactNavbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/new-sale">New Sale</Nav.Link>
            <NavDropdown title="Quick Actions" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </ReactNavbar.Collapse>
        <ReactNavbar.Collapse className="justify-content-end">
          <ReactNavbar.Text className="m-auto">
            Selected store: {storeCtx?.activeStore?.address || 'n/a'}
          </ReactNavbar.Text>
          <ReactNavbar.Text className="m-auto">
            Signed in as: <a href="#login">{currentUser?.email || 'n/a'}</a>
          </ReactNavbar.Text>
        </ReactNavbar.Collapse>
      </Container>
    </ReactNavbar>
  );
};
