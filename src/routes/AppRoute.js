import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class AppRoute extends Component {
  render() {
    const { component: ComponentToRender, ...rest} = this.props;

    return (
      <Route 
        {...rest}
        render={(props) => {

          return <ComponentToRender {...props} />;
        }}
      />
    )
  }
}

export default AppRoute;