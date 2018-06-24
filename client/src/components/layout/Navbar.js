import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileAction";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="#">
            {user.indexNo}
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            <span className="glyphicon glyphicon-user" /> Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link my-sm-0" to="/login">
            <span className="glyphicon glyphicon-log-in" /> Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          UCSC
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <ul className="nav navbar-nav">
              <li>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
