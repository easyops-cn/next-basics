import React from "react";
import { mount } from "enzyme";
import { RefRequiredItem } from "./RefRequiredItem";
import { useCurModel } from "../../hooks/useCurModel";
import { Select } from "antd";

jest.mock("../../hooks/useCurModel");

describe("FieldRequiredItem", () => {
  const mockSetName = jest.fn();
  (useCurModel as jest.Mock).mockReturnValue([
    {
      name: "flowData",
      modelData: {
        name: "FlowData",
        namespaceId: "api.easyops.FlowData",
        fields: [{ name: "a" }, { name: "b" }],
      },
    },
    mockSetName,
  ]);
  it("should work", () => {
    const props = {
      model: "FlowData",
      onChange: jest.fn(),
    };
    const wrapper = mount(<RefRequiredItem {...props} />);
    wrapper.find(Select).invoke("onChange")(["a"], null);
    expect(props.onChange).toHaveBeenCalledWith(["a"]);
  });
});
