import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/**
* @class UserSignUp
* @classdesc User sign up compoment
*/
export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmedPassword: '',
    errors: []
  }

  // listen for changes on form
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // send contents to server
  submit = () => {
    const { context } = this.props;

    // Create user
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      password: this.state.password,
      confirmedPassword: this.state.confirmedPassword
    };

    context.userActions.signUp(user)
      .then(data => {
        if (data.length) {
          this.setState({ errors: data });
        } else {
          context.userActions.signIn(user.emailAddress, user.password)
            .then(() => {
              this.props.history.push('/');
            })
            .catch((err) => {
              console.log(err);
              this.props.history.push('/error');
            });;
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmedPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input id="firstName" name="firstName" type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name" />

                <input id="lastName" name="lastName" type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name" />

                <input id="emailAddress" name="emailAddress" type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address" />

                <input id="password" name="password" type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />

                <input id="confirmedPassword" name="confirmedPassword" type="password"
                  value={confirmedPassword}
                  onChange={this.change}
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }
}