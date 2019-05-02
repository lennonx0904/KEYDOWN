import React from "react";
import { connect } from "react-redux";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import "./authForm.css";

class AuthForm extends React.Component {
  render() {
    const { signUpForm, loginForm } = this.props.showing;
    return (
      <>
        {signUpForm && <SignUpForm />}
        {loginForm && <LoginForm />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    showing: state.showing
  };
};

export default connect(mapStateToProps)(AuthForm);
