import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { signUp, currentUser } = useAuth();

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!emailRef?.current?.value || !passwordRef?.current?.value) {
      return setError('Please provide an email and a password');
    }

    if (passwordRef?.current?.value !== confirmPasswordRef?.current?.value) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      setError('');
      await signUp(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push('/');
    } catch (error) {
      setError('Unable to create an account');
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <div className="w-100 text-center mb-2">{error && <Alert variant="danger">{error}</Alert>}</div>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="passwordConfirmation">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required></Form.Control>
            </Form.Group>

            <Button type="submit" className="w-100 mt-4" disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login"></Link>{' '}
      </div>
    </>
  );
};
