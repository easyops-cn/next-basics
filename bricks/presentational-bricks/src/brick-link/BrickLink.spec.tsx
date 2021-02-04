import React from "react";
import { shallow } from "enzyme";
import { BrickLink, BrickLinkProps } from "./BrickLink";

jest.spyOn(console, "warn").mockImplementation(() => void 0);

describe("BrickLink", () => {
  it("should work", () => {
    const wrapper = shallow<BrickLinkProps>(
      <BrickLink native={true} label="aaa" url="/url" tooltip="tips.." />
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
      <BrickLink label="aaa" disabled={true} />
    );

    expect(wrapper.find("Link").length).toBe(0);
    expect(wrapper.find("span").text()).toBe("aaa");
  });

  it("should work when type is text", () => {
    const wrapper = shallow<BrickLinkProps>(
      <BrickLink label="aaa" url="/url" type="text" />
    );
    expect(wrapper.find(".textLink").length).toBe(1);
  });
});
