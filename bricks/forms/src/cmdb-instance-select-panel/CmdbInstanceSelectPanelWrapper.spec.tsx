import React from "react";
import { shallow } from "enzyme";

import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import { FormItemWrapper } from "@next-libs/forms";

import { CmdbInstanceSelectPanelWrapper } from "./CmdbInstanceSelectPanelWrapper";

jest.mock("@next-sdk/cmdb-sdk");

describe("CmdbInstanceSelectPanel", () => {
  const objectMap = {
    APP: {
      objectId: "APP",
      name: "应用",
      attrList: [
        {
          id: "name",
          name: "名称",
          value: {
            type: "str",
          },
        },
      ],
    },
  };

  it("should work", () => {
    (InstanceApi_postSearch as jest.Mock).mockResolvedValue({
      list: [
        {
          instanceId: "5c6d122b3c85f",
        },
      ],
    });

    const fn = jest.fn();
    const wrapper = shallow(
      <CmdbInstanceSelectPanelWrapper
        objectMap={objectMap}
        objectId={"APP"}
        instanceIdList={["5c6d122b3c85f"]}
        onChange={fn}
      />
    );
    const formItem = wrapper.find(FormItemWrapper).first();
    formItem.childAt(0).invoke("onChange")([]);
    expect(fn).toBeCalled();
  });
});
