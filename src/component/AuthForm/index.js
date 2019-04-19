import React from "react";
import { connect } from "react-redux";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginFrom";
import "./index.css";

class AuthForm extends React.Component {
  render() {
    return (
      <div className="auth-view">
        {this.props.showSignUpForm && <SignUpForm />}
        {this.props.showLoginForm && <LoginForm />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoginForm: state.showLoginForm,
    showSignUpForm: state.showSignUpForm
  };
};

export default connect(mapStateToProps)(AuthForm);
