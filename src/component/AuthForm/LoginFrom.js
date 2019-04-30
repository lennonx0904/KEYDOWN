import React from "react";
import { connect } from "react-redux";
import { showLoginForm } from "../../actions";
import { logIn } from "../../actions/authActions";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  changeInputState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.logIn(this.state);
  };

  renderForm = () => {
    return (
      <div className="auth-view">
      <div className="auth-wrap">
        <form className="login-form" onSubmit={this.submitHandler}>
          <i
            className="fas fa-times exit-btn"
            onClick={() => {
              this.props.showLoginForm(false);
            }}
          />
          <div>
            <label>E-mail</label>
            <br />
            <input type="text" name="email" onChange={this.changeInputState} />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              onChange={this.changeInputState}
            />
          </div>
          <button className="submit-btn">Login</button>
          <div>{this.props.auth.authError ? <p>{this.props.auth.authError}</p> : null}</div>
        </form>
      </div>
      </div>
    );
  };

  render() {
    return <>{this.props.auth.uid ? null : this.renderForm()}</>;
  }
}
const mapStateToProps = state => {
  return { loginForm: state.loginForm, auth: state.auth };
};
export default connect(
  mapStateToProps,
  { showLoginForm, logIn }
)(LoginForm);
