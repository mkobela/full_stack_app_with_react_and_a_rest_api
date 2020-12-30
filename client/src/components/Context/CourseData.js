import config from './config';

export default class CourseData {

  /***
   * @function checkStatus
   * @property {object} response - fetch response
   * @returns {Promise} - promise from fetch
  ***/
  checkStatus(response) {
    // check if fetch was successful
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  /***
   * @function fetchData
   * @property {string} url - url
   * @returns {Promise} - promise from fetch
  ***/
  fetchData(url) {

    // send the request
    return fetch(url)
      .then(this.checkStatus)
      .then(res => res.json())
      .catch(error => console.error("ERROR !!!"));
  }

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async deleteCourse(courseId, user) {

    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, user);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      const data = await response.json();
      return data.errors;
    } else {
      console.log("IN THE ERROR");
      throw new Error();
    }
  }
}