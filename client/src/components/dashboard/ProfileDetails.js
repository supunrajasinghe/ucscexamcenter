import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUserSubjects } from "../../actions/subjectAction";
import Spinner from "../common/Spinner";
import Moment from "react-moment";

class ProfileDetails extends Component {
  componentDidMount() {
    this.props.getCurrentUserSubjects();
  }

  render() {
    const { registerSubjectsUser, loading } = this.props.registersubjects;

    let AllRegisetrSubjectcontent;

    if (registerSubjectsUser === null || loading) {
      AllRegisetrSubjectcontent = <Spinner />;
    } else {
      if (registerSubjectsUser === null || loading) {
        AllRegisetrSubjectcontent = <Spinner />;
      } else {
        const list = registerSubjectsUser.map(obj => (
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
          <table className="table table-hover ">
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
    }

    return <div>{AllRegisetrSubjectcontent}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  registersubjects: state.subject,
  auth: state.auth
});

ProfileDetails.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getCurrentUserSubjects: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  registersubjects: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentUserSubjects }
)(ProfileDetails);
