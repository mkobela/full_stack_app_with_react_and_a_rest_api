import BaseData from './BaseData';

/**
* @class CourseData
* @classdesc Course data context
*/
export default class CourseData extends BaseData {
  constructor(provider) {
    super();
    this.context = provider;
  }

  processResponse = async (response, statusCode) => {
    if (response.status === statusCode) {
      var data = [];
      if(response.statusText === "OK"){
        data = await response.json();
      }
      return data;
    } else if (response.status === 400) {
      const data = await response.json();
      return data.errors;
    } else {
      throw new Error();
    }
  }

  createCourse = async (course) => {
    const user = this.context.state.authenticatedUser;
    const response = await this.api('/courses', 'POST', course, true, user);

    return await this.processResponse(response, 201);
  }

  readCourse = async (id) => {
    const response = await this.api(`/courses/${id}`, 'GET');

    const data = await this.processResponse(response, 200);
    if (response.status === 200) {
      this.context.setState({ selectedCourse: data });
    }

    return data;
  }

  readCourses = async () => {
    const response = await this.api(`/courses`, 'GET', null, false, null);

    const data = await this.processResponse(response, 200);
    if (response.status === 200) {
      this.context.setState({ courses: data });
      this.context.setState({ selectedCourse: null });
    }

    return data;
  }

  updateCourse = async (course) => {
    const user = this.context.state.authenticatedUser;
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, user);
    return await this.processResponse(response, 204);
  }

  deleteCourse = async (courseId) => {
    const user = this.context.state.authenticatedUser;
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, user);
    return await this.processResponse(response, 204);
  }
}