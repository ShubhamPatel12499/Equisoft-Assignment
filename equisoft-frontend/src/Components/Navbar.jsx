import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Login/firebase-config';
import '../Styles/Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logout();
          localStorage.removeItem('isLoggedIn');
          setIsLoggedIn(false);
          navigate('/login'); 
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

  return (
    <div className='navbar'>
      {localStorage.getItem('isLoggedIn') &&  (
        <>
          <Link to={'/'}>Task</Link>
          <Link to={'/product'}>Product</Link>
          <Link to={'/categories'}>Categories</Link>
          <Link to={'/company'}>Company</Link>
          <button onClick={handleLogout} className='logout-btn'>
            Logout
          </button>
        </>
      )}
        {!localStorage.getItem('isLoggedIn') && (
        <>
          <Link to={'/login'}>Login</Link>
          <Link to={'/signup'}>Signup</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;