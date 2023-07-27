import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MagicBrick } from "./MagicBrick";

jest.mock("@next-core/brick-kit", () => {
  return {
    __esModule: true,
    BrickAsComponent(): React.ReactElement {
      return <div>BrickAsComponent</div>;
    },
    getRuntime: () => ({
      getMagicBrickConfigMapAsync: () =>
        Promise.resolve(
          new Map([
            [
              "HOST.ip",
              {
                _object_id: "MAGIC_BRICK",
                _object_version: 11,
                _pre_ts: 1579432390,
                _ts: 1579503251,
                _version: 3,
                brick: "presentational-bricks.brick-link",
                creator: "easyops",
                ctime: "2020-01-19 17:43:38",
                instanceId: "59c7b02603e96",
                modifier: "easyops",
                mtime: "2020-01-20 14:54:11",
                org: 8888,
                properties: "target: _blank",
                scene: "read",
                selector: "HOST.ip",
                transform:
                  'url: "/next/legacy/cmdb-instance-management/HOST/instance/@{instanceId}"\nlabel: "@{ip}"',
              },
            ],
          ])
        ),
    }),
    developHelper: {
      loadDynamicBricksInBrickConf: jest.fn().mockResolvedValue(undefined),
    },
  };
});

describe("MagicBrick", () => {
  it("should work", async () => {
    const wrapper = mount(
      <MagicBrick
        showType="HOST.ip"
        data={{
          instanceId: "123",
          ip: "192.168.100.162",
        }}
      />
    );
    await act(async () => {
      await jest.runAllTimers();
    });
    wrapper.update();
    expect(wrapper.find("BrickAsComponent").length).toBe(1);
    expect(wrapper.find("BrickAsComponent").prop("data")).toEqual({
      instanceId: "123",
      ip: "192.168.100.162",
    });
    expect(wrapper.find("BrickAsComponent").prop("useBrick")).toEqual({
      brick: "presentational-bricks.brick-link",
      properties: {
        target: "_blank",
      },
      transform: {
        label: "@{ip}",
        url:
          "/next/legacy/cmdb-instance-management/HOST/instance/@{instanceId}",
      },
      events: {},
    });
  });
});
