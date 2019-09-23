import React, { Component } from 'react';
import glamorous from "glamorous";

import Tabs from '../../components/Tabs';

import './workpage.css';

class WorkPageContainer extends Component {

 
  render() {
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
                </Tabs.Tab>
                <Tabs.Tab id="tab2" title="Personal Projects">
                 <div className="work-page-cards">
                      <div className="card-container">
                        <div className="card-title"> MMDP Product 2 </div>
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