import React from 'react';
import { Alert } from 'react-bootstrap';
import { NewSaleInputs } from '../components/NewSaleInputs';
import { SelectedStore } from '../components/SelectedStore';
import { StoreSelector } from '../components/StoreSelector';
import { useStoreContext } from '../context/StoreContext';

export const NewSale = () => {
  const { loading, error, activeStore, allStores } = useStoreContext();

  return (
    <div>
      <h3 className="w-100 text-center m-3">New Sale</h3>
      {loading && <h1>Loading</h1>}
      {error && <h1>{error}</h1>}
      {activeStore && (
        <>
          <SelectedStore store={activeStore} />
          <NewSaleInputs store={activeStore} />
        </>
      )}
      {!activeStore && (
        <>
          <Alert variant="danger" className="text-center">
            Please select your store
          </Alert>
          {allStores ? <StoreSelector stores={allStores} /> : <span>Loading</span>}
        </>
      )}
    </div>
  );
};
