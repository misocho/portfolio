import React, { Component } from 'react';
import glamorous from "glamorous";

import Tabs from '../../components/Tabs';
import Work from '../../db/workpage.db';

import LinkIcon from '../../icons/link.svg';
import CodeIcon from '../../icons/code.svg';

import './workpage.css';

class WorkPageContainer extends Component {


  render() {
    const { professionalWork, personalProjects } = Work;
    return (
      <>
        <div className="work-page-container">
          <div className="work-page-content">
            <div className="tab">
              <Tabs
                activeTab={{
                  id: "professional-work"
                }}
              >
                <Tabs.Tab id="professional-work" title="Professional Work" className="tab-border">
                  {professionalWork.map((work, index) => {
                    const { title, technologies, description, role } = work;
                    return (
                      <div className="work-page-cards" key={index}>
                        <div className="card-container">
                          <div className="card-title">{title}</div>
                          <div className="card-content">
                            <dl>
                              <dt>Technologies</dt>
                              <dd>{technologies}</dd>
                              <dt>Description</dt>
                              <dd>{description}</dd>
                              <dt>Role</dt>
                              <dd>{role}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Tabs.Tab>
                <Tabs.Tab id="personal-projects" title="Personal Projects">
                  {personalProjects.map((work, index) => {
                    const { title, technologies, description, role, githubLink, hostedLink } = work;
                    return (
                      <div className="work-page-cards" key={index}>
                        <div className="card-container">
                          <div className="card-title">{title}</div>
                          <div className="card-content">
                            <dl>
                              <dt>Technologies</dt>
                              <dd>{technologies}</dd>
                              <dt>Description</dt>
                              <dd>{description}</dd>
                              <dt>Role</dt>
                              <dd>{role}</dd>
                            </dl>
                          </div>
                          <div >
                            <ul className="card-links">
                              <a href={hostedLink} target="_blank">
                              <LinkIcon id="link-icon" className="social-svg work links" />
                              </a>
                              <a href={githubLink} target="_blank">
                                <CodeIcon id="code-icon" className="social-svg work-links" />
                              </a>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Tabs.Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default WorkPageContainer;