import React, { Component } from 'react';

import './about.css';

export class AboutPageContainer extends Component {

  render() {
    return (
      <div id="about-wrapper">
        <div className="about-top-section">
          <div className="section">
            <div id="about-me" className="section-title">About Me</div>
            <div className="section-content">
              I’m a life long learner with professional experience as an active member of
              several distributed teams as a software engineer.
              My practical skills include front end web development,
              backend development, test-driven development, continuous integration,
              and deployment.
            </div>
          </div>
          <div className="section">
            <div id='looking-for'>
              <div className="section-title">Skills</div>
              <div className="section-content" id="skills-content">
                ReactJs  NodeJs | Python (Scrapping, Django, DRF) | MongoDb | PostgreSQL |
                TDD | CI/CD | Git/GitHub | Agile Methodologies | UI/UX design
              </div>
            </div>
          </div>
        </div>
        <div className="about-bottom-section">
          <div className="section">
            <div className="section-title">Work experience</div>
            <div className="section-content">
              <div> Software Engineer at Andela, Nairobi</div>
              <div>May 2019 - October 2019 </div>
              <div class="list">
                <ul>
                  <li>
                    Lead a team of 6 engineers in contributing feactures to several products.
                  </li>
                  <li>
                    Responsible for maintaining the staging and production pipelines implementing automated
                    deployment and continuous development.
                  </li>
                  <li>
                    Participated in maintaining and updating legacy code
                  </li>
                  <li>
                    Took ownership of my work and deliver tasks within schedule
                  </li>
                  <li>
                    Actively participated in code and PR reviews and giva actionable feedback.
                  </li>
                  <li>
                    Onboarded and mentored new team members into the team
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section-title">What I'm Looking For</div>
            <div className="section-content"> 
              <div className="list">
                <ul>
                  <li>
                    Time and  opportunity to learn and apply emerging technologies.
                </li>
                  <li>
                    Company with a positive ethical stance
                </li>
                  <li>
                    Direct engineering hands-on involvement
                </li>
                <li>
                    A company whose mission and values align with my goals of personal career improvement and progression                </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutPageContainer;