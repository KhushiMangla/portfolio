import React, { useState, useEffect } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, Events, scrollSpy } from 'react-scroll';
import logo from '../images/logo1.svg';

const Header = () => {
  const [contactClicked, setContactClicked] = useState(false);

  const handleContactClick = () => {
    setContactClicked(true);
  };

  useEffect(() => {
    // Add event listeners for scroll events
    Events.scrollEvent.register('end', (to, element) => {
      // Set contactClicked to false when the scroll position is at the Contact section
      if (to === 'contact') {
        setContactClicked(false);
      }
    });

    // Activate the scroll spy
    scrollSpy.update();

    // Cleanup event listeners when the component is unmounted
    return () => {
      Events.scrollEvent.remove('end');
    };
  }, []);

  return (
    <header id="masthead" className="site-header">
      <div className="site-branding">
        <RouterLink className="logo" to="/">
          <img className="header-logo" src={logo} alt="portfolio logo" />
        </RouterLink>
      </div>
      <nav className="site-navigation">
        <ul>
          <li>
            <NavLink activeClassName="active" to="/about">
              <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
              <span className="text">About </span>
              <span className="circle"></span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/work">
              <span className="icon"><ion-icon name="code-working-outline"></ion-icon></span>
              <span className="text">Work</span>
              <span className="circle"></span>
            </NavLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={handleContactClick}
              className={contactClicked ? 'active' : ''}
              onSetActive={() => setContactClicked(true)}
              onSetInactive={() => setContactClicked(false)}
            >
              <span className="icon"><ion-icon name="chatbubble-outline"></ion-icon></span>
              <span className="text" style={{ cursor: 'pointer' }}>Contact </span>
              <span className="circle"></span>
            </ScrollLink>
          </li>
          <div className="indicator"></div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
