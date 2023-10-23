import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header id="masthead" className="site-header">
        <div className="site-branding">
          <p className="site-title">Khushi's Portfolio App</p>
        </div>
        <nav className="site-navigation">
          <ul>
            <li><NavLink to='/' end>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/work'>Work</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
          </ul>
        </nav>
      </header>
  );
};

export default Header