import React from "react";
import { shallow, mount } from "enzyme";
import { GeneralPagination } from "./GeneralPagination";

describe("GeneralPagination", () => {
  it("should work", () => {
    const handleOnChange = jest.fn();
    const wrapper = shallow(
      <GeneralPagination
        page={1}
        pageSize={20}
        total={50}
        handleOnChange={handleOnChange}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should handleOnChange to have been called ", () => {
    const handleOnChange = jest.fn();
    const wrapper = mount(
      <GeneralPagination
        page={1}
        pageSize={20}
        total={50}
        handleOnChange={handleOnChange}
      />
    );
    // 选择 第三页
    wrapper.find("Pager").at(2).simulate("click");
    expect(handleOnChange).lastCalledWith(3, 20);
  });
});
