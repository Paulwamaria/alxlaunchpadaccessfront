import React, { Fragment, Component } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidUpdate = (prevProps) => {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.email) {
        alert.error(`Email: ${error.msg.email.join()}`);
      }
      if (error.msg.firtName) {
        alert.error(`First Name: ${error.msg.firtName.join()}`);
      }
      if (error.msg.lastName) {
        alert.error(`Last Name: ${error.msg.lastName.join()}`);
      }
      if (error.msg.password) {
        alert.error(`Password: ${error.msg.password.join()}`);
      }
      if (error.msg.re_password) {
        alert.error(`Re_Password: ${error.msg.re_password.join()}`);
      }
      if (error.msg.token) {
        alert.error(`Token: ${error.message.token.join()}`);
      }
      if (error.msg.uid) {
        alert.error(`Uid: ${error.message.uid.join()}`);
      }
      if (error.msg.detail) {
        alert.error(error.msg.detail);
      }
      if (error.msg.new_password) {
        alert.error(error.msg.new_password);
      }
      if (error.msg.re_new_password) {
        alert.error(error.msg.re_new_password);
      }
      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors);
      }
    }

    if (message !== prevProps.message) {
      if (message.AccountDetails) {
        alert.success(message.AccountDetails);
      }
      if (message.AccountVerified) {
        alert.success(message.AccountVerified);
      }
      if (message.PassRequired) {
        alert.error(message.PassRequired);
      }
      if (message.EmailRequired) {
        alert.error(message.EmailRequired);
      }
      if (message.RequestPassReset) {
        alert.success(message.RequestPassReset);
      }
      if (message.PassResetConfirm) {
        alert.success(message.PassResetConfirm);
      }
      if (message.NewPassRequired) {
        alert.error(message.NewPassRequired);
      }
      if (message.ReNewPassRequired) {
        alert.error(message.ReNewPassRequired);
      }
      if (message.FNameRequired) {
        alert.error(message.FNameRequired);
      }
      if (message.LNameRequired) {
        alert.error(message.LNameRequired);
      }
      if (message.ConfirmPassRequired) {
        alert.error(message.ConfirmPassRequired);
      }
      if (message.PasswordsNoMatch) {
        alert.error(message.PasswordsNoMatch);
      }
    }
  };
  render() {
    return <Fragment></Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.errorReducer,
    message: state.messageReducer,
  };
};

export default connect(mapStateToProps)(withAlert()(Alerts));
