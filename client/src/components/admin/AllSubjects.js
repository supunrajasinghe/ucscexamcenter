import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllSubjectsAdmin,
  deleteSubjects
} from "../../actions/subjectAction";
import Spinner from "../common/Spinner";

class AllSubjects extends Component {
  componentDidMount() {
    this.props.getAllSubjectsAdmin();
  }

  onDeleteClick(id) {
    const subjectData = {
      _id: id
    };
    this.props.deleteSubjects(subjectData, this.props.history);
  }

  render() {
    const { allSubjects, loading } = this.props.allsubjects;

    let AllSubjectsContent;

    if (allSubjects === null || loading) {
      AllSubjectsContent = <Spinner />;
    } else {
      const list = allSubjects.map(obj => (
        <tr key={obj._id}>
          <td>{obj.degree}</td>
          <td>{obj.year}</td>
          <td>{obj.semester}</td>
          <td>{obj.subjectCode}</td>
          <td>{obj.subjectName}</td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, obj._id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="far fa-trash-alt" />
            </button>
          </td>
        </tr>
      ));
      AllSubjectsContent = (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Degree</th>
              <th scope="col">Year</th>
              <th scope="col">Semester</th>
              <th scope="col">Subject Code</th>
              <th scope="col">Subject Name</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      );
    }

    return <div>{AllSubjectsContent}</div>;
  }
}
AllSubjects.propTypes = {
  allsubjects: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  allsubjects: state.subject,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAllSubjectsAdmin, deleteSubjects }
)(withRouter(AllSubjects));
