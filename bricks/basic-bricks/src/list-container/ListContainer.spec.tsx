import React from "react";
import { shallow } from "enzyme";
import { ListContainer } from "./ListContainer";

describe("ListContainer", () => {
  it("should work", () => {
    const wrapper = shallow(<ListContainer data={null} useBrick={null} />);
    expect(wrapper.html()).toBe(null);

    wrapper.setProps({
      data: ["正常", "异常"],
      useBrick: {
        brick: "span",
      },
    });
    expect(wrapper.find("BrickAsComponent").length).toBe(2);
    expect(wrapper.find("div").prop("style").gap).toBe(
      "var(--card-content-gap)"
    );
    expect(wrapper.find("div").hasClass("listContainerAsGrid")).toBe(true);

    wrapper.setProps({
      gap: 10,
      extraContainerStyle: {
        gridTemplateColumns: "1fr 400px",
      },
    });
    expect(wrapper.find("div").prop("style").gap).toBe(10);
    expect(wrapper.find("div").prop("style").gridTemplateColumns).toBe(
      "1fr 400px"
    );

    wrapper.setProps({
      containerStyle: {
        display: "flex",
      },
    });
    expect(wrapper.find("div").prop("style").display).toBe("flex");
    expect(wrapper.find("div").hasClass("listContainerAsGrid")).toBe(false);
  });
});
