import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { addSale } from '../../services/sales';
import { useAppNotificationsContext } from '../../context/AppNotificationsContext';
import { Card, Button, Form } from 'react-bootstrap';

const NewSaleSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0, 'Amount must be greater than 0')
    .max(999999, `You are too succesful for this POS`)
    .required('An amount must be entered'),
});

export const NewSaleInputs = ({ store }) => {
  const { addNotification, removeNotification } = useAppNotificationsContext();
  return (
    <Formik
      initialValues={{
        amount: 0,
        note: '',
      }}
      validationSchema={NewSaleSchema}
      onSubmit={async (values, { resetForm }) => {
        removeNotification();
        const { note, amount } = values;
        const response = await addSale({ note, amount, storeId: +store.id });
        if (!response.ok) {
          return addNotification({
            message: response.data ? response.data : 'An unknown error occured',
            type: 'danger',
          });
        }
        resetForm();
        addNotification({ message: 'New sale created successfully', type: 'success' });
      }}
    >
      {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
        <FormikForm>
          <Card>
            <Card.Body>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  placeholder="Sale amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.amount && touched.amount ? <div className="text-danger mt-2 mb-2">{errors.amount}</div> : null}
              </Form.Group>

              <Form.Group>
                <Form.Label>Note</Form.Label>
                <Form.Control type="text" name="note" onChange={handleChange} onBlur={handleBlur} />
              </Form.Group>

              <Button type="submit" className="w-100 mt-4" disabled={isSubmitting}>
                Save
              </Button>
            </Card.Body>
          </Card>
        </FormikForm>
      )}
    </Formik>
  );
};
