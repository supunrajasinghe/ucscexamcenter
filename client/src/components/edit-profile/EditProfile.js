import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileAction";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      registrationNo: "",
      fullName: "",
      nameWithInitials: "",
      degree: "",
      year: "",
      mobileNo: "",
      fixedNo: "",
      options: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //if profile feild doesn't exists, make empty string
      profile.fixedNo = !isEmpty(profile.fixedNo) ? profile.fixedNo : "";

      this.setState({
        handle: profile.handle,
        registrationNo: profile.registrationNo,
        fullName: profile.fullName,
        nameWithInitials: profile.nameWithInitials,
        degree: profile.degree,
        year: profile.year,
        mobileNo: profile.mobileNo,
        fixedNo: profile.fixedNo
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      registrationNo: this.state.registrationNo,
      fullName: this.state.fullName,
      nameWithInitials: this.state.nameWithInitials,
      degree: this.state.degree,
      year: this.state.year,
      mobileNo: this.state.mobileNo,
      fixedNo: this.state.fixedNo
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    //Select options for degree
    const degreeOptions = [
      { label: "* Select your degree", value: 0 },
      {
        label: "Bachelor Of Computer Science Degree Programme (CS)",
        value: "Bachelor Of Computer Science Degree Programme (CS)"
      },
      {
        label: "Bachelor Of Information Systems (IS)",
        value: "Bachelor Of Information Systems (IS)"
      },
      {
        label: "Master of Information Security Degree Programme (MIS)",
        value: "Master of Information Security Degree Programme (MIS)"
      },
      {
        label: "Master of Information Security(MIS)",
        value: "Master of Information Security(MIS)"
      },
      {
        label:
          "Master of Computer Science(MCS) / Master of Science in Computer Science (MSc in CS)",
        value:
          "Master of Computer Science(MCS) / Master of Science in Computer Science (MSc in CS)"
      },
      {
        label: "Master of Information Technology(MIT)",
        value: "Master of Information Technology(MIT)"
      }
    ];

    //Select options for acedamic year
    const yearOptions = [
      {
        label: "* select year",
        value: 0
      },
      {
        label: "1st year",
        value: "1st year"
      },
      {
        label: "2nd year",
        value: "2nd year"
      },
      {
        label: "3rd year",
        value: "3rd year"
      },
      {
        label: "4th year",
        value: "4th year"
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="text-center">Edit your profile</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="your index number"
                />

                <TextFieldGroup
                  placeholder="* Registration Number"
                  name="registrationNo"
                  value={this.state.registrationNo}
                  onChange={this.onChange}
                  error={errors.registrationNo}
                />

                <TextFieldGroup
                  placeholder="* Full Name"
                  name="fullName"
                  value={this.state.fullName}
                  onChange={this.onChange}
                  error={errors.fullName}
                />

                <TextFieldGroup
                  placeholder="* Name With Initials"
                  name="nameWithInitials"
                  value={this.state.nameWithInitials}
                  onChange={this.onChange}
                  error={errors.nameWithInitials}
                />

                <SelectListGroup
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  options={degreeOptions}
                  error={errors.degree}
                />

                <SelectListGroup
                  name="year"
                  value={this.state.year}
                  onChange={this.onChange}
                  options={yearOptions}
                  error={errors.year}
                />

                <TextFieldGroup
                  placeholder="* Mobile Number"
                  name="mobileNo"
                  value={this.state.mobileNo}
                  onChange={this.onChange}
                  error={errors.mobileNo}
                />

                <TextFieldGroup
                  placeholder="fixed Number"
                  name="fixedNo"
                  value={this.state.fixedNo}
                  onChange={this.onChange}
                  error={errors.fixedNo}
                />

                <button
                  type="submit"
                  className="btn btn-success"
                  style={{
                    width: "100%"
                  }}
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
