import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Form from './Form';

function UpdateCourse(props) {

  const { readCourse } = props.context.courseActions;
  const { authenticatedUser } = props.context;

  const [course, setCourse] = useState(props.context.selectedCourse);
  const [errors, setErrors] = useState([]);

  const change = (event) => {
    const { name, value } = event.target;

    setCourse(prevState => {
      let temp = Object.assign({}, prevState);
      temp[name] = value;
      return temp;
    })
  }

  const submit = () => {
    const history = props.history;
    const { updateCourse, readCourses } = props.context.courseActions;

    updateCourse(course)
      .then(errors => {
        if (errors.length) {
          setErrors(errors);
        } else {

          // refresh course list
          readCourses().then(data => {
            if (data) {
              history.push('/');
            }
          })
            .catch(err => {
              console.error(err)
              history.push('/error');
            });
        }
      })
      .catch(err => {
        console.error(err)
        history.push('/error');
      });
  }

  const cancel = () => {
    props.history.goBack();;
  }

  const getCourse = (id) => {
    const history = props.history;
    readCourse(id)
      .then(errors => {
        if (errors.length) {
          setErrors(errors);
        } else {
          setCourse(errors);
        }
      })
      .catch(err => {
        console.error(err)
        history.push('/error');
      });
  }

  useEffect(() => {
    if (!course) {
      getCourse(props.match.params.id);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!course) {
    return (
      <div>Loading ...</div>
    );
  } else {

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = course;

    /* eslint eqeqeq: 0 */
    var authorizedUser = false;
    if (authenticatedUser.emailAddress == course.user.emailAddress) {
      authorizedUser = true;
    }

    return (
      <>
        {authorizedUser ? (
          <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Submit"
                elements={() => (
                  <React.Fragment>

                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                          <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={change} /></div>
                        <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                      </div>
                      <div className="course--description">
                        <div>
                          <textarea id="description" name="description" className placeholder="Course description..." value={description} onChange={change} /></div>
                      </div>
                    </div>
                    <div className="grid-25 grid-right">
                      <div className="course--stats">
                        <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                              <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} onChange={change} /></div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." value={materialsNeeded} onChange={change} /></div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </React.Fragment>
                )} />
            </div>
          </div>
        ) : (
            <Redirect to={{
              pathname: '/forbidden'
            }} />
          )}
      </>
    );
  }
}

export default UpdateCourse