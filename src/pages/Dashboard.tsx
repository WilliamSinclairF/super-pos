import React from 'react';
import { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAppNotificationsContext } from '../context/AppNotificationsContext';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
  const { addNotification, removeNotification } = useAppNotificationsContext();

  const { currentUser, logOut } = useAuth();
  async function handleLogout() {
    removeNotification();
    try {
      await logOut();
      history.push('/login');
    } catch (error) {
      addNotification({ message: 'Unable to log out', type: 'danger' });
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard</h2>
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
