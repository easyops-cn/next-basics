import React from "react";
import { shallow } from "enzyme";
import { Link } from "@next-libs/basic-components";
import { DesktopCustom } from "./DesktopCustom";
import { PlusCircleFilled } from "@ant-design/icons";

describe("DesktopCustom", () => {
  it("should work", () => {
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();
    const handleClick = jest.fn();
    const handleAddClick = jest.fn();
    const name = "世界";
    const url = "/hello";
    const wrapper = shallow(
      <DesktopCustom
        name={name}
        url={url}
        onAddClick={handleAddClick}
        onClick={handleClick}
        showAddIcon={true}
        isFavorite={true}
      />
    );

    expect(wrapper.find("img").prop("src")).toBe("png-url");

    expect(wrapper.find(PlusCircleFilled).exists()).toBe(true);
    wrapper.find(PlusCircleFilled).invoke("onClick")({
      stopPropagation,
      preventDefault,
    } as any);
    expect(handleAddClick).toBeCalled();
    expect(stopPropagation).toBeCalled();
    expect(preventDefault).toBeCalled();

    wrapper.find(Link).invoke("onClick")({
      stopPropagation,
    } as any);
    expect(handleClick).toBeCalled();

    expect(stopPropagation).toHaveBeenCalledTimes(2);
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});
