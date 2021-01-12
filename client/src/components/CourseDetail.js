import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';

/***
 * @function CourseDetails - course detail compoment
 * @property {object} props - compoment props
 * @returns {object} - render object
***/
function CourseDetail(props) {

  const user = props.context.authenticatedUser;
  const course = props.context.selectedCourse;
  const history = props.history;
  const { readCourse, deleteCourse } = props.context.courseActions;

  useEffect(() => {
    getItem(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

  const getItem = (id) => {
    readCourse(id)
      .then(data => {
        if (data.length) {
          history.push('/error');
        } 
      })
      .catch(err => {
        console.error(err)
        history.push('/error');
      });
  }

  const deleteItem = () => {
    deleteCourse(course.id, user)
      .then(data => {
        if (data.length) {
          history.push('/error');
        } else {
          history.push('/');
        }
      })
      .catch(err => {
        console.error(err)
        history.push('/error');
      });
  }
  
  if(!course){
    return (
      <div>Loading ...</div>
    );
  }else{
    let isAuthorized = false;
    if (user != null && user.id === parseInt(course.userId)) {
      isAuthorized = true;
    }

    return (
      <div>
        <div id="root">
          <div>
            <div className="bounds">
              <div>
                <div className="actions--bar">
                  <div className="bounds">
                    <div className="grid-100"><span>
  
                      {isAuthorized === true ? (<>
                        <NavLink className="button"
                          to={{
                            pathname: `/courses/${course.id}/update`,
                            state: { course }
                          }}
                        >Update Course</NavLink>
                        <button className="button" onClick={deleteItem}>Delete Course</button></>)
                        : (null)}
  
                      <NavLink className="button button-secondary"
                        to="/"
                      >Return to List</NavLink>
                    </span>
  
                    </div>
                  </div>
                </div>
                <div className="bounds course--detail">
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <h3 className="course--title">{course.title}</h3>
                      <p>By {course.user.firstName} {course.user.lastName}</p>
                    </div>
                    <div className="course--description">
                      <ReactMarkdown source={course.description} />
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <h3>{course.estimatedTime}</h3>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <ReactMarkdown source={course.materialsNeeded} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;