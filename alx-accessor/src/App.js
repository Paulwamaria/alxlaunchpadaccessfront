import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Mynavbar from "./componets/layout/MyNavbar";
import Footer from "./componets/layout/Footer";
import { connect } from "react-redux";
import { load_user, checkAuthStatus } from "./actions/auth";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount = () => {
    this.props.loadUser();
    this.props.checkAuthStatus();
  };
  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <Mynavbar />
          <Footer />
        </div>
      </Router>
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
    checkAuthStatus: () => dispatch(checkAuthStatus()),
    loadUser: () => dispatch(load_user()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
