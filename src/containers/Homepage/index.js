import React, { Component } from 'react';

import user from '../../db/homepage.db';

import './homepage.css';

class HomePageContainer extends Component {

  render() {
    const { name, title, bio } = user;
    return (
      <>
        <div id="intro-section">
          <div className="intro-name">{name}</div>
          <div className="intro-role">{title}</div>
          <div className="intro-details">
          {bio}
          </div>
        </div>
      </>
    )
  }
}

export default HomePageContainer;