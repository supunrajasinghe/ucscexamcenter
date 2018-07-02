import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileAction";
import { clearAllSubjects } from "../../actions/subjectAction";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearAllSubjects();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            {user.indexNo}
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const adminLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/all-exams">
            View All Exams
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-subjects">
            Add Subjects
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-exams">
            Add Exams
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            admin
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            <span>
              <i className="fas fa-user-plus" /> Signup
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link my-sm-0" to="/login">
            <span>
              <i className="fas fa-sign-in-alt" /> Login
            </span>
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          UCSC
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {isAuthenticated
              ? user.indexNo === "00000000"
                ? adminLinks
                : authLinks
              : guestLinks}
          </ul>
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
  { logoutUser, clearCurrentProfile, clearAllSubjects }
)(Navbar);
