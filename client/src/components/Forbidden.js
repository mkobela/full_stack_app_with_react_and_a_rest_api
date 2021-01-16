import React from 'react';
import { NavLink } from 'react-router-dom';

/***
 * @function Forbidden - forbidden compoment
 * @returns {object} - render object
***/
const Forbidden = () => {
  return (
    <div class="bounds">
      <h1>Forbidden</h1>
      <p>Not authorized to view this page.</p>

      <NavLink className="button button-secondary"
        to="/"
      >Return to List</NavLink>
    </div>
  );
}

export default Forbidden;