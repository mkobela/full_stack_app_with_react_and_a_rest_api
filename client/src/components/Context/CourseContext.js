import CourseData from './CourseData';

export default class CourseContext {

  constructor(provider) {
    this.context = provider;
    this.courseData = new CourseData();
  }

  createCourse = async (course) => {
    const user = this.context.state.authenticatedUser;
    const response = await this.courseData.api('/courses', 'POST', course, true, user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  readCourse = async (id) => {
    const response = await this.courseData.api(`/courses/${id}`, 'GET');
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
    const response = await this.courseData.api(`/courses`, 'GET', null, false, null);
    if (response.status === 200) {
      const data = await response.json();
      this.context.setState({ courses: data });
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
    const response = await this.courseData.api(`/courses/${course.id}`, 'PUT', course, true, user);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  deleteCourse = async (courseId) => {
   
    const user = this.context.state.authenticatedUser;
    const response = await this.courseData.api(`/courses/${courseId}`, 'DELETE', null, true, user);
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