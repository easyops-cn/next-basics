import React from "react";
import { shallow } from "enzyme";
import { AgentStatus } from "./AgentStatus";
import { AgentStatusType } from "./index";

describe("AgentStatus", () => {
  it("should work", () => {
    const wrapper = shallow(<AgentStatus value={AgentStatusType.NORMAL} />);
    expect(
      wrapper.find("BrickValueMapping").first().prop("showTagCircle")
    ).toBe(true);
  });
});
