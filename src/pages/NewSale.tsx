import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { NewSaleInputs } from '../components/sales/NewSaleInputs';
import { SelectedStore } from '../components/store/SelectedStore';
import { StoreSelector } from '../components/store/StoreSelector';
import { useStoreContext } from '../context/StoreContext';

export const NewSale = () => {
  const { activeStore, allStores, fetchStoreList } = useStoreContext();

  useEffect(() => {
    fetchStoreList();
  }, []);

  return (
    <div>
      <h3 className="w-100 text-center m-3">New Sale</h3>

      {activeStore && (
        <>
          <SelectedStore store={activeStore} />
          <NewSaleInputs store={activeStore} />
        </>
      )}
      {!activeStore && (
        <>
          <Alert variant="info" className="text-center">
            Please select your store
          </Alert>
          {allStores ? <StoreSelector stores={allStores} /> : <span>Loading</span>}
        </>
      )}
    </div>
  );
};
