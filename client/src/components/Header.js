import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class Header
 * @classdesc Common header for app
*/
class Header extends React.PureComponent {
  render() {

    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">
            <Link
              to="/"
            >Courses</Link>
          </h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <Link className="signup" to="/signup">Sign Up</Link>
                  <Link className="signin" to="/signin">Sign In</Link>
                </React.Fragment>
              )}
          </nav>
        </div>
      </div>
    );
  }
};

export default Header;
