import BaseData from './BaseData';

export default class CourseData extends BaseData {

  constructor(provider) {
    super();
    this.context = provider;
  }

  createCourse = async (course) => {
    const user = this.context.state.authenticatedUser;
    const response = await this.api('/courses', 'POST', course, true, user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      const data = await response.json();
      return data.errors;
    } else {
      throw new Error();
    }
  }

  readCourse = async (id) => {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      const data = await response.json();
      this.context.setState({ selectedCourse: data });
      return data;
    } else if (response.status === 400) {
      const data = await response.json();
      return data.errors;
    } else {
      throw new Error();
    }
  }

  readCourses = async () => {
    const response = await this.api(`/courses`, 'GET', null, false, null);
    if (response.status === 200) {
      const data = await response.json();
      this.context.setState({ courses: data });
      this.context.setState({ selectedCourse: null });
      return data;
    } else if (response.status === 400) {
      const data = await response.json();
      return data.errors;
    } else {
      throw new Error();
    }
  }

  updateCourse = async (course) => {
    const user = this.context.state.authenticatedUser;
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, user);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      const data = await response.json();
      return data.errors;
    } else {
      throw new Error();
    }
  }

  deleteCourse = async (courseId) => {
   
    const user = this.context.state.authenticatedUser;
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, user);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      const data = await response.json();
      return data.errors;
    } else {
      throw new Error();
    }
  }
}