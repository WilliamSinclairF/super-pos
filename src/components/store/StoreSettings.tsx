import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../../context/StoreContext';

export const StoreSettings = () => {
  const { activeStore } = useStoreContext();
  console.log(activeStore);
  const [loading, setLoading] = useState(false);

  const [textFieldValues, setTextFieldValues] = useState({
    name: activeStore?.name,
    description: activeStore?.description,
    address: activeStore?.address,
  });

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setTextFieldValues({ ...textFieldValues, [target.name]: target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <Card>
      <Card.Body>
        {JSON.stringify(activeStore)}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={textFieldValues.name} onChange={handleTextFieldChange} />
          </Form.Group>

          <Form.Group id="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={textFieldValues.description}
              onChange={handleTextFieldChange}
            />
          </Form.Group>

          <Form.Group id="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={textFieldValues.address} onChange={handleTextFieldChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Default tax code</Form.Label>
            <Form.Control as="select" name="taxCode">
              {activeStore.storeSettings.taxCodes.map((code) => (
                <option>{`Name: ${code.name}, rates: ${code.taxRates
                  .map((rate) => `${rate.name} - ${rate.percentage}%`)
                  .join(', ')}`}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button type="submit" className="w-100 mt-4" disabled={loading}>
            Save
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
