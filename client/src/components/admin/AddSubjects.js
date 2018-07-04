import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addSubject } from "../../actions/subjectAction";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class AddSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: "",
      year: "",
      semester: "",
      subjectCode: "",
      subjectName: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const subjectData = {
      degree: this.state.degree,
      year: this.state.year,
      semester: this.state.semester,
      subjectCode: this.state.subjectCode,
      subjectName: this.state.subjectName
    };

    this.props.addSubject(subjectData, this.props.history);
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
        label: "1",
        value: "1"
      },
      {
        label: "2",
        value: "2"
      },
      {
        label: "3",
        value: "3"
      },
      {
        label: "4",
        value: "4"
      }
    ];

    //select options for semester
    const semesterOptions = [
      {
        label: "* select semester",
        value: 0
      },
      {
        label: "1",
        value: "1"
      },
      {
        label: "2",
        value: "2"
      }
    ];

    return (
      <div style={{ marginBottom: "50px" }}>
        <div className="signUpWindow">
          <div className="row signUpHeader">
            <h1>ADD SUBJECTS</h1>
          </div>
          <div className="signUpForm">
            <form onSubmit={this.onSubmit}>
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

              <SelectListGroup
                name="semester"
                value={this.state.semester}
                onChange={this.onChange}
                options={semesterOptions}
                error={errors.semester}
              />

              <TextFieldGroup
                placeholder="* subject code"
                name="subjectCode"
                value={this.state.subjectCode}
                onChange={this.onChange}
                error={errors.subjectCode}
              />

              <TextFieldGroup
                placeholder="* subject name"
                name="subjectName"
                value={this.state.subjectName}
                onChange={this.onChange}
                error={errors.subjectName}
              />

              <button type="submit" className="btn btn-success">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddSubjects.propTypes = {
  subject: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  subject: state.subject,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addSubject }
)(withRouter(AddSubjects));
