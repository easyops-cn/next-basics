import React from "react";
import { shallow } from "enzyme";
import { BrickLink, BrickLinkProps } from "./BrickLink";
import { GeneralIcon } from "@next-libs/basic-components";

jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("BrickLink", () => {
  it("should work", () => {
    const wrapper = shallow<BrickLinkProps>(
      <BrickLink
        native={true}
        label="aaa"
        url="/url"
        tooltip="tips.."
        icon={{
          lib: "antd",
          theme: "outlined",
          type: "file-search",
        }}
      />
    );

    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      native: false,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('target="_blank" should have external-link icon', () => {
    const wrapper = shallow<BrickLinkProps>(
      <BrickLink label="aaa" url="/url" target="_blank" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when disabled", () => {
    const wrapper = shallow<BrickLinkProps>(
      <BrickLink
        label="aaa"
        disabled={true}
        icon={{
          lib: "antd",
          theme: "outlined",
          type: "file-search",
          color: "red",
        }}
      />
    );

    expect(wrapper.find("GeneralIcon").prop("style").color).toBe("#bfbfbf");
    expect(wrapper.find("Link").length).toBe(0);
    expect(wrapper.find("span").text()).toBe("<GeneralIcon />aaa");
  });

  it("should work when type is text", () => {
    const wrapper = shallow<BrickLinkProps>(
      <BrickLink label="aaa" url="/url" type="text" />
    );
    expect(wrapper.find(".textLink").length).toBe(1);
  });

  it("should work when iconAlign is right", () => {
    const wrapper = shallow<BrickLinkProps>(
      <BrickLink
        label="aaa"
        url="/url"
        type="text"
        iconAlign="right"
        icon={{
          lib: "antd",
          theme: "outlined",
          type: "file-search",
        }}
        target="_blank"
      />
    );
    expect(wrapper.find("Link").childAt(1).props().icon).toEqual({
      lib: "antd",
      theme: "outlined",
      type: "file-search",
    });
    expect(wrapper.find(GeneralIcon).length).toBe(2);
    wrapper.setProps({
      hideExternalIcon: true,
    });
    expect(wrapper.find(GeneralIcon).length).toBe(1);
  });
});
