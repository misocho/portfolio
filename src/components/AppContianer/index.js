import React, { Component } from 'react';
import { withRouter } from 'react-router';

import NavigateContainer from '../../containers/Navigate';
import Content from '../../containers/Content';

import './app.css';

export class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <NavigateContainer />

        <Content {...children} />
      </>
    );
  }
}

export default withRouter(AppContainer);