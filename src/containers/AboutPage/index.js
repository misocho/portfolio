import React, { Component } from 'react';

import './about.css';

export class AboutPageContainer extends Component {

  render() {
    return (
        <div id="about-wrapper">
          <div className="section">
          <div id="about-me">About Me</div>
          </div>
          <div className="section">
            <div id='looking-for'>
               What I'm Looking For
            </div>
          </div>
          <div className="section">
            Work experience
          </div>
          <div className="section">
            skills
          </div>
          
        </div>
    )
  }
}

export default AboutPageContainer;