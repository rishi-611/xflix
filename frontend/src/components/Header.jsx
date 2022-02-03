import React from "react";
import { Link} from "react-router-dom";
import logo from "../assets/Logo.png";

import "./header.css"

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="brand logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex ms-auto me-auto">
              <input
                id="search-input"
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button id="search-input-submit" className="btn btn-danger" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <button id="upload-btn" className="btn btn-danger" type="button">
                  Upload <i className="fas fa-upload"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
