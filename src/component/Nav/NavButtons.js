import React from "react";
import { connect } from "react-redux";
import { showLoginForm, showSignUpForm } from "../../actions";
import { logOut } from "../../actions/authActions";

class NavButtons extends React.Component {
  renderLogInAndSignUpBtn = () => {
    const { loginForm, signUpForm, showLoginForm, showSignUpForm } = this.props;
    return (
      <>
        <button
          className="log-in nav-button"
          onClick={() => {
            showLoginForm(true);
          }}
          disabled={signUpForm}
        >
          Log In
        </button>
        <button
          className="sigh-in nav-button"
          onClick={() => {
            showSignUpForm(true);
          }}
          disabled={loginForm}
        >
          Sign Up
        </button>
      </>
    );
  };

  renderLogOutBtn = () => {
    return (
      <>
        <button className="log-out nav-button" onClick={this.props.logOut}>
          Log Out
        </button>
      </>
    );
  };

  render() {
    return (
      <div className="buttons">
        {this.props.auth.uid
          ? this.renderLogOutBtn()
          : this.renderLogInAndSignUpBtn()}
        {/* {this.renderLogInAndSignUpBtn()}
        {this.renderLogOutBtn()} */}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    loginForm: state.loginForm,
    signUpForm: state.signUpForm
  };
};

export default connect(
  mapStatetoProps,
  { showLoginForm, showSignUpForm, logOut }
)(NavButtons);
