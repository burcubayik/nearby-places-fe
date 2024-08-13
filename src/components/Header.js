import React from 'react';
import './Header.css'; 
import logo from "../img/header-logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </header>
  );
};

export default Header;
