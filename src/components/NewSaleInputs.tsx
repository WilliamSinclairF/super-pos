import React, { FormEvent, useState } from 'react';
import { Card, Alert, Form, Button } from 'react-bootstrap';
import { useAppNotificationsContext } from '../context/AppNotificationsContext';
import { Store } from '../interfaces/store';
import { addSale } from '../services/sales';

interface Props {
  store: Store;
}

export const NewSaleInputs = (props: Props) => {
  const { addNotification, removeNotification } = useAppNotificationsContext();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    removeNotification();
    const response = await addSale({ amount: Number(amount), note, storeId: +props.store.id });
    if (!response.ok) {
      return addNotification({ message: response.data ? response.data : 'An unknown error occured', type: 'danger' });
    }
    addNotification({ message: 'New sale saved successfully', type: 'success' });
  }
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={({ target }) => setAmount(target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group id="note">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              value={note}
              onChange={({ target }) => setNote(target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className="w-100 mt-4" disabled={loading}>
            Save
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
