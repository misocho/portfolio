import React, { Component } from 'react';
import { withRouter } from 'react-router';

import NavigateContainer from '../../containers/Navigate';
import Content from '../../containers/Content';

import './app.css';

export class AppContainer extends Component {

  render() {
    return (
      <>
      <NavigateContainer />
      <Content />
      </>
    );
  }
}

export default withRouter(AppContainer);