import React, { Component } from 'react';

import './homepage.css';

class HomePageContainer extends Component {

  render() {
    return (
      <>
        <div id="intro-section">
          <div className="intro-name"> Brian Morang'a </div>
          <div className="intro-role">Full Stack Software Developer</div>
          <div className="intro-details">
          Experienced Software Engineer with a demonstrated history 
          of working as a distributed active team member.
          Skilled in Python Django and Flask framework, ReactJs, Node, PostgreSQL, MongoDB, Cascading Style Sheets (CSS) and HTML.
          </div>
        </div>
      </>
    )
  }
}

export default HomePageContainer;