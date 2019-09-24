import React from 'react';
import { BrowserRouter, Switch, Redirect, HashRouter } from 'react-router-dom';
import { routes, AppRoute }  from '../../routes';
import AppContainer from '../AppContianer';

import HomePage from '../../pages/HomePage';

const App = (props) => {
  return (
    <div className="App">
      <HashRouter>
        <AppContainer {...props}>
          <Switch>
            {routes.map(( { exact, path, component }) => {
              return (
                <AppRoute 
                  exact={exact}
                  path={path}
                  key={path}
                  component={component}
                />
              )
            })}
            <Redirect exact from="/" to={HomePage} />
          </Switch>
        </AppContainer>
      </HashRouter>
    </div>
  );
}

export default App;