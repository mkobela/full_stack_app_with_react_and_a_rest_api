import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
  course = this.props.location.state.course;

  state = {
    id: this.course.id,
    title: this.course.title,
    description: this.course.description,
    estimatedTime: this.course.estimatedTime,
    materialsNeeded: this.course.materialsNeeded,
    userId: this.props.context.authenticatedUser.id,
    errors: []
  }

  render() {

    const { authenticatedUser } = this.props.context;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;
    
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Submit"
            elements={() => (
              <React.Fragment>

                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={this.change} /></div>
                    <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea id="description" name="description" className placeholder="Course description..." value={description} onChange={this.change} /></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} onChange={this.change} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." value={materialsNeeded} onChange={this.change} /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )} />
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const history = this.props.history;
    const { updateCourse } = this.props.context.courseActions;

    updateCourse(this.state)
    .then(errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        history.push('/');
      }
    })
    .catch(err => {
      console.error(err)
      history.push('/error');
    });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}