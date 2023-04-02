import React from "react";
import { mount } from "enzyme";
import * as kit from "@next-core/brick-kit";
import { BrickConf, FeatureFlags } from "@next-core/brick-types";
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
jest
  .spyOn(kit.developHelper, "checkoutTplContext")
  .mockImplementation(() => void 0);

const renderPreviewBricks = ((kit.developHelper as any).renderPreviewBricks =
  jest.fn().mockReturnValue(Promise.resolve()));

let flags: FeatureFlags = {};
jest.spyOn(kit, "getRuntime").mockReturnValue({
  getFeatureFlags() {
    return flags;
  },
} as any);

describe("BrickPreview", () => {
  beforeEach(() => {
    flags = {};
  });

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

  it("should render with bricks array", async () => {
    const conf: BrickConf[] = [
      {
        brick: "span",
        properties: {
          title: "hello",
        },
      },
      {
        brick: "span",
        properties: {
          title: "hello2",
        },
      },
    ];
    const previewRef = React.createRef<BrickPreviewRef>();
    mount(<BrickPreview conf={conf} ref={previewRef} />);
    await (global as any).flushPromises();
    expect(previewRef.current.container.firstChild.firstChild).toHaveProperty(
      "title",
      "hello"
    );
    expect(
      previewRef.current.container.firstChild.firstChild.nextSibling
    ).toHaveProperty("title", "hello2");
  });

  it("should render with bricks array, but only one item", async () => {
    const conf: BrickConf[] = [
      {
        brick: "span",
        properties: {
          title: "hello",
        },
      },
    ];
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
    ).toBe(false);
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

  it("should migrate v3", async () => {
    flags = { "migrate-to-brick-next-v3": true };
    const conf: BrickConf = {
      brick: "div",
      properties: {
        title: "hello",
      },
    };
    const previewRef = React.createRef<BrickPreviewRef>();
    mount(<BrickPreview conf={conf} ref={previewRef} />);
    expect(renderPreviewBricks).toBeCalledWith([conf], {
      main: previewRef.current.container,
      portal: previewRef.current.portal,
    });
    await (global as any).flushPromises();
  });
});
