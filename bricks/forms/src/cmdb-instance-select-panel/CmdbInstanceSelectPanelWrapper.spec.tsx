import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";

import { InstanceApi } from "@sdk/cmdb-sdk";
import { FormItemWrapper } from "@next-libs/forms";

import { CmdbInstanceSelectPanelWrapper } from "./CmdbInstanceSelectPanelWrapper";

jest.mock("@sdk/cmdb-sdk");

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
    jest.spyOn(InstanceApi, "postSearch").mockResolvedValue({
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
