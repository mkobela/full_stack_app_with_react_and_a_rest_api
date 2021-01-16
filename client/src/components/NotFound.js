import React from 'react';
import { NavLink } from 'react-router-dom';

/***
 * @function NotFound - not found compoment
 * @returns {object} - render object
***/
const NotFound = () => (
  <div className="bounds">
    <h1>Not Found</h1>
    <p>Sorry! We couldn't find the page you're looking for.</p>

    <NavLink className="button button-secondary"
      to="/"
    >Return to List</NavLink>
  </div>
);

export default NotFound;
