import React from "react";
import "./Item.css";
import PropTypes from "prop-types";

const Item = props => (
  <li className={`NavigationItem`}>
    <a href={props.link} className={props.isActive ? "active" : ""}>
      {props.children}
    </a>
  </li>
);

Item.propTypes = {
  children: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired
};
export default Item;
