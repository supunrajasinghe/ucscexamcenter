import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExam } from "../../actions/examAction";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class AddExams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: "",
      year: "",
      semester: "",
      examination: "",
      description: "",
      deadline: "",
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

    const examData = {
      degree: this.state.degree,
      year: this.state.year,
      semester: this.state.semester,
      examination: this.state.examination,
      description: this.state.description,
      deadline: this.state.deadline
    };

    this.props.addExam(examData, this.props.history);
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
      <div>
        <div className="signUpWindow">
          <div className="row signUpHeader">
            <h1>ADD EXAMS</h1>
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
                placeholder="* examination"
                name="examination"
                value={this.state.examination}
                onChange={this.onChange}
                error={errors.examination}
              />

              <TextFieldGroup
                placeholder="* description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
              />

              <TextFieldGroup
                placeholder="* deadline"
                name="deadline"
                value={this.state.deadline}
                onChange={this.onChange}
                error={errors.deadline}
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

AddExams.propTypes = {
  //exam: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exam: state.exam,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExam }
)(withRouter(AddExams));
