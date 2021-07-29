import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useStoreContext } from '../context/StoreContext';
import { Store } from '../interfaces/store';
import { StoreSelector } from './StoreSelector';

interface Props {
  store: Store;
}

export const SelectedStore = (props: Props) => {
  const { store } = props;
  const { allStores } = useStoreContext();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="w-100 d-flex justify-content-around m-3">
        {store ? (
          <span className="text-black-50">Selected store: {`${store.name} - ${store.address}`}</span>
        ) : (
          <strong>No store selected</strong>
        )}
        <Button size="sm" variant="secondary" onClick={handleShow}>
          Change
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Change Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StoreSelector stores={allStores} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
