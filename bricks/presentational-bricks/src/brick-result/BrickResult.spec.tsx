import React from "react";
import { shallow } from "enzyme";
import { BrickResult, BrickResultStatus } from "./BrickResult";

describe("BrickResult", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickResult
        status={BrickResultStatus.Success}
        title="Success"
        illustrationsConfig={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work, with custom icon", () => {
    const wrapper = shallow(
      <BrickResult
        status={BrickResultStatus.Success}
        title="Success"
        icon="question"
        illustrationsConfig={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("empty should work", () => {
    const wrapper = shallow(
      <BrickResult status={BrickResultStatus.Empty} illustrationsConfig={{}} />
    );
    expect(wrapper.find("Result").prop("subTitle")).toBeUndefined();
  });
  it("should work with customize", () => {
    const wrapper = shallow(
      <BrickResult status={"illustrations"} illustrationsConfig={{}} />
    );
    expect(wrapper.find("Result").prop("status")).toBe("illustrations");
  });
});
