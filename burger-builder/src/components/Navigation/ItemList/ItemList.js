import React from "react";
import "./ItemList.css";
import Item from "./Item/Item";

const ItemList = props => (
  <ul className="ItemList">
    <Item isActive={true} link="/">
      Burger Builder
    </Item>
    <Item isActive={false} link="/checkout">
      Checkout
    </Item>
  </ul>
);

export default ItemList;
