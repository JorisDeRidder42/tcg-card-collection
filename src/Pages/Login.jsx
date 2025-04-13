import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext'; // or wherever your auth context lives

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedInMsg, setLoggedInMsg] = useState('');

  const { signIn, googleSignIn } = useAuth(); // assuming you have a login function in context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoggedInMsg('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      setLoggedInMsg('Login Successful! Welcome back!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('The email or password is incorrect. Please try again.');
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Google sign-in failed. Try again.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loggedInMsg && <div className="alert alert-success">{loggedInMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group mb-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button
        type="button"
        className="btn btn-danger mt-2 w-100"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>
      </form>
    </div>
  );
};

export default Login;
