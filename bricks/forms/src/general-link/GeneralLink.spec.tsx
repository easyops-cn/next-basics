import React from "react";
import { shallow } from "enzyme";
import { GeneralLink, GeneralLinkProps } from "./GeneralLink";
import { GeneralIcon } from "@next-libs/basic-components";

jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("GeneralLink", () => {
  it("should work", () => {
    const wrapper = shallow<GeneralLinkProps>(
      <GeneralLink
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
    const wrapper = shallow<GeneralLinkProps>(
      <GeneralLink label="aaa" url="/url" target="_blank" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when disabled", () => {
    const wrapper = shallow<GeneralLinkProps>(
      <GeneralLink
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

    expect(wrapper.find("GeneralIcon").prop("style").color).toBe(
      "var(--color-disabled-text)"
    );
    expect(wrapper.find("Link").length).toBe(0);
    expect(wrapper.find("span").at(0).text()).toBe("<GeneralIcon />");
  });

  it("should work when type is text", () => {
    const wrapper = shallow<GeneralLinkProps>(
      <GeneralLink label="aaa" url="/url" type="text" />
    );
    expect(wrapper.find(".textLink").length).toBe(1);
  });

  it("should work when iconAlign is right", () => {
    const wrapper = shallow<GeneralLinkProps>(
      <GeneralLink
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
        underLine={true}
        labelColor={"red"}
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
    expect(wrapper.find(".underLine").length).toBe(1);
    expect(wrapper.find(".underLine").prop("style")).toStrictEqual({
      borderBottomColor: "red",
      color: "red",
    });
  });
});
