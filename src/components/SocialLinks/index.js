import React, {  Component } from 'react';

import EmailIcon from '../../icons/email.svg';
import LinkedInIcon from '../../icons/linkedIn.svg';
import GitHubIcon from '../../icons/github.svg'
import ResumeIcon from '../../icons/cv.svg';
import './socialLinks.css';

export class RenderSocialLinks extends Component {

  state =  {
    email: 'https://mail.google.com/mail/?view=cm&fs=1&to=+misochobrian@gmail.com',
    resume: 'https://drive.google.com/file/d/1O4yhDWUUHqpjwmKYbuN8-WmDG9kBjVec/view?usp=sharing',
    linkedIn: 'https://www.linkedin.com/in/brian-misocho/',
    github: 'https://github.com/misocho'
  }

  onClick = (e, iconName) => {
    e.persist();
    const currentState = this.state
    let url;
    switch (iconName) {
      case 'email':
        url = currentState.email;
        break;
      case 'resume':
        url = currentState.resume;
        break;
      case 'linkedIn':
        url = currentState.linkedIn;
        break;
      case 'github':
        url = currentState.github;
    }
    let win = window.open(url, '_blank');
    win.focus();
  }
  
  render() {
    return (
      <div id="social-links-wrapper">
        <ul>
          <li>
            <EmailIcon className="social-svg" id="email-svg" onClick={(e) => this.onClick(e, 'email')} />
          </li>
          <li>
            <ResumeIcon className="social-svg" id="resume-svg" onClick={(e) => this.onClick(e, 'resume')}/>
          </li>
          <li>
            <LinkedInIcon className="social-svg" id="linkedin-svg" onClick={(e) => this.onClick(e, 'linkedIn')}/>
          </li>
          <li>
            <GitHubIcon className="social-svg" id="github-svg" onClick={(e) => this.onClick(e, 'github')}/>
          </li>
        </ul>
      </div>
    )
  }
}

export default RenderSocialLinks;