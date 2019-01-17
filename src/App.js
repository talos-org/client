import { inject } from 'mobx-react';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'config/routes';

@inject('rootStore')
class App extends Component {
  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
  }

  render() {
    return (
      <Switch>
        {routes.map((route, i) => {
          const Component = route.component;
          return (
            <Route
              key={i}
              path={route.path}
              render={props => (
                <Component {...props} rootStore={this.rootStore} />
              )}
            />
          );
        })}
      </Switch>
    );
  }
}

export default App;
