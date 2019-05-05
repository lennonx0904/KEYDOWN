import React from "react";
import { connect } from "react-redux";
import {
  showLoginForm,
  showSignUpForm,
  showMobileButtons
} from "../../actions/showingActions";
import { logOut } from "../../actions/authActions";

class NavButtonsMobile extends React.Component {
  renderLogInAndSignUpBtn = () => {
    const { showLoginForm, showSignUpForm, showMobileButtons } = this.props;
    return (
      <>
        <button
          className="mobile-btn"
          onClick={() => {
            showMobileButtons(false);
            showLoginForm(true);
          }}
        >
          Log In
        </button>
        <button
          className="mobile-btn"
          onClick={() => {
            showMobileButtons(false);
            showSignUpForm(true);
          }}
        >
          Sign Up
        </button>
      </>
    );
  };

  renderLogOutBtn = () => {
    return (
      <>
        <button className="mobile-btn" onClick={this.props.logOut}>
          Log Out
        </button>
      </>
    );
  };

  render() {
    const { auth } = this.props;
    return (
      <>
        <div className="mobile-buttons">
          {auth.uid ? this.renderLogOutBtn() : this.renderLogInAndSignUpBtn()}
        </div>
      </>
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
  { showLoginForm, showSignUpForm, logOut, showMobileButtons }
)(NavButtonsMobile);
