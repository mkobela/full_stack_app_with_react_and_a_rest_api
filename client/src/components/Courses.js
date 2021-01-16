import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

/***
 * @function Courses - courses home page compoment
 * @property {object} props - compoment props
 * @returns {object} - render object
***/
function Courses(props) {
  const { courses } = props.context;
  const { readCourses } = props.context.courseActions;
  const history = props.history;

  useEffect(() => {
    readCourses()
      .catch(err => {
        console.error(err)
        history.push('/error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div id="root">
        <div>

          <div className="bounds">
            {courses.map((course, index) => (

              <div key={index} className="grid-33">
                <Link className="course--module course--link"
                  to={{
                    pathname: `/courses/${course.id}`
                  }}
                ><h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </Link>
              </div>
            ))}

            <div className="grid-33">
              <Link className="course--module course--add--module"
                to={{
                  pathname: `/courses/create`
                }}
              >
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                </svg>New Course</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;