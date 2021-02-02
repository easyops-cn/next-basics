import React from "react";
import { shallow, mount } from "enzyme";
import { InstanceSelector } from "./BrickInstanceSelector";

describe("BrickInstanceSelector", () => {
  it("should work", () => {
    const wrapper = shallow(
      <InstanceSelector
        optionList={[]}
        instanceList={{ columns: [] }}
        onChange={jest.fn}
        dispatchCustomEvent={jest.fn}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it("add button should work", () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <InstanceSelector
        optionList={null}
        instanceList={{ columns: [] }}
        onChange={onChange}
        dispatchCustomEvent={jest.fn}
      />
    );
    wrapper.find("Button").simulate("click");
    wrapper.setProps({ optionList: [{ name: "hello", instanceId: "id" }] });
    expect(onChange).toBeCalled();
    wrapper.find("Button").simulate("click");
  });
});
