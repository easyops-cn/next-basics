import React from "react";
import { mount } from "enzyme";
import { Select, Checkbox } from "antd";
import { TypeItem } from "./TypeItem";
import { useContractModels } from "../../hooks/useContractModels";

jest.mock("@next-libs/basic-components", () => {
  return {
    Link: function Link() {
      return <div>Link</div>;
    },
  };
});

jest.mock("../../hooks/useContractModels", () => ({
  useContractModels: jest.fn().mockReturnValue([
    {
      q: "yy",
      modelList: [
        { name: "DeployType", namespaceId: "api.easyops.DeployType" },
      ],
    },
    jest.fn(),
    jest.fn,
  ]),
}));

jest.mock("../../constants", () => ({
  innerTypeList: [
    "string",
    "bool",
    "int",
    "int64",
    "float",
    "map",
    "object",
    "file",
  ],
}));

describe("TypeItem", () => {
  it("should work with simple type", () => {
    const props = {
      value: "string",
      onChange: jest.fn(),
    };
    const wrapper = mount(<TypeItem {...props} />);

    wrapper.find(Select).invoke("onChange")("boolean", null);
    expect(props.onChange).toHaveBeenCalledWith("boolean");

    wrapper.find(Select).invoke("onSearch")("object");

    jest.advanceTimersByTime(500);

    wrapper.find(Select).invoke("onChange")("DeployType", null);

    expect(props.onChange).toHaveBeenCalledWith("DeployType");

    wrapper.find(Checkbox).invoke("onChange")({ target: { checked: true } });

    expect(props.onChange).toHaveBeenCalledWith("DeployType[]");
  });

  it("should work with model type", () => {
    const mockChangeSizeFn = jest.fn();
    (useContractModels as jest.Mock).mockReturnValue([
      {
        q: "yy",
        modelList: [
          { name: "DeployType", namespaceId: "api.easyops.DeployType" },
        ],
      },
      jest.fn(),
      mockChangeSizeFn,
    ]);
    const props = {
      value: "DeployType",
      type: "model",
      onChange: jest.fn(),
    };
    const wrapper = mount(<TypeItem {...props} />);

    wrapper
      .find(Select)
      .prop("dropdownRender")(null)
      .props.children[1].props.onChange(100);

    expect(mockChangeSizeFn).toHaveBeenCalled();
  });
});
