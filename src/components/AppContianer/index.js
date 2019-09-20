import React, { Component } from 'react';
import { withRouter } from 'react-router';

import NavigateContainer from '../../containers/Navigate';

import './app.css';

export class AppContainer extends Component {

  render() {
    return (
      <>
      <NavigateContainer />
      </>
    );
  }
}

export default withRouter(AppContainer);