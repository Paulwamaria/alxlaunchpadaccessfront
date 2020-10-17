import React, { Component } from "react";
import { Link } from "react-router-dom";

export class About extends Component {
  render() {
    return (
      <div classsName="container-fluid">
        <h5 className="mt-5">About Alx-accessor</h5>
        <p>
          A platform which aims to support Young leaders to access ALX Launchpad
          services including to explore content, discover opportunities &
          events, and engage with peers, facilitators, or other users. However,
          the website is still under construction and the information available
          is quality jokes from the official joke API and quality animations
          from Kitsu API. Join our community fo find out more.
        </p>
        <Link to="/register">Join Alx-accessor</Link>
      </div>
    );
  }
}

export default About;
