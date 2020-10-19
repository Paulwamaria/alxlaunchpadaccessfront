import React, { Component, Fragment } from "react";
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
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import PrivateRoute from "../common/PrivateRoute";

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
                    {this.props.isAuthenticated ? (
                      <Fragment>
                        <Dropdown.Item onClick={this.props.logout}>
                          logout
                        </Dropdown.Item>
                        <Dropdown.Item href="/">Admin</Dropdown.Item>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Dropdown.Item href="/login">Login</Dropdown.Item>
                        <Dropdown.Item href="/register">Sign Up</Dropdown.Item>
                      </Fragment>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
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
          <Route path="/activate/:uid/:token" component={Activate} />
          <Route exact path="/reset_password">
            <ResetPassword />
          </Route>
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirm}
          />
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
    logout: () => dispactch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
