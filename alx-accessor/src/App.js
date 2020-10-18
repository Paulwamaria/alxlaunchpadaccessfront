import React, { Component } from "react";
import { Provider as AlertProvider, transitions, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Mynavbar from "./componets/layout/MyNavbar";
import Footer from "./componets/layout/Footer";
import { connect } from "react-redux";
import { loadUser, checkAuthStatus } from "./actions/auth";
import { getJokes } from "./actions/Joke";
import { getAnime } from "./actions/anim";
import Alerts from "./componets/layout/Alerts";

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
    //Alert Options
    const alertOptions = {
      timeout: 3000,
      position: positions.TOP_CENTER,
      transition: transitions.FADE,
      containerStyle: {
        zIndex: 1100,
      },
    };
    return (
      <Router>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <div className="App container-fluid ">
            <Mynavbar />
            <Alerts />
            <Footer />
          </div>
        </AlertProvider>
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
