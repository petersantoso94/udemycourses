import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import ItemList from "./ItemList";
import Item from "./Item/Item";

configure({ adapter: new Adapter() });

describe("<ItemList />", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<ItemList />);
  });
  it("should render 2 <Item />", () => {
    expect(wrapper.find(Item)).toHaveLength(2);
  });
  it("should render 1 burger builder of <Item />", () => {
    // const wrapper = shallow(<ItemList />);
    expect(
      wrapper.contains(
        <Item exact={true} link="/">
          Burger Builder
        </Item>
      )
    ).toEqual(true);
  });

  it("should render 1  orders of <Item />", () => {
    expect(wrapper.contains(<Item link="/orders">Orders</Item>)).toEqual(true);
  });
});
