import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword, checkAuthStatus } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      requestSent: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.email === "") {
      const msg = {
        EmailRequired: "Email is required!",
      };
      this.props.createMessage(msg);
    } else {
      this.props.resetPassword(this.state.email);
      this.setState({
        requestSent: true,
      });
    }
  };

  render() {
    if (this.state.requestSent) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form
              onSubmit={this.handleSubmit}
              className="mt-5 mb-5 #1c2a48 mdb-color darken-3 rounded text-white px-2"
            >
              <legend className="text">Request Password Reset</legend>
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

              <button className="mt-3 rounded" type="submit">
                Reset Password
              </button>
              <p className="mt-2">
                Go back to login? <Link to="/login">Login</Link>
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
    resetPassword: (email) => dispatch(resetPassword(email)),
    checkAuthStatus: () => dispatch(checkAuthStatus()),
    createMessage: (msg) => dispatch(createMessage(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
