import React from "react";
//import PropTypes from "prop-types";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron header">
          <img src={require("../../img/UCSC_logo.png")} alt="" />
        </div>

        <div className="card">
          <div className="card-header">Featured</div>
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}

//Landing.propTypes = {};

export default Landing;
