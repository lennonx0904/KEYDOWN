import React from "react";
import { connect } from "react-redux";
import { showSignUpForm } from "../../actions/showingActions";
import { signUp } from "../../actions/authActions";

class SignUpForm extends React.Component {
  state = {
    userName: "",
    email: "",
    password: "",
    comfirmPassword: ""
  };

  changeInputState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  rendersSignupForm = () => {
    return (
      <div className="auth-view">
        <div className="auth-wrap">
          <form className="signup-form" onSubmit={this.submitHandler}>
            <i
              className="fas fa-times exit-btn"
              onClick={() => {
                this.props.showSignUpForm(false);
              }}
            />
            <div>
              <label>Name</label>
              <br />
              <input
                type="text"
                name="userName"
                value={this.state.userName}
                onChange={this.changeInputState}
              />
            </div>
            <div>
              <label>E-mail</label>
              <br />
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.changeInputState}
              />
            </div>
            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.changeInputState}
              />
            </div>
            <div>
              <label>Comfirm Your Password</label>
              <br />
              <input
                type="password"
                name="comfirmPassword"
                value={this.state.comfirmPassword}
                onChange={this.changeInputState}
              />
            </div>
            <button className="submit-btn">Sigh Up</button>
            <div>
              {this.props.auth.authError ? (
                <p>{this.props.auth.authError}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  };

  render() {
    return <>{this.props.auth.uid ? null : this.rendersSignupForm()}</>;
  }
}

const mapStateToProps = state => {
  return { signUpForm: state.signUpForm, auth: state.auth };
};

export default connect(
  mapStateToProps,
  { showSignUpForm, signUp }
)(SignUpForm);
