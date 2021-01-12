import React from 'react';
import { Redirect } from 'react-router-dom';

/***
 * @function UserSignOut - user sign out compoment
 * @property {object} context - context for compoment
 * @returns {object} - render object
***/
const UserSignOut =  ({context}) => {
  context.userActions.signOut();

  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;