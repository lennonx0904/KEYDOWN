import React from "react";
import { connect } from "react-redux";
import { hideSignUpForm } from "../../actions";
import firebase from "../../actions/firebase";

const initState = {
  userName: "",
  email: "",
  password: "",
  comfirmPassword: ""
};

class SignUpForm extends React.Component {
  state = { ...initState };

  changeInputState = e => {
    console.log(e.target.name);
    console.log(e.currentTarget.value);

    this.setState({ [e.target.name]: e.target.value });
  };

  signUpHandler = () => {
    const { userName, email, password, comfirmPassword } = this.state;
    if (userName === "") {
      alert("Please enter your name.");
      return;
    }
    if (password !== comfirmPassword) {
      alert("Please comfirm your password.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        alert(error.message);
      })
      .then(
        alert("ye")
        // this.setState({ ...initState })
      );
  };

  render() {
    // console.log(this.state);

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
          <button className="submit-btn" onClick={this.signUpHandler}>
            Sigh Up
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("this", this);

  console.log(state);

  return { signUpForm: state.signUpForm };
};

export default connect(
  mapStateToProps,
  { hideSignUpForm }
)(SignUpForm);
