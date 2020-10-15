import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit} className="mt-5 mb-5 ">
              <legend className="text">Sign In</legend>
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

              <button className="mt-3" type="submit">
                Login
              </button>
              <p className="mt-2">
                Don't have an account? <Link to="/register">Sign up</Link>
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
    login: (email, password) => dispatch(login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
