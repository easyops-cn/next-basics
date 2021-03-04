import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralCardEditor } from "./general-card.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralCardEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-card",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(
      <GeneralCardEditor nodeUid={1} brick="general-card" />
    );
    expect(wrapper.find(helper.SlotContainer).prop("slotName")).toBe("content");
    expect(wrapper.find(".cardHead").length).toBe(0);
  });

  it("should show card head if `cardTitle` is set with a plain string", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-card",
      alias: "my-brick",
      $$parsedProperties: {
        cardTitle: "Hello World",
      },
    });
    const wrapper = shallow(
      <GeneralCardEditor nodeUid={1} brick="general-card" />
    );
    expect(wrapper.find(".cardHead").text()).toBe("Hello World");
  });

  it("should show card head if `cardTitle` is set with an I18N evaluation", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-card",
      alias: "my-brick",
      $$parsedProperties: {
        cardTitle: "<% I18N('HELLO_WORLD') %>",
      },
    });
    const wrapper = shallow(
      <GeneralCardEditor nodeUid={1} brick="general-card" />
    );
    expect(wrapper.find(".cardHead").text()).toBe("HELLO_WORLD");
  });

  it("should show card head if `cardTitle` is set with an unknown evaluation", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-card",
      alias: "my-brick",
      $$parsedProperties: {
        cardTitle: "<% CTX.cardTitle %>",
      },
    });
    const wrapper = shallow(
      <GeneralCardEditor nodeUid={1} brick="general-card" />
    );
    expect(wrapper.find(".cardHead").text()).toBe("<% … %>");
  });
});
