import React, { Component } from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";
import { getAllSubjects } from "../../actions/subjectAction";
//import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";

class AddRepeatSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubjects: []
    };

    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllSubjects();
  }

  onClick(e) {
    e.preventDefault();
    let subject = e.target.dataset.value;
    console.log(e.target.dataset.value);

    if (this.state.selectedSubjects.includes(subject)) {
      var index = this.state.selectedSubjects.indexOf(subject);
      console.log(index);
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
    console.log(this.state.selectedSubjects);
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
          data-value={obj.subjectCode}
          onClick={this.onClick}
        >
          {obj.subjectCode} - {obj.subjectName}
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
          <form onSubmit={this.onSubmit}>
            <button type="submit">465</button>
          </form>
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
