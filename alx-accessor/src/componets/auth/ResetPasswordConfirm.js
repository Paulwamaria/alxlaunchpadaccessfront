import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { resetPasswordConfirm, checkAuthStatus } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class ResetPasswordConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      reNewPassword: "",
      requestSent: false,
      hidden: true,
    };
  }

  toggleVisibility = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.newPassword === "") {
      const msg = {
        NewPassRequired: "Password field is required!",
      };
      this.props.createMessage(msg);
    } else if (this.state.reNewPassword === "") {
      const msg = {
        ReNewPassRequired: "Password field is required!",
      };
      this.props.createMessage(msg);
    } else {
      const uid = this.props.match.params.uid;
      const token = this.props.match.params.token;
      const newPassword = this.state.newPassword;
      const reNewPassword = this.state.reNewPassword;
      this.props.resetPasswordConfirm(uid, token, newPassword, reNewPassword);
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
              className="mt-5 mb-5 #1c2a48 mdb-color darken-3 text-white rounded px-2"
            >
              <legend className="text">Reset Your Password</legend>
              <div>
                <label htmlFor="newPassword">New Password</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type={this.state.hidden ? "password" : "text"}
                  id="newPassword"
                  name="newPassword"
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="reNewPassword">Confirm</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type={this.state.hidden ? "password" : "text"}
                  id="reNewPassword"
                  name="reNewPassword"
                  value={this.state.reNewPassword}
                  onChange={this.handleChange}
                />
              </div>

              <button className="mt-3 rounded" type="submit">
                Submit
              </button>
              <i
                onClick={this.toggleVisibility}
                class={
                  this.state.hidden ? "fa fa-eye mx-2" : "fa fa-eye-slash mx-2"
                }
              ></i>
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
    resetPasswordConfirm: (uid, token, newPassword, reNewPassword) =>
      dispatch(resetPasswordConfirm(uid, token, newPassword, reNewPassword)),
    checkAuthStatus: () => dispatch(checkAuthStatus()),
    createMessage: (msg) => dispatch(createMessage(msg)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordConfirm);
