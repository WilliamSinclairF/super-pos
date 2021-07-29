import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const UpdateProfile: React.FC<RouteComponentProps> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { currentUser, updateEmail, updatePassword } = useAuth();

  const [error, setError] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const promises = [];
    setError('');
    setConfirmationMessage('');

    if (!emailRef?.current?.value) {
      return setError('Please provide an email');
    }
    if (passwordRef?.current?.value !== confirmPasswordRef?.current?.value) {
      return setError('Passwords do not match');
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
        setConfirmationMessage('Profile updated');
      })
      .catch((error) => {
        const errorMessage = error?.message ? error?.message : 'Unable to update account';
        setError(errorMessage);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Card>
        <div className="w-100 text-center mb-2">{error && <Alert variant="danger">{error}</Alert>}</div>
        <div className="w-100 text-center mb-2">
          {confirmationMessage && <Alert variant="success">{confirmationMessage}</Alert>}
        </div>

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
