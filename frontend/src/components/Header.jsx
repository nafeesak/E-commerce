import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">EcomShop</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          {userInfo ? (
            // Dropdown or simple links for logged-in user
            <>
              <li>
                <Link to="/profile">{userInfo.name}</Link>
              </li>
              <li>
                <a href="#" onClick={logoutHandler}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Sign In</Link>
            </li>
          )}
          {/* Admin Links (will add isAdmin check later) */}
          {userInfo && userInfo.isAdmin && (
            <li>
              <Link to="/admin/products">Admin Products</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
