import React from "react";
import { mount } from "enzyme";
import { Select } from "antd";
import { RefItem } from "./RefItem";
import { useContractModels } from "../../hooks/useContractModels";
import { fecthModelData } from "../../hooks/useCurModel";

jest.mock("../../hooks/useContractModels");
jest.mock("../../hooks/useCurModel");

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
  modelRefCache: new Map([["DeployType", "api.easyops.DeployType"]]),
}));
describe("RefItem", () => {
  it("should work", async () => {
    const mockSetQFn = jest.fn();
    (useContractModels as jest.Mock).mockReturnValue([
      {
        q: "yy",
        modelList: [
          { name: "Host", namespaceId: "api.easyops.host" },
          {
            name: "DeployType",
            namespaceId: "api.easyops.DeployType",
            fields: [{ name: "name", type: "string" }],
          },
        ],
      },
      mockSetQFn,
    ]);

    (fecthModelData as jest.Mock).mockReturnValue({
      q: "yy",
      modelList: [
        { name: "Host", namespaceId: "api.easyops.host" },
        {
          name: "DeployType",
          namespaceId: "api.easyops.DeployType",
          fields: [{ name: "name", type: "string" }],
        },
      ],
    });

    const props = {
      value: "DeployType",
      onChange: jest.fn(),
    };
    const wrapper = mount(<RefItem {...props} />);

    wrapper.find(Select).at(0).invoke("onChange")("DeployType", null);

    expect(props.onChange).toHaveBeenCalledWith("DeployType.");

    wrapper.find(Select).at(0).invoke("onSearch")("object");

    jest.advanceTimersByTime(500);

    expect(mockSetQFn).toHaveBeenCalled();

    wrapper.find(Select).at(1).invoke("onChange")("name", null);

    expect(props.onChange).toHaveBeenLastCalledWith("DeployType.name");
  });
});
