import React from "react";
import { connect } from "react-redux";
import { hideSignUpForm } from "../../actions";

class SignUpForm extends React.Component {
  render() {
    return (
      <div className="auth-wrap">
        <div className="signup-form ">
          <i
            className="fas fa-times exit-btn"
            onClick={this.props.hideSignUpForm}
          />
          <div>
            <label>Name</label>
            <br />
            <input type="text" />
          </div>
          <div>
            <label>E-mail</label>
            <br />
            <input type="text" />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input type="password" />
          </div>
          <div>
            <label>Comfirm Your Password</label>
            <br />
            <input type="password" />
          </div>
          <button className="submit-btn">Sigh Up</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { showSignUpForm: state.showLoginForm };
};

export default connect(
  mapStateToProps,
  { hideSignUpForm }
)(SignUpForm);
