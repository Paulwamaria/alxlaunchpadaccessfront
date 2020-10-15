import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup, checkAuthStatus } from "../../actions/auth";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      accountCreated: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password, rePassword } = this.state;
    this.props.signup(firstName, lastName, email, password, rePassword);
    this.setState({
      accountCreated: true,
    });
  };

  render() {
    if (this.state.accountCreated) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit} className="mt-5 mb-5 ">
              <legend className="text">Join Us</legend>
              <div>
                <label htmlFor="firstName">First Name</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label htmlFor="rePassword">Confirm Password</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  id="rePassword"
                  name="rePassword"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>

              <button className="mt-3" type="submit">
                Signup
              </button>
              <p className="mt-2">
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <p className="mt-2">
                Forgot password?{" "}
                <Link to="/reset_password">Reset Password</Link>
              </p>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (firstName, lastName, email, password, rePassword) =>
      dispatch(signup(firstName, lastName, email, password, rePassword)),
    checkAuthStatus: () => dispatch(checkAuthStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
