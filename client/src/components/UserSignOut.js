import React, { useEffect }from 'react';
import { Redirect } from 'react-router-dom';

/***
 * @function UserSignOut - user sign out compoment
 * @property {object} context - context for compoment
 * @returns {object} - render object
***/
const UserSignOut =  ({context}) => {

   useEffect(() => {
    return () => {
      // called when component unmounts
      context.userActions.signOut();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;