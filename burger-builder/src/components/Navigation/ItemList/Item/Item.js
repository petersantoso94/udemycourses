import React from "react";
import "./Item.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Item = props => (
  <li className={`NavigationItem`}>
    <NavLink exact={props.exact} to={props.link} activeClassName="active">
      {props.children}
    </NavLink>
  </li>
);

Item.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
export default Item;
