import React from "react";
import { mount, shallow } from "enzyme";
import { AutoComplete } from "antd";
import {
  ContractAutoComplete,
  ContractAutoCompleteLegacyWrapper,
} from "./ContractAutoComplete";
import { useContract } from "./useContract";
import { FormItemWrapper } from "@next-libs/forms";

jest.mock("./useContract");

(useContract as jest.Mock).mockReturnValue([
  [
    {
      name: "postSearch",
      version: "1.0.0",
      namespaceId: "cmdb.instance",
    },
  ],
]);

describe("ContractSelect", () => {
  it("should work", () => {
    const changeFn = jest.fn();
    const wrapper = mount(
      <ContractAutoComplete
        value="cmdb.instance@postSearch:1.0.0"
        onChange={changeFn}
      />
    );

    wrapper.find(AutoComplete).invoke("onChange")(
      "cmdb.instance@getDetail:1.0.0",
      null
    );
    expect(changeFn).toHaveBeenCalledWith("cmdb.instance@getDetail:1.0.0");

    wrapper.find(AutoComplete).invoke("onSearch")("getDetail");

    jest.advanceTimersByTime(500);

    expect(useContract).toHaveBeenLastCalledWith({
      pageSize: 20,
      q: "getDetail",
    });
  });

  it("should render ContractAutoCompleteLegacyWrapper", () => {
    const wrapper = shallow(<ContractAutoCompleteLegacyWrapper />);

    expect(wrapper.find(FormItemWrapper).length).toEqual(1);
  });
});
