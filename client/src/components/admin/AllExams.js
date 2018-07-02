import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllExams } from "../../actions/examAction";
import Spinner from "../common/Spinner";

class AllExams extends Component {
  componentDidMount() {
    this.props.getAllExams();
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
            <button type="button" className="btn btn-danger">
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

const mapStateToProps = state => ({
  allexams: state.exam,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAllExams }
)(AllExams);
