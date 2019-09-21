import React, {  Component } from 'react';

import EmailIcon from '../../icons/email.svg';
import LinkedInIcon from '../../icons/linkedIn.svg';
import DribbleIcon from '../../icons/dribbble.svg';
import GitHubIcon from '../../icons/github.svg'
import ResumeIcon from '../../icons/cv.svg';
import './socialLinks.css';

export class RenderSocialLinks extends Component {
  render() {
    return (
      <div id="social-links-wrapper">
        <ul>
          <li>
            <EmailIcon className="social-svg" id="email-svg" />
          </li>
          <li>
            <ResumeIcon className="social-svg" id="resume-svg" />
          </li>
          <li>
            <LinkedInIcon className="social-svg" id="linkedin-svg" />
          </li>
          <li>
            <DribbleIcon className="social-svg" id="dribbble-svg" />
          </li>
          <li>
            <GitHubIcon className="social-svg" id="github-svg" />
          </li>
        </ul>
      </div>
    )
  }
}

export default RenderSocialLinks;