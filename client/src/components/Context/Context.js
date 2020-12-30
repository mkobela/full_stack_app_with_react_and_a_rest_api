import React, { Component } from 'react';
import Cookies from 'js-cookie';
import UserContext from './UserContext';
import CourseContext from './CourseContext';

const Context = React.createContext();

export class Provider extends Component {

  constructor() {
    super();
    this.state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
      courses: [],
      selectedCourse: null
    };

    this.userContext = new UserContext(this);
    this.courseContext = new CourseContext(this);
  }

  componentDidMount() {

    // this.courseContext.readCourses();
  }

  render() {
    const { authenticatedUser, courses, selectedCourse } = this.state;

    const value = {
      authenticatedUser,
      courses,
      selectedCourse,
      userActions: {
        signIn: this.userContext.signIn,
        signOut: this.userContext.signOut,
        signUp: this.userContext.createUser
      },
      courseActions: {
        createCourse: this.courseContext.createCourse,
        readCourse: this.courseContext.readCourse,
        readCourses: this.courseContext.readCourses,
        updateCourse: this.courseContext.updateCourse,
        deleteCourse: this.courseContext.deleteCourse
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}