import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              UCSC
            </Link>
          </div>
          <ul className="nav navbar-nav">
            <li className="active">
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#">about</a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link className="nav-link" to="/register">
                <span className="glyphicon glyphicon-user" /> Signup
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/login">
                <span className="glyphicon glyphicon-log-in" /> Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {};

export default Navbar;
