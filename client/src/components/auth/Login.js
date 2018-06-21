import React from "react";
import PropTypes from "prop-types";
import "../../css/login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexNo: "",
      password: "",
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

    const User = {
      indexNo: this.state.indexNo,
      password: this.state.password
    };

    console.log(User);
  }

  render() {
    return (
      <div className="loginUpWindow">
        <div className="loginUpHeader">
          <h1>Login</h1>
        </div>
        <div className="loginUpForm">
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
                type="password"
                className="form-control"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <button type="submit" className="btn btn-success">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
