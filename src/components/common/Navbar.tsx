import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Nav, Navbar as BootstrapNavbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useStoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import { useAppNotificationsContext } from '../../context/AppNotificationsContext';

export const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  const storeCtx = useStoreContext();
  const { addNotification, removeNotification } = useAppNotificationsContext();

  async function handleLogout() {
    removeNotification();
    try {
      await logOut();
    } catch (error) {
      console.log(error);
      addNotification({ message: 'Unable to log out', type: 'danger' });
    }
  }

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon={faHome} />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse>
          {!currentUser && (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Log In
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to="/forgot-password">
                Forgot Password
              </Nav.Link>
            </Nav>
          )}

          {currentUser && (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/new-sale">
                  New Sale
                </Nav.Link>

                {storeCtx?.activeStore && (
                  <NavDropdown
                    title={`Selected store: ${storeCtx?.activeStore?.address || 'n/a'}`}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item as={Link} to="/store-settings">
                      Store settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item as={Link} to="#action/3.1">
                      Change store
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                <NavDropdown title="Profile" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="#action/3.1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav className="me-auto">
                <BootstrapNavbar.Text>
                  Signed in as: {currentUser?.email || 'n/a'}&nbsp;{' '}
                  <a href="" onClick={handleLogout}>
                    Log Out
                  </a>
                </BootstrapNavbar.Text>
              </Nav>
            </>
          )}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};
