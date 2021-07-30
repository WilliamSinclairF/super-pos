import React from 'react';
import { Alert } from 'react-bootstrap';
import { useAppNotificationsContext } from '../../context/AppNotificationsContext';

export const Notifications = () => {
  const { notification } = useAppNotificationsContext();

  if (!notification) {
    return null;
  }

  return (
    <Alert variant={notification.type}>
      <p className="text-center">{notification.message}</p>
    </Alert>
  );
};
