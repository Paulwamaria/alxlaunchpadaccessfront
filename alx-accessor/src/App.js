import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Mynavbar from "./componets/layout/MyNavbar";
import Footer from "./componets/layout/Footer";
import { connect } from "react-redux";
import { loadUser, checkAuthStatus } from "./actions/auth";
import { getJokes } from "./actions/Joke";
import { getAnime } from "./actions/anim";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount = () => {
    this.props.loadUser();
    this.props.checkAuthStatus();
    this.props.getJokes();
    this.props.getAnime("action");
  };
  render() {
    return (
      <Router>
        <div className="App container-fluid ">
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
    loadUser: () => dispatch(loadUser()),
    getJokes: () => dispatch(getJokes()),
    getAnime: (category) => dispatch(getAnime(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
