import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { NavLink } from 'react-router-dom';

import Logo from '../Logo';
import Avatar from '../Avatar';
import './navigate.css';

export class renderNavigation extends Component {
  
  active = { 'border-bottom': '15px solid #8d4f39', transition: 'all 0.3s ease'}

  render() {
  
    return (
      <div id="header">
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
                      <NavLink to="/"
                        activeStyle={this.active}
                      exact>Intro</NavLink>
                    </li>
                    <li>
                      <NavLink 
                        activeStyle={this.active}
                        to="/about" exact>About</NavLink>
                    </li>
                    <li>
                      <NavLink to="/work"
                        activeStyle={this.active}
                        exact>Work</NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact"
                        activeStyle={this.active}
                        exact>Contact</NavLink>
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
  }
};

export default withRouter(renderNavigation);