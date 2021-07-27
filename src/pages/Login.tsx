import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { logIn } = useAuth();

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!emailRef?.current?.value || !passwordRef?.current?.value) {
      return setError('Please provide an email and a password');
    }

    try {
      setLoading(true);
      setError('');
      await logIn(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push('/');
    } catch (error) {
      setError('Unable to log in, please verify your email and password');
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <div className="w-100 text-center mb-2">{error && <Alert variant="danger">{error}</Alert>}</div>
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
