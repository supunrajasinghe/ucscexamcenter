import React from "react";
import { connect } from "react-redux";
import { getAllExams } from "../../actions/examAction";
import Spinner from "../common/Spinner";
//import PropTypes from "prop-types";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    this.props.getAllExams();
  }

  onClick(e) {
    e.preventDefault();
    const { user } = this.props.auth;

    if (user.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    const { exams, loading } = this.props.allexams;

    let AllExamsContent;

    if (exams === null || loading) {
      AllExamsContent = <Spinner />;
    } else {
      const list = exams.map(obj => (
        <div className="card" key={obj._id} style={{ margin: "10px" }}>
          <h5 className="card-header">{obj.examination}</h5>
          <div className="card-body">
            <h5 className="card-title">YEAR : {obj.year}</h5>
            <h5 className="card-title">DEGREE : {obj.degree}</h5>
            <h5 className="card-title">DEAD LINE : {obj.deadline}</h5>
            <p className="card-text">{obj.description}</p>
            <a onClick={this.onClick} className="btn btn-primary">
              Register For Examination
            </a>
          </div>
        </div>
      ));

      AllExamsContent = list;
    }

    return (
      <div className="container">
        <div className="jumbotron header">
          <img src={require("../../img/UCSC_logo.png")} alt="" />
        </div>
        <div>{AllExamsContent}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allexams: state.exam,
  auth: state.auth,
  errors: state.errors
});

//Landing.propTypes = {};

export default connect(
  mapStateToProps,
  { getAllExams }
)(Landing);
