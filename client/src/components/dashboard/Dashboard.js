import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import ProfileDetails from "./ProfileDetails";
import isEmpty from "../../validation/is-empty";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    let dashboardDetails;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        profile.fixedNo = !isEmpty(profile.fixedNo) ? profile.fixedNo : "";
        dashboardDetails = (
          <ul
            className="list-group"
            style={{ marginLeft: "5%", marginRight: "5%" }}
          >
            <li className="list-group-item list-group-item-primary">
              Index number : <b>{profile.handle}</b>
            </li>
            <li className="list-group-item list-group-item-primary">
              Registration Number : <b>{profile.registrationNo}</b>
            </li>
            <li className="list-group-item list-group-item-primary">
              Full Name : <b>{profile.fullName}</b>
            </li>
            <li className="list-group-item list-group-item-primary">
              Name With Initials :<b> {profile.nameWithInitials}</b>
            </li>
            <li className="list-group-item list-group-item-primary">
              degree : <b>{profile.degree}</b>
            </li>
            <li className="list-group-item list-group-item-primary">
              year : <b>{profile.year} </b>
            </li>
            <li className="list-group-item list-group-item-primary">
              Mobile Number : <b>{profile.mobileNo}</b>
            </li>
            <li className="list-group-item list-group-item-primary">
              Fixed Number : <b>{profile.fixsedNo}</b>
            </li>
          </ul>
        );

        dashboardContent = (
          <div style={{ marginBottom: "50px" }}>
            <h4>{profile.nameWithInitials}</h4>
            <ProfileActions />
            <div className="container" style={{ textAlign: "left" }}>
              {dashboardDetails}
            </div>
            <div style={{ marginLeft: "5%", marginRight: "5%" }}>
              <br />
              <ProfileDetails />
            </div>
          </div>
        );
      } else {
        //User is logged in but  has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.indexNo}</p>
            <p>You have not yet setup profile.Add some data</p>
            <Link to="/create-profile" className="btn btn-md btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Dashborad</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
