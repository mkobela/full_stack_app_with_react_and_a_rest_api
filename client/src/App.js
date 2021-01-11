import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';

import Error from './components/Error';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

import { withContext } from './components/Context/Context';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);

const ErrorWithContext = withContext(Error);

const App = () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/signup" component={UserSignUpWithContext} />
        <Route exact path="/signin" component={UserSignInWithContext} />
        <Route exact path="/signout" component={UserSignOutWithContext} />

        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} /> 
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />

        <Route path="/error" component={ErrorWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;

