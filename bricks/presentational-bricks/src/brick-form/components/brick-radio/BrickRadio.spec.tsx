import React from "react";
import { shallow } from "enzyme";
import { LegacyBrickRadio } from "./BrickRadio";

const onChange = jest.fn();

describe("BrickRadio", () => {
  it("should work when componentType undefined", () => {
    const wrapper = shallow(
      <LegacyBrickRadio
        optionList={[{ text: "dev", id: "bd2b" }]}
        onChange={onChange}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it("should work when componentType is 'Button'", () => {
    const wrapper = shallow(
      <LegacyBrickRadio
        componentType="Button"
        optionList={[
          { text: "dev", id: "bd2b" },
          { text: "test", id: "sb3" },
        ]}
        onChange={onChange}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it("should work when componentType is 'Radio'", () => {
    const wrapper = shallow(
      <LegacyBrickRadio
        componentType="Radio"
        optionList={[
          { text: "dev", id: "bd2b" },
          { text: "test", id: "sb3" },
        ]}
        onChange={onChange}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it("should trigger change event", () => {
    const wrapper = shallow(
      <LegacyBrickRadio
        componentType="Radio"
        optionList={[
          { text: "dev", id: "bd2b" },
          { text: "test", id: "sb3" },
        ]}
        onChange={onChange}
      />
    );
    wrapper.simulate("change", { target: 1 });
    expect(onChange).toHaveBeenCalled();
  });
});
