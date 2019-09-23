import React, { Component } from 'react';

import './workpage.css';

class WorkPageContainer extends Component {
  render() {
    return (
      <>
        <div className="work-page-container">
          <div className="work-page-content">
            <div className="tab">
              <div className="tab-title">Professional Work</div>
              <div className="tab-title">Personal Projects</div>
            </div>
            <div className="work-page-cards">
              <div className="card-container">
                <div className="card-title"> MMDP Product </div>
                <div className="card-content">
                  <dl>
                    <dt>Technologies</dt>
                    <dd>JQuery, D3.js, HTML, CSS</dd>
                    <dt>Description</dt>
                    <dd>The MMDP product acted in a bid to eradicate illegal
                    migration in Nigeria and promote economic
                  prosperity and safety for Nigerian citizens.</dd>
                    <dt>Role</dt>
                    <dd>Software Engineer</dd>
                  </dl>

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default WorkPageContainer;