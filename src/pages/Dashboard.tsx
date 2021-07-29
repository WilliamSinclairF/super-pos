import React from 'react';
import { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState<string>('');
  const { currentUser, logOut } = useAuth();
  async function handleLogout() {
    setError('');
    try {
      await logOut();
      history.push('/login');
    } catch (error) {
      setError('Unable to log out');
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser?.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Link to="/new-sale" className="btn btn-primary w-100 mt-3">
            New Sale
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout} style={{ textDecoration: 'none' }}>
          Log Out
        </Button>{' '}
      </div>
    </>
  );
};
