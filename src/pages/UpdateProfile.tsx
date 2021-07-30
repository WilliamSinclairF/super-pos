import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAppNotificationsContext } from '../context/AppNotificationsContext';
import { useAuth } from '../context/AuthContext';

export const UpdateProfile: React.FC<RouteComponentProps> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const { addNotification, removeNotification } = useAppNotificationsContext();
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const promises = [];
    removeNotification();

    if (!emailRef?.current?.value) {
      return addNotification({ message: 'Please provide an email', type: 'danger' });
    }
    if (passwordRef?.current?.value !== confirmPasswordRef?.current?.value) {
      return addNotification({ message: 'Passwords do not match', type: 'danger' });
    }
    if (emailRef?.current?.value !== currentUser?.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef?.current?.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    setLoading(true);

    Promise.all(promises)
      .then(() => {
        addNotification({ message: 'Profile updated', type: 'success' });
      })
      .catch((error) => {
        const errorMessage = error?.message ? error?.message : 'Unable to update account';
        addNotification({ message: errorMessage, type: 'danger' });
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={currentUser?.email || ''}></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep existing password"
                autoComplete="false"
              ></Form.Control>
            </Form.Group>

            <Form.Group id="passwordConfirmation">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                placeholder="Leave blank to keep existing password"
                autoComplete="false"
              ></Form.Control>
            </Form.Group>

            <Button type="submit" className="w-100 mt-4" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>{' '}
      </div>
    </>
  );
};
