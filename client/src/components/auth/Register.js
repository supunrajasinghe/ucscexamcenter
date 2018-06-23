import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
                type="email"
                name="email"
                placeholder="Index email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />

              <TextFieldGroup
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />

              <TextFieldGroup
                type="password"
                name="password2"
                placeholder="confirm password"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />
              <button type="submit" className="btn btn-success">
                SUBMIT
              </button>
            </form>
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
