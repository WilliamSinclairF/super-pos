import React, { useContext, useState } from 'react';
import { Store } from '../interfaces/store';
import { getAllStores } from '../services/stores';
import { useAppNotificationsContext } from './AppNotificationsContext';
import { useAuth } from './AuthContext';

interface IStoreContext {
  activeStore: Store;
  setActiveStore: (store: Store) => void;
  allStores;
  fetchStoreList: () => void;
}

export const StoreContext = React.createContext<IStoreContext | null>(null);

export function useStoreContext() {
  return useContext(StoreContext);
}

export const StoreProvider: React.FC = ({ children }) => {
  const [activeStore, _setActiveStore] = useState<Store | null>(null);
  const [allStores, setAllStores] = useState<Store[] | null>(null);
  const { setLoading, addNotification, removeNotification } = useAppNotificationsContext();

  const { currentUser } = useAuth();

  async function fetchStoreList() {
    if (!currentUser) {
      console.log('no user');
      return;
    }
    try {
      setLoading(true);

      const storeList = await getAllStores();

      if (!storeList) {
        setLoading(false);
        return addNotification({ message: 'No stores were found', type: 'danger' });
      }
      setAllStores(storeList);

      setLoading(false);

      const localActiveStore = JSON.parse(localStorage.getItem('activeStore'));

      if (localActiveStore) {
        _setActiveStore(localActiveStore);
      }
    } catch (error) {
      setLoading(false);
      return addNotification({ message: 'Unable to fetch stores', type: 'danger' });
    }
  }

  function setActiveStore(store: Store) {
    localStorage.setItem('activeStore', JSON.stringify(store));
    _setActiveStore(store);
  }

  const contextValues: IStoreContext = {
    activeStore,
    setActiveStore,
    allStores,
    fetchStoreList,
  };

  return <StoreContext.Provider value={contextValues}>{children}</StoreContext.Provider>;
};
