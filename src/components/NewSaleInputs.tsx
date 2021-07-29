import React, { FormEvent, useState } from 'react';
import { Card, Alert, Form, Button } from 'react-bootstrap';
import { Store } from '../interfaces/store';
import { addSale } from '../services/sales';

interface Props {
  store: Store;
}

export const NewSaleInputs = (props: Props) => {
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    addSale({ amount: Number(amount), note, storeId: props.store.id });
  }
  return (
    <Card>
      <div className="w-100 text-center mb-2">{error && <Alert variant="danger">{error}</Alert>}</div>
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
