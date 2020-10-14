import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBFooter } from "mdbreact";

export class Footer extends Component {
  render() {
    return (
      <MDBFooter className="#1c2a48 mdb-color darken-3 font-small pt-4 mt-4 fixed-bottom">
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <Link to="/licence">alx</Link>
          </MDBContainer>
        </div>
      </MDBFooter>
    );
  }
}

export default Footer;
