import React from "react";
import PropTypes from "prop-types";
import "./DrawerToggle.css";

DrawerToggle.propTypes = {
  showDrawer: PropTypes.func.isRequired
};

function DrawerToggle(props) {
  return (
    <div className="DrawerToggle" onClick={props.showDrawer}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default DrawerToggle;
