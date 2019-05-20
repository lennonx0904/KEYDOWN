import React from "react";
import { connect } from "react-redux";

import Logo from "./Logo";
import NavButtons from "./NavButtons";
import NavButtonsMobile from "./NavButtonsMobile";
import { showMobileButtons } from "../../actions/showingActions";
import { checkAuthState } from "../../actions/authActions";
import menu from "../../img/menu.png";
import "./nav.css";

class Nav extends React.Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    console.log('nav props', this.props);
    
    const { showing, showMobileButtons, auth } = this.props;
    return (
      <>
        <div className="nav-bar">
          <Logo />
          {auth.name ? <div className="greeting">Hi ! {auth.name}</div> : null}
          <button
            className="menu-button"
            disabled={showing.loginForm || showing.signUpForm}
            onClick={() => {
              let current = showing.mobileButtons;
              showMobileButtons(!current);
            }}
          >
            <img src={menu} alt="" />
          </button>
          <NavButtons />
        </div>
        {showing.mobileButtons ? <NavButtonsMobile /> : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log('nav state', state);  
  return {
    auth: state.auth,
    showing: state.showing
  };
};

export default connect(
  mapStateToProps,
  { checkAuthState, showMobileButtons }
)(Nav);
