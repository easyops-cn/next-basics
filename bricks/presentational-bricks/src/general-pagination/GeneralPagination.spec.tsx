import React from "react";
import { shallow, mount } from "enzyme";
import { GeneralPagination } from "./GeneralPagination";

describe("GeneralPagination", () => {
  it("should work", () => {
    const handleOnChange = jest.fn();
    const onShowSizeChange = jest.fn();
    const wrapper = shallow(
      <GeneralPagination
        page={1}
        pageSize={20}
        total={50}
        handleOnChange={handleOnChange}
        onShowSizeChange={onShowSizeChange}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should handleOnChange to have been called ", () => {
    const handleOnChange = jest.fn();
    const onShowSizeChange = jest.fn();
    const wrapper = mount(
      <GeneralPagination
        page={1}
        pageSize={20}
        total={50}
        handleOnChange={handleOnChange}
        onShowSizeChange={onShowSizeChange}
      />
    );
    wrapper
      .find("Pager")
      .at(1)
      .simulate("click");
    expect(handleOnChange).toHaveBeenCalled();
  });
});
