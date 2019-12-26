import React from "react";
import "./ItemList.css";
import Item from "./Item/Item";

const ItemList = props => (
  <ul className="ItemList">
    <Item exact={true} link="/">
      Burger Builder
    </Item>
    <Item link="/orders">Orders</Item>
  </ul>
);

export default ItemList;
