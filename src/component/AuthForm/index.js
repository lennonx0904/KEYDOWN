import React from "react";
import { connect } from "react-redux";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginFrom";
import "./index.css";

class AuthForm extends React.Component {
  render() {
    console.log('AuthForm props---',this.props);
    
    return (
      <div className="auth-view">
        {this.props.signUpForm && <SignUpForm />}
        {this.props.loginForm && <LoginForm />}
      </div>
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
