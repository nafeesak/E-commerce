import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearUserError } from '../redux/slices/userSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  // Redirect if already logged in
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    // Clear error when component mounts or unmounts to prevent stale messages
    return () => {
        dispatch(clearUserError());
    };
  }, [navigate, userInfo, redirect, dispatch]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      {error && <Message variant="error">{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
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
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div className="text-center">
        New Customer?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
