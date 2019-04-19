import React from "react";
import Logo from './Logo';
import NavButtons from './NavButtons';

import "./Nav.css";

class Nav extends React.Component {
  render() {
    return (
    <div className="nav-bar">
        <Logo/>
        <NavButtons/>
    </div>
    );
  }
}

export default Nav;
