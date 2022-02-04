import React, {useState} from "react";
import { Link} from "react-router-dom";
import logo from "../assets/Logo.png";

import "./header.css"

const Header = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="brand logo" />
          </Link>
          {props.children}
        </div>
      </nav>
    </div>
  );
};

export default Header;
