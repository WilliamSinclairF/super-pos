import React from 'react';
import { Container } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

export const Layout = ({ children }) => {
  return (
    <Container style={{ minHeight: '100vh' }} className="d-flex align-items-center justify-content-center">
      <div className="w-100">{children}</div>
    </Container>
  );
};
