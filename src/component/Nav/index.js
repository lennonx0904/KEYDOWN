import React from "react";
import { connect } from "react-redux";
import Logo from "./Logo";
import NavButtons from "./NavButtons";
import "./index.css";
import { checkAuthState } from "../../actions/authActions";

class Nav extends React.Component {
  componentDidMount() {
    this.props.checkAuthState();
  }
  render() {
    console.log('Nav props----',this.props);
    
    return (
      <div className="nav-bar">
        <Logo />
        <NavButtons />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { checkAuthState }
)(Nav);
