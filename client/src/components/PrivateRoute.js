import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context/Context';

/***
 * @function PrivateRoutes - private route compoment
 * @property {object} props - compoment props
 * @returns {object} - render object
***/
const PrivateRoutes =  ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}

          render={ props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
};

export default PrivateRoutes;