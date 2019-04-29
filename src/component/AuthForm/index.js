import React from "react";
import { connect } from "react-redux";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginFrom";
import "./index.css";

class AuthForm extends React.Component {
  render() {
    return (
      <>
        {this.props.signUpForm && <SignUpForm />}
        {this.props.loginForm && <LoginForm />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginForm: state.loginForm,
    signUpForm: state.signUpForm
  };
};

export default connect(mapStateToProps)(AuthForm);
