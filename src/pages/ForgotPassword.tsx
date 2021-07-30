import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAppNotificationsContext } from '../context/AppNotificationsContext';
import { useAuth } from '../context/AuthContext';

export const ForgotPassword: React.FC<RouteComponentProps> = ({ history }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const { addNotification, removeNotification } = useAppNotificationsContext();
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!emailRef?.current?.value) {
      return addNotification({ message: 'Please provide an email', type: 'danger' });
    }

    try {
      setLoading(true);
      removeNotification();
      await resetPassword(emailRef.current.value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    addNotification({
      message:
        'Your request has been received, an email with instructions on how to reset your password will be sent if the email exists in our records.',
      type: 'info',
    });
  }

  return (
    <>
      <Card>
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
