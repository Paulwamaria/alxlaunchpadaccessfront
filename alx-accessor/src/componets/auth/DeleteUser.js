import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/auth";
import { Redirect } from "react-router-dom";

export class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notInterested: false,
      insecurity: false,
      not: false,
      other: "",
      formSubmited: false,
      hidden: true,
      password: "",
      deleteRequestSent: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      formSubmited: true,
    });
  };
  toggleVisibility = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };

  handleDeleteRequest = (event) => {
    event.preventDefault();
    const currentPassword = this.state.password;
    this.props.deleteUser(currentPassword);
    this.setState({
      deleteRequestSent: true,
    });
  };
  render() {
    if (this.state.deleteRequestSent) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            {this.state.formSubmited ? (
              <fragment>
                <form
                  onSubmit={this.handleDeleteRequest}
                  className="form-group mt-5 mb-5 #1c2a48 mdb-color darken-3 rounded text-white px-2"
                >
                  <lenged>Enter your current password</lenged>
                  <div>
                    <label htmlFor="password">Password</label>
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type={this.state.hidden ? "password" : "text"}
                      id="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <button className="mt-2 mb-2 rounded" type="submit">
                    Remove Account
                  </button>
                  <i
                    onClick={this.toggleVisibility}
                    className={
                      this.state.hidden
                        ? "fa fa-eye mx-2"
                        : "fa fa-eye-slash mx-2"
                    }
                  ></i>
                </form>
              </fragment>
            ) : (
              <fragment>
                <p className="mt-3">
                  Please help us understand why you are leaving us by filling in
                  the form below.
                </p>
                <form
                  onSubmit={this.handleSubmit}
                  className="mt-5 mb-5 #1c2a48 mdb-color darken-3 rounded text-white px-2"
                >
                  <legend className="text">Why I am leaving:</legend>
                  <div className="text-left ml-5">
                    <div>
                      <label htmlFor="notInterested">
                        <input
                          id="notInterested"
                          name="notInterested"
                          type="checkbox"
                          checked={this.state.notInterested}
                          onChange={this.handleInputChange}
                        />
                        :<span className="mx-3">Not interested</span>
                      </label>
                    </div>

                    <div>
                      <label htmlFor="insecurity">
                        <input
                          id="insecurity"
                          name="insecurity"
                          type="checkbox"
                          checked={this.state.insecurity}
                          onChange={this.handleInputChange}
                        />
                        :{" "}
                        <span className="mx-3">
                          I don't understand what this is all about
                        </span>
                      </label>
                    </div>

                    <div>
                      <label htmlFor="notWhatIExpected">
                        <input
                          id="notWhatIExpected"
                          name="not"
                          type="checkbox"
                          checked={this.state.not}
                          onChange={this.handleInputChange}
                        />
                        :
                        <span className="mx-3">
                          This is not what I was loking for
                        </span>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="other">Other</label>
                    </div>
                    <div>
                      <input
                        type="textarea"
                        id="other"
                        name="other"
                        value={this.state.other}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="mx-auto mt-2 mb-3">
                    Submit Feedback
                  </button>
                </form>{" "}
              </fragment>
            )}
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
    deleteUser: (currentPassword) => dispatch(deleteUser(currentPassword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);
