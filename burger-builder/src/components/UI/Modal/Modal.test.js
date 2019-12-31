import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";
import Modal from "./Modal";
import Backdrop from "../Backdrop/Backdrop";

configure({ adapter: new Adapter() });

describe("<Modal />", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = mount(<Modal show={false} hide={() => {}} />);
  });
  it("should show <Modal /> if show props is true", () => {
    wrapper.setProps({ show: true });
    // expect(wrapper.find({ show: true })).toHaveLength(1);
    expect(
      wrapper.contains(
        <div
          className="Modal"
          style={{
            transform: "translateY(0)",
            opacity: "1"
          }}
        ></div>
      )
    ).toEqual(true);
  });
  it("should hide <Modal /> if show props is false", () => {
    expect(
      wrapper.contains(
        <div
          className="Modal"
          style={{
            transform: "translateY(-100vh)",
            opacity: "0"
          }}
        ></div>
      )
    ).toEqual(true);
  });
});
