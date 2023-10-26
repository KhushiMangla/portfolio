import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="masthead" className="site-header">
        <div className="site-branding">

          <Link to="/"> Khushi</Link>

        </div>
        <nav className="site-navigation">
          <ul>
            {/* remove the home from header */}
            {/* <li><NavLink activeClassName="active" to="/" > Home </NavLink></li> */}
            <li><NavLink activeClassName="active" to="/about"> About </NavLink></li>
            <li><NavLink activeClassName="active" to="/work">Work</NavLink></li>
            <li><button className='contact-btn'><NavLink to="/contact">Contact me</NavLink></button></li>
          </ul>
        </nav>
      </header>
  );
};

export default Header