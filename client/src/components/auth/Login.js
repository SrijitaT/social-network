import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("login", login);
    this.props.loginUser(login);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (props.errors) {
      return { errors: props.errors };
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Developer's-World account
              </p>
              <form onSubmit={e => this.onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.onChange(e)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.onChange(e)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
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
)(withRouter(Login));
