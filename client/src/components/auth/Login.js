import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.auth.isAuthenticated &&
      nextProps.auth.user.indexNo !== "00000000"
    ) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      indexNo: this.state.indexNo,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="loginUpWindow">
        <div className="loginUpHeader">
          <h1>Login</h1>
        </div>
        <div className="loginUpForm">
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="text"
              name="indexNo"
              placeholder="Index Number"
              value={this.state.indexNo}
              onChange={this.onChange}
              error={errors.indexNo}
            />

            <TextFieldGroup
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <button type="submit" className="btn btn-success">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
