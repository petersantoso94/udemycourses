import React from "react";
import "./Toolbar.css";
import Logo from "../../UI/Logo/Logo";
import ItemList from "../ItemList/ItemList";
import PropTypes from "prop-types";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = props => (
  <header className="Toolbar">
    <DrawerToggle showDrawer={props.showDrawer} />
    <Logo height="80%" />
    <nav className="DesktopOnly">
      <ItemList />
    </nav>
  </header>
);

Toolbar.propTypes = {
  showDrawer: PropTypes.func.isRequired
};

export default Toolbar;
