import React from "react";
import PropTypes from "prop-types";
import Logo from "../../UI/Logo/Logo";
import "./SideDrawer.css";
import ItemList from "../ItemList/ItemList";
import Backdrop from "../../UI/Backdrop/Backdrop";

SideDrawer.propTypes = {
  hideHandler: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

function SideDrawer(props) {
  const attachedClass = `SideDrawer ${props.show ? "Open" : "Close"}`;
  return (
    <>
      <div className={attachedClass}>
        <Logo height="11%" />
        <nav>
          <ItemList></ItemList>
        </nav>
      </div>

      <Backdrop show={props.show} hide={props.hideHandler} />
    </>
  );
}

export default SideDrawer;
