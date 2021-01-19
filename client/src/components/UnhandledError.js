import React from 'react';
import { NavLink } from 'react-router-dom';

/***
 * @function Error - error compoment
 * @returns {object} - render object
***/
const UnhandledError = () => {
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>

      <NavLink className="button button-secondary"
      to="/"
    >Return to List</NavLink>
    </div>
  );
}

export default UnhandledError;