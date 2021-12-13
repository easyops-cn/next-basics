import React from "react";
import { shallow } from "enzyme";
import { Card } from "antd";
import { Reflection } from "typedoc/dist/lib/serialization/schema";
import { ProviderDoc } from "./ProviderDoc";
import { ProcessedProviderDoc } from "../provider-provider-doc/interfaces";
import { GeneralReference } from "./GeneralReference/GeneralReference";

describe("ProviderDoc", () => {
  it("should work", () => {
    const docData: ProcessedProviderDoc = {
      serviceId: "cmdb",
      brickName: "cmdb-object-api-get-detail",
      comment: "获取模型详情",
      parameters: [],
      endpoint: "GET api/cmdb",
      returns: {
        type: "reference",
      },
      usedReferenceIds: [1],
      references: new Map<number, Reflection>([
        [
          1,
          {
            kindString: "Interface",
          } as any,
        ],
      ]),
    };
    const wrapper = shallow(<ProviderDoc docData={docData} showCard={true} />);
    expect(wrapper.find(Card).prop("title")).toBe("获取模型详情");
    expect(wrapper.find(GeneralReference).length).toBe(1);
    wrapper.setProps({
      showCard: false,
    });
    wrapper.update();
    expect(wrapper.find(Card).length).toBe(0);
  });
});
