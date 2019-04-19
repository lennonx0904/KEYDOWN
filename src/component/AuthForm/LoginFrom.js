import React from "react";
import { connect } from "react-redux";
import { hideLoginForm } from "../../actions";

class LoginForm extends React.Component {
  render() {
    return (
      <div className="auth-wrap">
        <div className="login-form">
          <i
            className="fas fa-times exit-btn"
            onClick={this.props.hideLoginForm}
          />
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
          <button className="submit-btn">Login</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { showLoginForm: state.showLoginForm };
};
export default connect(
  mapStateToProps,
  { hideLoginForm }
)(LoginForm);
