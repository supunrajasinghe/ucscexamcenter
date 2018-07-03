import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllExams, deleteExam } from "../../actions/examAction";
import Spinner from "../common/Spinner";

class AllExams extends Component {
  componentDidMount() {
    this.props.getAllExams();
  }

  onDeleteClick(id, degreeCome, yearCome, semesterCome) {
    const examData = {
      _id: id,
      degeree: degreeCome,
      year: yearCome,
      semester: semesterCome
    };

    this.props.deleteExam(examData, this.props.history);
  }

  render() {
    const { exams, loading } = this.props.allexams;

    let AllExamsContent;

    if (exams === null || loading) {
      AllExamsContent = <Spinner />;
    } else {
      const list = exams.map(obj => (
        <tr key={obj._id}>
          <td>{obj.degree}</td>
          <td>{obj.year}</td>
          <td>{obj.semester}</td>
          <td>{obj.examination}</td>
          <td>{obj.description}</td>
          <td>{obj.deadline}</td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(
                this,
                obj._id,
                obj.degree,
                obj.year,
                obj.semester
              )}
              type="button"
              className="btn btn-danger"
            >
              <i className="far fa-trash-alt" />
            </button>
          </td>
        </tr>
      ));

      AllExamsContent = (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Degree</th>
              <th scope="col">Year</th>
              <th scope="col">Semester</th>
              <th scope="col">examination</th>
              <th scope="col">description</th>
              <th scope="col">deadline</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      );
    }

    return <div>{AllExamsContent}</div>;
  }
}

AllExams.propTypes = {
  allexams: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  allexams: state.exam,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAllExams, deleteExam }
)(withRouter(AllExams));
