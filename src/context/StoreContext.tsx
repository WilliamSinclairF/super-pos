import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Store } from '../interfaces/store';
import { getAllStores } from '../services/stores';
import { useAuth } from './AuthContext';

interface IStoreContext {
  loading: boolean;
  error?: string;
  activeStore: Store;
  setActiveStore: Dispatch<SetStateAction<Store>>;
  allStores;
}

export const StoreContext = React.createContext<IStoreContext | null>(null);

export function useStoreContext() {
  return useContext(StoreContext);
}

export const StoreProvider: React.FC = ({ children }) => {
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [allStores, setAllStores] = useState<Store[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { currentUser } = useAuth();

  async function getStoreList() {
    if (!currentUser) {
      return setError('User not logged in');
    }
    setLoading(true);
    const storeList = await getAllStores();
    if (!storeList) {
      setLoading(false);
      return setError('No stores were found');
    }
    setAllStores(storeList);
    setLoading(false);
  }

  const value: IStoreContext = {
    loading,
    error,
    activeStore,
    setActiveStore,
    allStores,
  };

  useEffect(() => {
    try {
      getStoreList();
    } catch (error) {
      setError('Unable to fetch stores');
    }
  }, []);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
