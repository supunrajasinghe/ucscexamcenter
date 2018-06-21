import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import classnames from "classnames";

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

    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
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

Register.propTypes = {};

export default Register;
