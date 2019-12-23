import React, { useRef } from "react";
import "./Layout.css";

const Layout = props => {
  const counter = useRef(0);
  console.log("Layout rendered: ", counter.current++);
  return (
    <>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className="Content">{props.children}</main>
    </>
  );
};

export default Layout;
