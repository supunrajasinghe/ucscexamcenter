import React, { Component } from "react";
import { connect } from "react-redux";
import { getRegisterSubjects } from "../../actions/subjectAction";
import Spinner from "../common/Spinner";
import Moment from "react-moment";

class ViewAllRegisterStudents extends Component {
  componentDidMount() {
    this.props.getRegisterSubjects();
  }

  render() {
    const { registerSubjects, loading } = this.props.registersubjects;

    let AllRegisetrSubjectcontent;

    if (registerSubjects === null || loading) {
      AllRegisetrSubjectcontent = <Spinner />;
    } else {
      const list = registerSubjects.map(obj => (
        <tr key={obj._id}>
          <td>{obj.indexNo}</td>
          <td>{obj.degree}</td>
          <td>{obj.subjects}</td>
          <td>{obj.type}</td>
          <td>
            <Moment format="YYYY/MM/DD">{obj.date}</Moment>
          </td>
        </tr>
      ));

      AllRegisetrSubjectcontent = (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Index NO</th>
              <th scope="col">Degree</th>
              <th scope="col">Subjects</th>
              <th scope="col">Type</th>
              <th scope="col">Date Submited</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      );
    }

    return <div>{AllRegisetrSubjectcontent}</div>;
  }
}

const mapStateToProps = state => ({
  registersubjects: state.subject,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRegisterSubjects }
)(ViewAllRegisterStudents);
