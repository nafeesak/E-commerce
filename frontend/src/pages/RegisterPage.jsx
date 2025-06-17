import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearUserError } from '../redux/slices/userSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null); // For local messages like password mismatch

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    // Clear error when component mounts or unmounts to prevent stale messages
    return () => {
        dispatch(clearUserError());
        setMessage(null); // Clear local messages too
    };
  }, [navigate, userInfo, redirect, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {message && <Message variant="error">{message}</Message>}
      {error && <Message variant="error">{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password-register"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="text-center">
        Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
