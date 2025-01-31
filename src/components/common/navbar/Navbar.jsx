import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const PhoneNavbar = () => {
  return (
    <div className="phone-navbar">
      <Link to="/home">Home</Link>
      <Link to="/createMatch">+</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default PhoneNavbar;