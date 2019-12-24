import React, { useRef, useState, useCallback } from "react";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const counter = useRef(0);
  console.log("Layout rendered: ", counter.current++);

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawerHandler = useCallback(() => {
    setShowDrawer(prev => !prev);
  }, []);
  const hideDrawerHandler = useCallback(() => {
    setShowDrawer(false);
  }, []);
  return (
    <>
      <Toolbar showDrawer={toggleDrawerHandler} />
      <SideDrawer hideHandler={hideDrawerHandler} show={showDrawer} />
      <main className="Content">{props.children}</main>
    </>
  );
};

export default Layout;
