import React, { Component } from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";
import { getNonRepeatSubjects } from "../../actions/subjectAction";
import Spinner from "../common/Spinner";
//import isEmpty from "../../validation/is-empty";

class AddNonRepeatSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getNonRepeatSubjects();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.nonRepeatSubjects !== undefined) {
  //     console.log("new title is", nextProps.nonRepeatSubjects);
  //     // this.setState({
  //     //   nonRepeatSubjects: this.props.nonRepeatSubjects
  //     // });
  //   }
  // }

  render() {
    //const { nonRepeatSubjects }= this.props.nonRepeatSubjects;
    const { nonRepeatSubjects, loading } = this.props.nonRepeatSubjects;

    let AddNonRepeatSubjectsContent;
    if (nonRepeatSubjects === null || loading) {
      AddNonRepeatSubjectsContent = <Spinner />;
    } else {
      const list = nonRepeatSubjects.map(obj => (
        <li className="list-group-item" key={obj.subjectCode}>
          <input type="checkbox" className="form-check-input" />
          {obj.subjectCode} - {obj.subjectName}
        </li>
      ));

      AddNonRepeatSubjectsContent = <ul className="list-group ">{list}</ul>;
    }

    return (
      <div className="container">
        <div className=".addNonRepeatSubjectsHeader ">
          <h1>SLECET YOUR SUBJECTS</h1>
          <small>
            Make sure you are selected your academic year correctly. If not
            please update your profile.
          </small>
          <div>{AddNonRepeatSubjectsContent}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nonRepeatSubjects: state.subject,
  auth: state.auth,
  errors: state.errors
});

// AddNonRepeatSubjects.propTypes = {
//   getNonRepeatSubjects: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   nonRepeatSubjects: PropTypes.object.isRequired
// };

export default connect(
  mapStateToProps,
  { getNonRepeatSubjects }
)(AddNonRepeatSubjects);
