import React from "react";
import { shallow } from "enzyme";
import { SearchComponent } from "./SearchComponent";
import { Input } from "antd";

describe("SearchComponent", () => {
  it("should work", () => {
    const onSearch = jest.fn();
    const wrapper = shallow(
      <SearchComponent
        placeholder="Search data"
        onSearch={onSearch}
        defaultValue="um"
      />
    );
    expect(wrapper.find(Input).prop("value")).toBe("um");
    wrapper.find(Input).invoke("onChange")({
      target: {
        value: "query",
      },
    } as React.ChangeEvent<HTMLInputElement>);
    expect(onSearch).toBeCalledWith("query");
  });
});
