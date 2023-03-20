import React from "react";
import PropTypes from "prop-types";
import vyn_logo from "../assets/vyn-logo.png";
const FormBuilderHeader = (props) => {
  // const handle
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <a className="d-flex align-items-center navbar-brand" href="#">
        <img src={vyn_logo} alt="" height="32"></img>
        </a>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button>New Storyboard</button>
            </li>
            <li className="nav-item">
              <button>Import Storyboard</button>
            </li>
            <li className="nav-item">
              <button>Export Storyboard</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

FormBuilderHeader.propTypes = {};

export default FormBuilderHeader;
