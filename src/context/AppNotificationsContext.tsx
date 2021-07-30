import React, { useState, useCallback, useContext } from 'react';
import { Variant } from 'react-bootstrap/esm/types';

interface Notification {
  message: string;
  type: Variant;
}

interface IAppNotificationsContext {
  notification: Notification;
  addNotification: (notification: Notification) => void;
  removeNotification: () => void;
}

const AppNotificationsContext = React.createContext<IAppNotificationsContext>({
  notification: null,
  addNotification: () => {},
  removeNotification: () => {},
});

export function useAppNotificationsContext() {
  return useContext(AppNotificationsContext);
}

export default function AppNotificationsProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const removeNotification = () => setNotification(null);
  const addNotification = (notification: Notification) => setNotification(notification);

  const contextValue: any = {
    notification,
    addNotification: useCallback((notification: Notification) => addNotification(notification), []),
    removeNotification: useCallback(() => removeNotification(), []),
  };

  return <AppNotificationsContext.Provider value={contextValue}>{children}</AppNotificationsContext.Provider>;
}
