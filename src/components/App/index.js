import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { routes, AppRoute }  from '../../routes';
import AppContainer from '../AppContianer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContainer>
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
          </Switch>
        </AppContainer>
      </BrowserRouter>
    </div>
  );
}

export default App;