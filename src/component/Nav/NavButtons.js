import React from "react";
import { connect } from "react-redux";

import { showLoginForm, showSignUpForm } from "../../actions/showingActions";
import { logOut } from "../../actions/authActions";

class NavButtons extends React.Component {
  renderLogInAndSignUpBtn = () => {
    const { showing, showLoginForm, showSignUpForm } = this.props;
    return (
      <>
        <button
          className="log-in nav-button"
          onClick={() => {
            showLoginForm(true);
          }}
          disabled={showing.signUpForm}
        >
          Log In
        </button>
        <button
          className="sigh-in nav-button"
          onClick={() => {
            showSignUpForm(true);
          }}
          disabled={showing.loginForm}
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
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    showing: state.showing
  };
};

export default connect(
  mapStatetoProps,
  { showLoginForm, showSignUpForm, logOut }
)(NavButtons);
