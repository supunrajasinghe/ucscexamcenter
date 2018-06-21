import React from "react";
import PropTypes from "prop-types";
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

    console.log(newUser);
  }

  render() {
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
                  className="form-control"
                  name="indexNo"
                  placeholder="Index Number"
                  value={this.state.indexNo}
                  onChange={this.onChange}
                />
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  placeholder="Confirm password"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
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
