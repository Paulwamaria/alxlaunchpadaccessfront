import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../actions/auth";

export class Activate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verified: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  verifyAccount = (event) => {
    event.preventDefault();
    const uid = this.props.match.params.uid;
    const token = this.props.match.params.token;
    this.props.verify(uid, token);
    this.setState({
      verified: true,
    });
  };

  render() {
    if (this.state.verified) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h2 className="mt-5">Verify Your Account</h2>
            <div>
              <button type="submit" onClick={this.verifyAccount}>
                Verify
              </button>
            </div>
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
    verify: (uid, token) => dispatch(verify(uid, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activate);
