import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";

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

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h4>
              <Link to={`/profiles/${profile.handle}`}>
                {profile.nameWithInitials}
              </Link>
            </h4>
            <ProfileActions />
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
