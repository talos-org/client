import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// TODO: Generalize this component
// Right now, it very generic and specific to one route.
// However, the plan is to use `ProtectedRoute` everywhere
// appropriate, and it should handle everything like magic.
// Only that magic doesn’t exist yet. So, for now, it simply
// checks if a blockchain name exists; if not, the user is
// redirected to the `/welcome` route.
export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.existing ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/welcome',
            state: {
              cameFrom: props.location,
            },
          }}
        />
      )
    }
  />
);
