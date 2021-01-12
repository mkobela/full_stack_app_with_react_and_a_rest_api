import React, { Component } from 'react';
import Cookies from 'js-cookie';
import UserData from './UserData';
import CourseData from './CourseData';

const Context = React.createContext();

/**
* @class Provider
* @classdesc Provider for Context API
*/
export class Provider extends Component {

  constructor() {
    super();
    this.state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
      courses: [],
      selectedCourse: null
    };

    this.userData = new UserData(this);
    this.courseData = new CourseData(this);
  }

  render() {
    const { authenticatedUser, courses, selectedCourse } = this.state;

    const value = {
      authenticatedUser,
      courses,
      selectedCourse,
      userActions: {
        signIn: this.userData.signIn,
        signOut: this.userData.signOut,
        signUp: this.userData.signUp
      },
      courseActions: {
        createCourse: this.courseData.createCourse,
        readCourse: this.courseData.readCourse,
        readCourses: this.courseData.readCourses,
        updateCourse: this.courseData.updateCourse,
        deleteCourse: this.courseData.deleteCourse
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