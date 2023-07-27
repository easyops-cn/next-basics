import React from "react";
import { shallow, mount } from "enzyme";
import { DynamicGridContainer } from "./DynamicGridContainer";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";

describe("DynamicGridContainer", () => {
  it("should work", () => {
    const wrapper = shallow(<DynamicGridContainer />);
    expect(wrapper.find("div").length).toBe(1);
  });

  it("useBrick should work", () => {
    const useBrick: UseBrickConf = [
      {
        brick: "div",
      },
      {
        brick: "div",
      },
    ];
    const data = ["test", "xxx"];
    const wrapper = shallow(
      <DynamicGridContainer useBrick={useBrick} data={data} />
    );
    expect(wrapper.find(BrickAsComponent).length).toBe(2);
    expect(wrapper.find(".dynamicGridContainer").length).toBe(1);
    wrapper.setProps({
      containerStyle: {
        gridTemplateColumns: "1fr 400px",
      },
    });
    expect(wrapper.find("div").prop("style").gridTemplateColumns).toBe(
      "1fr 400px"
    );
    wrapper.setProps({
      data: "aa",
    });
    expect(wrapper.find(BrickAsComponent).at(0).prop("data")).toBe("aa");
  });
  it("should work and onRendered", () => {
    const useBrick: UseBrickConf = [
      {
        brick: "div",
      },
      {
        brick: "div",
      },
    ];
    const data = ["test", "xxx"];
    const onRendered = jest.fn();
    const wrapper = mount(
      <DynamicGridContainer
        useBrick={useBrick}
        data={data}
        onRendered={onRendered}
      />
    );
    wrapper.find(DynamicGridContainer).invoke("onRendered")(data);
    expect(onRendered).toBeCalledWith(["test", "xxx"]);
  });
});
