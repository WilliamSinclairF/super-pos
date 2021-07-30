import React, { useState, useCallback, useContext } from 'react';
import { Variant } from 'react-bootstrap/esm/types';

interface Notification {
  message: string;
  type: Variant;
}

interface IAppNotificationsContext {
  notification: Notification;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: () => void;
}

const AppNotificationsContext = React.createContext<IAppNotificationsContext>({
  notification: null,
  loading: null,
  setLoading: () => {},
  addNotification: () => {},
  removeNotification: () => {},
});

export function useAppNotificationsContext() {
  return useContext(AppNotificationsContext);
}

export default function AppNotificationsProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const [loading, _setLoading] = useState(false);

  const removeNotification = () => setNotification(null);
  const addNotification = (notification: Notification) => setNotification(notification);

  const setLoading = (isLoading: boolean) => _setLoading(isLoading);

  const contextValue: IAppNotificationsContext = {
    notification,
    loading,
    setLoading,
    addNotification: useCallback((notification: Notification) => addNotification(notification), []),
    removeNotification: useCallback(() => removeNotification(), []),
  };

  return <AppNotificationsContext.Provider value={contextValue}>{children}</AppNotificationsContext.Provider>;
}
