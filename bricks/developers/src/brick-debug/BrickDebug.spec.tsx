import React from "react";
import { shallow } from "enzyme";
import { BrickDebug } from "./BrickDebug";
import { BrickPreview } from "../components/BrickPreview/BrickPreview";
import RadioGroup from "antd/lib/radio/group";
import { BrickEditor } from "../components/BrickEditor/BrickEditor";
import * as brickKit from "@next-core/brick-kit";

const mockGetFeatureFlags = jest.fn().mockReturnValue({
  "developers-brick-preview": false,
});
jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  getFeatureFlags: mockGetFeatureFlags,
  getBasePath: jest.fn().mockReturnValue("/next/"),
} as any);

jest.mock("@next-libs/storage", () => {
  return {
    JsonStorage: jest.fn(() => ({
      getItem: jest.fn(() => ({
        brick: "mock-brick-name",
        properties: {
          name: "xx",
        },
      })),
      setItem: jest.fn(),
    })),
  };
});

describe("BrickDebug", () => {
  it("should work", () => {
    const wrapper = shallow(<BrickDebug />);
    expect(wrapper.find(BrickPreview).prop("conf")).toEqual({
      brick: "mock-brick-name",
      properties: {
        name: "xx",
      },
    });
  });

  it("should get conf from local storage", () => {
    const wrapper = shallow(<BrickDebug />);
    wrapper.find(RadioGroup).at(1).invoke("onChange")({ target: { value: 2 } });
    wrapper.find(RadioGroup).at(0).invoke("onChange")({
      target: { value: "yaml" },
    });

    wrapper.update();
    expect(
      wrapper.find(".debugContainer").prop("style")["gridTemplateColumns"]
    ).toBe("repeat(2, 1fr)");
    expect(wrapper.find(BrickEditor).prop("mode")).toEqual("yaml");
  });
});
