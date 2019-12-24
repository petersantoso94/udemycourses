import React from "react";
import logo from "../../../assets/burger.png";
import "./Logo.css";
import PropTypes from "prop-types";

const Logo = props => (
  <div className="Logo" style={{ height: props.height }}>
    <img src={logo} alt="myburger" />
  </div>
);

Logo.propTypes = {
  height: PropTypes.string
};
export default Logo;
