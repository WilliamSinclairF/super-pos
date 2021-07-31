import React from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../../context/StoreContext';
import { Store } from '../../interfaces/store';

interface Props {
  stores: Store[];
}

export const StoreSelector = (props: Props) => {
  const { activeStore, setActiveStore } = useStoreContext();

  if (!props.stores.length) {
    return (
      <div className="w-100 text-center">
        <p>
          No store was found.
          <Link to="/new-store">Create store</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      {props?.stores?.map((store) => (
        <Card key={store?.id}>
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
