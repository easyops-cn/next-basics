import React from "react";
import { mount } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { BrickConf } from "@next-core/brick-types";
import { BrickPreview, BrickPreviewRef } from "./BrickPreview";

jest.spyOn(kit, "getHistory").mockReturnValue({
  location: {
    search: "",
  },
} as any);

jest
  .spyOn(kit.developHelper, "asyncProcessBrick")
  .mockImplementation(() => void 0);
jest
  .spyOn(kit.developHelper, "loadDynamicBricksInBrickConf")
  .mockImplementation(() => void 0);
jest.spyOn(kit.developHelper, "getFakeKernel").mockImplementation(
  (overrides) =>
    ({
      getFeatureFlags: () => ({}),
      ...overrides,
    } as any)
);

describe("BrickPreview", () => {
  it("should render the correct key", async () => {
    const conf: BrickConf = {
      brick: "div",
      properties: {
        title: "hello",
      },
    };
    const previewRef = React.createRef<BrickPreviewRef>();
    mount(<BrickPreview conf={conf} ref={previewRef} />);
    await (global as any).flushPromises();
    expect(previewRef.current.container.firstChild).toHaveProperty(
      "title",
      "hello"
    );
  });

  it("should render 'bg: true' to bg-mount-point", async () => {
    const conf: BrickConf = {
      brick: "div",
      bg: true,
      properties: {
        title: "hello",
      },
    };
    const previewRef = React.createRef<BrickPreviewRef>();
    const wrapper = mount(<BrickPreview conf={conf} ref={previewRef} />);
    await (global as any).flushPromises();
    expect(
      wrapper
        .find("div[data-testid='brick-container-bg']")
        .html()
        .includes("hello")
    ).toBe(true);
    expect(
      wrapper
        .find("div[data-testid='brick-container-portal']")
        .html()
        .includes("hello")
    ).toBe(false);
  });

  it("should render 'portal: true' to portal-mount-point", async () => {
    const conf: BrickConf = {
      brick: "div",
      portal: true,
      properties: {
        title: "hello",
      },
    };
    const previewRef = React.createRef<BrickPreviewRef>();
    const wrapper = mount(<BrickPreview conf={conf} ref={previewRef} />);
    await (global as any).flushPromises();
    expect(previewRef.current.portal.firstChild).toHaveProperty(
      "title",
      "hello"
    );
    expect(
      wrapper
        .find("div[data-testid='brick-container-bg']")
        .html()
        .includes("hello")
    ).toBe(false);
  });
});
