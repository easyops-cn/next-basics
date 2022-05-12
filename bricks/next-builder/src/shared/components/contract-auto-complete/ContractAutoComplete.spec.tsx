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
      fullContractName: "cmdb.instance@postSearch",
      version: ["1.0.0"],
    },
    {
      fullContractName: "cmdb.instance@getDetail",
      version: ["1.3.0", "1.2.0", "1.0.0"],
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

    wrapper.find(AutoComplete).at(0).invoke("onChange")(
      "cmdb.instance@customApi",
      null
    );

    expect(changeFn).toHaveBeenCalledWith("cmdb.instance@customApi:");

    wrapper.find(AutoComplete).at(0).invoke("onChange")(
      "cmdb.instance@getDetail",
      null
    );
    expect(changeFn).toHaveBeenCalledWith("cmdb.instance@getDetail:1.3.0");

    wrapper.find(AutoComplete).at(0).invoke("onSearch")("getDetail");

    jest.advanceTimersByTime(500);

    expect(useContract).toHaveBeenLastCalledWith({
      pageSize: 20,
      q: "getDetail",
    });

    wrapper
      .find("ForwardRef(AutoComplete)")
      .at(0)
      .prop("dropdownRender")()
      .props.children[1].props.onBlur(10);

    expect(useContract).toHaveBeenLastCalledWith({
      pageSize: 10,
      q: "getDetail",
    });

    wrapper.find(AutoComplete).at(1).invoke("onChange")("1.0.0", null);
    expect(changeFn).toHaveBeenCalledWith("cmdb.instance@getDetail:1.0.0");
  });

  it("should render ContractAutoCompleteLegacyWrapper", () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<ContractAutoCompleteLegacyWrapper />);

    expect(wrapper.find(FormItemWrapper).length).toEqual(1);

    wrapper.find(FormItemWrapper).prop("validator")(
      null,
      "cmdb.instance@getDetail:1.0.0",
      mockFn
    );
    expect(mockFn.mock.calls[0][0]).toEqual(undefined);

    wrapper.find(FormItemWrapper).prop("validator")(
      null,
      "cmdb.instance@getDetail",
      mockFn
    );
    expect(mockFn.mock.calls[1][0]).toEqual(
      "next-builder:CONTRACT_VALIDATE_MESSAGE"
    );
  });
});
