import React, {  Component } from 'react';

import EmailIcon from '../../icons/email.svg';
import LinkedInIcon from '../../icons/linkedIn.svg';
import GitHubIcon from '../../icons/github.svg'
import ResumeIcon from '../../icons/cv.svg';
import './socialLinks.css';

export class RenderSocialLinks extends Component {

  links =  {
    email: 'https://mail.google.com/mail/?view=cm&fs=1&to=+misochobrian@gmail.com',
    resume: 'https://drive.google.com/file/d/1kHLQZ0Nw_j32F1XLKD0pOMooSPhO6uT9/view?usp=sharing',
    linkedIn: 'https://www.linkedin.com/in/brian-misocho/',
    github: 'https://github.com/misocho'
  }

 
  render() {
    const { email, resume, linkedIn, github } =this.links;
    return (
      <div id="social-links-wrapper">
        <ul>
          <li>
            <a href={email} target="_blank">
              <EmailIcon className="social-svg" id="email-svg" />
            </a>
          </li>
          <li>
            <a href={resume} target="_blank">
              <ResumeIcon className="social-svg" id="resume-svg" />
            </a>
          </li>
          <li>
           <a href={linkedIn} target="_blank">
              <LinkedInIcon className="social-svg" id="linkedin-svg" />
           </a>
          </li>
          <li>
           <a href={github} target="_blank">
              <GitHubIcon className="social-svg" id="github-svg" />
           </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default RenderSocialLinks;