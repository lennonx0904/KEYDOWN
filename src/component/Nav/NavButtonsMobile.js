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

  render() {
    console.log("mobile btn props", this.props);
    const { auth, logOut } = this.props;
    return (
      <>
        <div className="mobile-buttons">
          {auth.uid ? (
            <button className="mobile-btn" onClick={logOut()}>
              Log Out
            </button>
          ) : (
            this.renderLogInAndSignUpBtn()
          )}
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
