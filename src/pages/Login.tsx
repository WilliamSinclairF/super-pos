import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAppNotificationsContext } from '../context/AppNotificationsContext';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { logIn } = useAuth();
  const { addNotification, removeNotification } = useAppNotificationsContext();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!emailRef?.current?.value || !passwordRef?.current?.value) {
      return addNotification({ message: 'Please provide an email and a password', type: 'danger' });
    }

    try {
      setLoading(true);
      removeNotification();
      await logIn(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push('/');
    } catch (error) {
      addNotification({
        message: 'Unable to log in, please verify your email and password',
        type: 'danger',
      });
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>

            <Button type="submit" className="w-100 mt-4" disabled={loading}>
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign up</Link>{' '}
      </div>
    </>
  );
};
