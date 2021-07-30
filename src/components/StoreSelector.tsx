import React from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useStoreContext } from '../context/StoreContext';
import { Store } from '../interfaces/store';

interface Props {
  stores: Store[];
}

export const StoreSelector = (props: Props) => {
  const { loading, activeStore, setActiveStore } = useStoreContext();

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading &&
        props?.stores?.map((store) => (
          <Card key={store.id}>
            <Card.Header className={`${store?.id === activeStore?.id && 'alert-success'}`}>
              {store?.id === activeStore?.id && <strong>Selected</strong>} {store?.name} - {store?.address}
            </Card.Header>
            <Card.Body className="text-center">
              <span className="w-100">Open: {store?.storeSettings?.open ? 'Yes' : 'No'}</span>
              <Button className="w-100 mt-3" onClick={() => setActiveStore(store)}>
                Select
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};
