import React, { useEffect } from 'react';
import { Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NewSaleInputs } from '../components/sales/NewSaleInputs';
import { SalesList } from '../components/sales/SalesList';
import { SelectedStore } from '../components/store/SelectedStore';
import { StoreSelector } from '../components/store/StoreSelector';
import { useStoreContext } from '../context/StoreContext';

export const NewSale = () => {
  const { activeStore, allStores, fetchStoreList } = useStoreContext();

  useEffect(() => {
    fetchStoreList();
  }, []);

  if (!allStores?.length) {
    return (
      <div className="w-100 text-center">
        <h1>No store was found.</h1>
        <h3>
          <Link to="/new-store">Create store</Link>
        </h3>
      </div>
    );
  }
  return (
    <div>
      <h3 className="w-100 text-center m-3">New Sale</h3>

      {activeStore && (
        <>
          <SelectedStore store={activeStore} />
          <NewSaleInputs store={activeStore} />
          <SalesList />
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
