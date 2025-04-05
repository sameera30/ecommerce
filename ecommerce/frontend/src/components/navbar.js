import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token'); 
      alert('Logged out successfully!');
      navigate('/login');
    };
  
    const isLoggedIn = !!localStorage.getItem('token'); 
  
    return (
      <div className="navbar">
        <h1>Book Store</h1>
        <div className="links">
            <Link className="a" to="/">Products</Link>
            
         
          {isLoggedIn && (
            <>
             
                <Link className="a" to="/cart">Cart</Link>
                <Link className="a" to="/wishlist">Wishlist</Link>
                <Link className="a" to="/profile">Profile</Link>
                <button className="a" onClick={handleLogout}>Logout</button>
            </>
          )}
          {!isLoggedIn && (
              <Link className="a" to="/login">Login</Link>,
              <Link className="a" to="/register">Register</Link>
          )}
        </div>
      </div>
    );
  };
  