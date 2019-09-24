import React, { Component } from 'react';
import About from '../../db/aboutpage.db';
import './about.css';

export class AboutPageContainer extends Component {

  render() {
    const { aboutMe, skills, workExperience, lookingFor } = About;

    return (
      <div id="about-wrapper">
        <div className="about-top-section">
          <div className="section">
            <div id="about-me" className="section-title">About Me</div>
            <div className="section-content">
              {aboutMe}
            </div>
          </div>
          <div className="section">
            <div id='looking-for'>
              <div className="section-title">Skills</div>
              <div className="section-content" id="skills-content">
                {skills.map((skill) => `${skill} | `)}
              </div>
            </div>
          </div>
        </div>
        <div className="about-bottom-section">
          <div className="section">
            <div className="section-title">Work experience</div>
            <div className="section-content">
              {workExperience.map((work, index) => {
                const { role, company, location, start, end, description } = work;
                return (
                  <div key={index}>
                    <div> {role} at {company}, {location}</div>
                    <div>{start} - {end} </div>
                    <div className="list">
                      <ul >
                        {description.map((listItem, itemIndex) => {
                          return (
                            <li key={itemIndex}>
                              {listItem}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="section">
            <div className="section-title">What I'm Looking For</div>
            <div className="section-content">
              <div className="list">
               <ul>
                  {lookingFor.map((item, index) => {
                    return (
                      <li key={index}>
                          {item}
                      </li>
                    )
                  })}
               </ul>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default AboutPageContainer;