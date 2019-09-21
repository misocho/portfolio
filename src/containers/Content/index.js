import React, { Component } from 'react';

import SocialLinks from '../../components/SocialLinks';
import './content.css'

export class Content extends Component {

  render() {
    return (
      <div id="content-section">
        <SocialLinks />
      </div>
    )
  }
}

export default Content;