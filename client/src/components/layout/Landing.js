import React from "react";
//import PropTypes from "prop-types";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron header">
          <img src={require("../../img/UCSC_logo.png")} alt="" />
        </div>

        <div className="examAnnouncements">
          <div className="panel panel-default">
            <div className="panel-heading">Panel heading without title</div>
            <div className="panel-body">Panel content</div>
          </div>
        </div>
      </div>
    );
  }
}

//Landing.propTypes = {};

export default Landing;
