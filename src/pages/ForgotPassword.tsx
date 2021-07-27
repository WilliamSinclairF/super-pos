import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ForgotPassword: React.FC<RouteComponentProps> = ({ history }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!emailRef?.current?.value) {
      return setError('Please provide an email');
    }

    try {
      setLoading(true);
      setConfirmationMessage('');
      await resetPassword(emailRef.current.value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    setConfirmationMessage(
      'Your request has been received, an email with instructions on how to reset your password will be sent if the email exists in our records.',
    );
  }

  return (
    <>
      <Card>
        <div className="w-100 text-center mb-2">
          {confirmationMessage && <Alert variant="success">{confirmationMessage}</Alert>}
        </div>

        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Button type="submit" className="w-100 mt-4" disabled={loading}>
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign up</Link>{' '}
      </div>
    </>
  );
};
