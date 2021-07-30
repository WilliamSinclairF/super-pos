import React from 'react';
import { useAppNotificationsContext } from '../../context/AppNotificationsContext';

const Loading = () => {
  const { loading, notification } = useAppNotificationsContext();

  return loading ? (
    <div className="overlay-content">
      <div className="wrapper">
        <span className="message">{notification?.message || 'Loading...'}</span>
      </div>
    </div>
  ) : null;
};

export default Loading;
