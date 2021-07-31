import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useAppNotificationsContext } from '../../context/AppNotificationsContext';
import { Card, Button, Form } from 'react-bootstrap';
import { addStore } from '../../services/stores';

import { useHistory } from 'react-router';

const StoreCreatorSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name must have more than one character')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  description: Yup.string()
    .min(1, 'Description must have more than one character')
    .max(250, 'Description cannot exceed 250 characters'),
  address: Yup.string()
    .min(1, 'Address must have more than one character')
    .max(250, 'Address cannot exceed 250 characters')
    .required('Address is required'),
});

export const StoreCreator = () => {
  const { addNotification, removeNotification } = useAppNotificationsContext();
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        address: '',
      }}
      validationSchema={StoreCreatorSchema}
      onSubmit={async (values, { resetForm }) => {
        removeNotification();
        const response = await addStore(values);
        if (!response.ok) {
          return addNotification({
            message: 'Unable to create store',
            type: 'danger',
          });
        }
        resetForm();
        addNotification({ message: 'New store created successfully', type: 'success' });
        history.push('/');
      }}
    >
      {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
        <FormikForm>
          <Card>
            <Card.Body>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Store name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? <div className="text-danger mt-2 mb-2">{errors.name}</div> : null}
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Store description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description ? (
                  <div className="text-danger mt-2 mb-2">{errors.description}</div>
                ) : null}
              </Form.Group>

              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Store address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address ? (
                  <div className="text-danger mt-2 mb-2">{errors.address}</div>
                ) : null}
              </Form.Group>

              <Button type="submit" className="w-100 mt-4" disabled={isSubmitting}>
                Create store
              </Button>
            </Card.Body>
          </Card>
        </FormikForm>
      )}
    </Formik>
  );
};
