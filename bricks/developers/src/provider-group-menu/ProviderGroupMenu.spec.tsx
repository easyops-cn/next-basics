import React from "react";
import { shallow } from "enzyme";
import { LeftOutlined } from "@ant-design/icons";
import { ProviderGroupMenu } from "./ProviderGroupMenu";

describe("ProviderGroupMenu", () => {
  it("should work", () => {
    const props = {
      itemList: [
        "providers-of-admin.nameservice-api-list-name-service",
        "providers-of-admin.agent-management-api-get-agent-status",
        "providers-of-admin.nameservice-api-get-name-service",
      ],
      onFold: jest.fn(),
    };
    const wrapper = shallow(<ProviderGroupMenu {...props} />);

    expect(wrapper.find(".item").length).toEqual(3);
    expect(wrapper.find(LeftOutlined).length).toEqual(0);

    wrapper.find(".customIcon").invoke("onClick")(null);

    wrapper.update();

    expect(wrapper.find(LeftOutlined).length).toEqual(1);
  });
});
