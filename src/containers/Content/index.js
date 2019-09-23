import React, { Component } from 'react';

import SocialLinks from '../../components/SocialLinks';
import './content.css'

export class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props: { children } } = this.props;
    return (
      <div id="content-section">
        <SocialLinks />
        <div id="main-section">{children}</div>
      </div>
    )
  }
}

export default Content;