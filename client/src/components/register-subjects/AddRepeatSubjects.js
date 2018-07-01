import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllSubjects } from "../../actions/subjectAction";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";

class AddRepeatSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: []
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getAllSubjects();
  }

  onChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    // var newArray = [];
    // newArray.push(e.target.value);
    // this.setState({ subjects: newArray });
    // console.log(this.state.subjects);
  }

  render() {
    const { repeatSubjects, loading } = this.props.allsubjects;

    let AddRepeatSubjectsContent;
    if (repeatSubjects === null || loading) {
      AddRepeatSubjectsContent = <Spinner />;
    } else {
      const list = repeatSubjects.map(obj => (
        <li
          className="list-group-item"
          key={obj.subjectCode}
          value={obj.subjectCode}
          onClick={this.onChange}
        >
          {obj.subjectCode} - {obj.subjectName}
          {/* <input
            type="checkbox"
            value={obj.subjectCode}
            onChange={this.onChange}
            className="form-check-input"
          /> */}
        </li>
      ));

      AddRepeatSubjectsContent = <ul className="list-group ">{list}</ul>;
    }

    return (
      <div className="container">
        <div className=".addNonRepeatSubjectsHeader ">
          <h1>SLECET YOUR SUBJECTS</h1>
          <small>
            Make sure you are selected your academic year correctly. If not
            please update your profile.
          </small>
          <div>{AddRepeatSubjectsContent}</div>
        </div>
      </div>
    );
  }
}

// AddRepeatSubjects.propTypes = {
//   getAllSubjects: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  allsubjects: state.subject,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAllSubjects }
)(AddRepeatSubjects);
