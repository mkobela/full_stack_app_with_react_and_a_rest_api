import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Courses(props) {
  const { courses } = props.context;

  useState(() =>{
    props.context.courseActions.readCourses();
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