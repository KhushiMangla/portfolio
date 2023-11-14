import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../images/logo1.svg';

const Header = () => {
  return (
    <header id="masthead" className="site-header">
      <div className="site-branding">
        <Link className="logo" to="/">
          <img className="header-logo" src={logo} alt="portfolio logo" />
        </Link>
      </div>
      <nav className="site-navigation">
        <ul>
          {/* remove the home from header */}
          {/* <li><NavLink activeClassName="active" to="/" > Home </NavLink></li> */}
          <li><NavLink activeClassName="active" to="/about">
            <span className="icon"><ion-icon name="person-outline"></ion-icon>
            </span>
            <span class="text">About </span>
            <span class="circle"></span>

          </NavLink></li>
          <li><NavLink activeClassName="active" to="/work">
            <span className="icon"><ion-icon name="code-working-outline"></ion-icon></span>
            <span className="text">Work</span>
            <span className="circle"></span>
          </NavLink></li>
          <li><NavLink to="/contact">
            <span className="icon"><ion-icon name="chatbubble-outline"></ion-icon></span>
            <span className="text">Contact</span>
            <span className="circle"></span>
          </NavLink></li>
          <div className="indicator"></div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;