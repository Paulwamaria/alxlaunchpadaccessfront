import React, { Component } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Activate from "../auth/Activate";
import ResetPassword from "../auth/ResetPassword";
import ResetPasswordConfirm from "../auth/ResetPasswordConfirm";
import About from "./About";
import Licence from "./Licence";
// import { checkAuthStatus } from "../../actions/auth";
import { connect } from "react-redux";

export class MyNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar
          variant="dark"
          expand="lg"
          className="#1c2a48 mdb-color darken-3"
          sticky="top"
        >
          <Navbar.Brand href="/">Alx-accessor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                    className=""
                  >
                    <i className="fas fa-user"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/login">Login</Dropdown.Item>
                    <Dropdown.Item href="/sign up">Sign Up</Dropdown.Item>
                    <Dropdown.Item href="/">Admin</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/licence">
            <Licence />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/activate/:uid/:token">
            <Activate />
          </Route>
          <Route exact path="/reset_password">
            <ResetPassword />
          </Route>
          <Route exact path="/password/reset/confirm:uid/:token">
            <ResetPasswordConfirm />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispactch) => {
  return {
    //checkAuthStatus
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
