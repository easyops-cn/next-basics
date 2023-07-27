import React from "react";
import { shallow } from "enzyme";
import { BrickAlertStatus } from "./BrickAlertStatus";
import { BrickValueMapping } from "../brick-value-mapping/BrickValueMapping";

describe("BrickAlertStatus", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickAlertStatus status={0} recoverType="" isRecover={false} />
    );
    let valueMapping = wrapper.find(BrickValueMapping).first();
    expect(valueMapping.prop("value")).toBe(0);

    wrapper.setProps({ status: 0, recoverType: "", isRecover: true });
    valueMapping = wrapper.find(BrickValueMapping).first();
    expect(valueMapping.prop("value")).toBe(2);

    wrapper.setProps({ status: 0, recoverType: "manual", isRecover: true });
    valueMapping = wrapper.find(BrickValueMapping).first();
    expect(valueMapping.prop("value")).toBe("manualRecover");
  });
});
