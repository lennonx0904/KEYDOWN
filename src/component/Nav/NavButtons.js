import React from "react";
import { connect } from "react-redux";
import { showLoginForm, showSignUpForm } from "../../actions";

class NavButtons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <button
          className="log-in nav-button"
          onClick={() => {
            this.props.showLoginForm(true);
          }}
          disabled={this.props.signUpForm}
        >
          Log In
        </button>
        <button
          className="sigh-in nav-button"
          onClick={() => {
            this.props.showSignUpForm(true);
          }}
          disabled={this.props.loginForm}
        >
          Sign Up
        </button>

        <div className="log-out nav-button none">Log Out</div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  // console.log(state);

  return {
    loginForm: state.loginForm,
    signUpForm: state.signUpForm
  };
};

export default connect(
  mapStatetoProps,
  { showLoginForm, showSignUpForm }
)(NavButtons);
