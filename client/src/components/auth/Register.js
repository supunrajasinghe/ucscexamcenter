import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import "../../css/register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexNo: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      indexNo: this.state.indexNo,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const errors = this.state.errors;

    return (
      <div>
        <div className="signUpWindow">
          <div className="signUpHeader">
            <h1>CREATE NEW ACCOUNT</h1>
          </div>
          <div className="signUpForm">
            <div className="form-group">
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.indexNo
                  })}
                  name="indexNo"
                  placeholder="Index Number"
                  value={this.state.indexNo}
                  onChange={this.onChange}
                />
                {errors.indexNo && (
                  <div className="invalid-feedback float-left">
                    {errors.indexNo}
                  </div>
                )}
                <input
                  type="email"
                  className={classnames("form-control", {
                    "is-invalid": errors.email
                  })}
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback float-left">
                    {errors.email}
                  </div>
                )}
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password
                  })}
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback float-left">
                    {errors.password}
                  </div>
                )}
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password2
                  })}
                  name="password2"
                  placeholder="Confirm password"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                {errors.password2 && (
                  <div className="invalid-feedback float-left">
                    {errors.password2}
                  </div>
                )}
                <button type="submit" className="btn btn-success">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
