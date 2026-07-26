import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import {  Container,Row,Col,Card,Form,Button,Alert} from 'react-bootstrap';
import '../styles/login.css';
import FloatingCards from '../Components/Login/FloatingCards';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      await signIn(email, password);
      setSuccessMsg('Login Successful! Welcome back!');
      navigate('/');
    } catch {
      setError('The email or password is incorrect. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await googleSignIn();
      navigate('/');
    } catch{
      setError('Google sign-in failed. Try again.');
    }
  };

  return (
  <div className="login-page">

    <FloatingCards/>


    <Row className="w-100 justify-content-center">

      <Col xs={12} sm={10} md={8} lg={5} xl={4}>

        <Card className="login-card shadow-lg border-0 rounded-4">

          <Card.Body className="p-4 p-md-5">

            <div className="text-center mb-4">
              <h1 className="fw-bold">
                Pokédex Collection
              </h1>

              <p className="text-muted">
                Sign in to continue your collection.
              </p>
            </div>


            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            {successMsg && (
              <Alert variant="success">
                {successMsg}
              </Alert>
            )}


            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3">
                <Form.Label>
                  Email
                </Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />

              </Form.Group>


              <Form.Group className="mb-4">
                <Form.Label>
                  Password
                </Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />

              </Form.Group>


              <Button
                type="submit"
                variant="primary"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </Button>


              <div className="text-center text-muted mb-3">
                — OR —
              </div>


              <Button
                variant="outline-secondary"
                className="w-100"
                type="button"
                onClick={handleGoogleSignIn}
              >
                Continue with Google
              </Button>


            </Form>

          </Card.Body>

        </Card>

      </Col>

    </Row>

  </div>
);
};
export default Login;
