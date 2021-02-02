import React from "react";
import { shallow } from "enzyme";
import { GeneralLabel } from "./GeneralLabel";

describe("GeneralLabel", () => {
  it("should work", () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <GeneralLabel
        prefixIcon={{
          lib: "antd",
          type: "book",
          theme: "filled"
        }}
        suffixIcon={{
          lib: "antd",
          type: "file-search",
          theme: "outlined"
        }}
        text="1.0.0"
        handleClick={handleClick}
      />
    );
    expect(wrapper.find("GeneralIcon").length).toBe(2);
    expect(wrapper.find("Link").length).toBe(0);
    wrapper.setProps({
      url: "/template/1",
      prefixIcon: undefined
    });
    wrapper.update();
    expect(wrapper.find("GeneralIcon").length).toBe(1);
    expect(wrapper.find("Link").length).toBe(1);
    wrapper.find(".labelWrapper").simulate("click");
    expect(handleClick).toHaveBeenCalled();
  });
});
