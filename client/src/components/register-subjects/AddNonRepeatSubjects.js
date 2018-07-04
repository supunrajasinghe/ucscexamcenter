import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getNonRepeatSubjects,
  addRegisterSubjects
} from "../../actions/subjectAction";
import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
//import isEmpty from "../../validation/is-empty";

class AddNonRepeatSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexNo: "",
      selectedSubjects: [],
      degree: "",
      type: "nonrepeat",
      errors: {}
    };

    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getNonRepeatSubjects();
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        indexNo: profile.handle,
        degree: profile.degree
      });
    }
  }

  onClick(e) {
    e.preventDefault();
    let subject = e.target.dataset.value;

    if (this.state.selectedSubjects.includes(subject)) {
      var index = this.state.selectedSubjects.indexOf(subject);
      this.setState({
        selectedSubjects: this.state.selectedSubjects
          .splice(0, index)
          .concat(this.state.selectedSubjects.slice(index + 1))
      });
    } else {
      this.setState({
        selectedSubjects: this.state.selectedSubjects.concat([subject])
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const subjects = this.state.selectedSubjects.toString();
    if (subjects === "") {
      alert("please select subjects");
    } else {
      const subjectData = {
        indexNo: this.state.indexNo,
        subjects: subjects,
        degree: this.state.degree,
        type: this.state.type
      };

      this.props.addRegisterSubjects(subjectData, this.props.history);
    }
  }

  render() {
    const { nonRepeatSubjects, loading } = this.props.nonRepeatSubjects;

    let AddNonRepeatSubjectsContent;
    if (nonRepeatSubjects === null || loading) {
      AddNonRepeatSubjectsContent = <Spinner />;
    } else {
      const list = nonRepeatSubjects.map(obj => (
        <li
          className="list-group-item"
          key={obj.subjectCode}
          data-value={obj.subjectCode}
          onClick={this.onClick}
        >
          {obj.subjectCode} - {obj.subjectName}
        </li>
      ));
      AddNonRepeatSubjectsContent = <ul className="list-group ">{list}</ul>;
    }

    return (
      <div className="container" style={{ marginBottom: "50px" }}>
        <div className=".addNonRepeatSubjectsHeader ">
          <h1>SLECET YOUR SUBJECTS</h1>
          <small>
            Make sure you are selected your academic year correctly. If not
            please update your profile.
          </small>
          <div>
            {AddNonRepeatSubjectsContent}
            <br />
          </div>
          <div>
            SELECTED SUBJECTS <hr /> {this.state.selectedSubjects} <hr />
          </div>
          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary">
              submit your subjects
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddNonRepeatSubjects.propTypes = {
  getNonRepeatSubjects: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nonRepeatSubjects: state.subject,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getNonRepeatSubjects, getCurrentProfile, addRegisterSubjects }
)(withRouter(AddNonRepeatSubjects));
