import React from "react";
import { connect } from "react-redux";
import { showLoginForm,showSignUpForm } from "../../actions";

class NavButtons extends React.Component {
  render() {
    //   console.log(this.props)
    return (          
      <div className="buttons">
        <div className="log-in nav-button" onClick={this.props.showLoginForm}>
          Log In
        </div>
        <div className="sigh-in nav-button" onClick={this.props.showSignUpForm}>Sign Up</div>
        <div className="log-out nav-button none">Log Out</div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
    // console.log(state);
    
  return { showLoginForm: state.showLoginForm };
};

export default connect(
  mapStatetoProps,
  { showLoginForm,showSignUpForm }
)(NavButtons);
