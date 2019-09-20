import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../Logo';
import Avatar from '../Avatar';
import './Navigate.css';

const renderNavigation = () => {
  return (
    <div>
      <header>
        <div id="navigation-bar">
          <div id="top-logo">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          <div id="navigation-links">
            <div>
              <nav>
                <ul>
                  <li className="nav-line-bar">
                    <NavLink to="/">Intro</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/work">Work</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div id="nav-line">
              <div className="nav-line-bar">
              </div>
            </div>
          </div>
          <div>
            <Avatar />
          </div>
        </div>
      </header>
    </div>
  );
};

export default renderNavigation;