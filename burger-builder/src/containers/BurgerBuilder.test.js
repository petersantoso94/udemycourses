import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Burger from "../components/Burger/Burger";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder ingredients={{ SALAD: 1 }} price={0} />);
  });
  it("should render <BuildControls /> when receiving ingredients", () => {
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
  it("should render <Burger /> when receiving ingredients", () => {
    expect(wrapper.find(Burger)).toHaveLength(1);
  });
});
