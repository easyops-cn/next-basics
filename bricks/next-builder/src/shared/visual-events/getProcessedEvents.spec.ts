import { BrickEventsMap } from "@next-core/brick-types";
import { getProcessedEvents, processHandlers } from "./getProcessedEvents";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getProcessedEvents", () => {
  it("should work", () => {
    const eventMap = {
      "general.select.blur": {
        target: "#id",
        properties: {
          name: "test",
        },
      },
      "general.select.change": [
        { action: "console.log" },
        { useProvider: "cmdb-provider", args: ["bbc"] },
        { target: "#id2", method: "setArgs" },
      ],
      "general.select.click": {
        action: "message.success",
        args: ["success"],
      },
    } as BrickEventsMap;
    expect(getProcessedEvents(eventMap)).toEqual([
      {
        name: "general.select.blur",
        events: [
          {
            target: "#id",
            properties: {
              name: "test",
            },
          },
        ],
      },
      {
        name: "general.select.change",
        events: [
          { action: "console.log" },
          { useProvider: "cmdb-provider", args: ["bbc"] },
          { target: "#id2", method: "setArgs" },
        ],
      },
      {
        name: "general.select.click",
        events: [
          {
            action: "message.success",
            args: ["success"],
          },
        ],
      },
    ]);

    expect(getProcessedEvents()).toEqual([]);
  });

  it("processHandlers", () => {
    expect(processHandlers({ action: "console.log", args: ["a"] })).toEqual([
      { action: "console.log", args: ["a"] },
    ]);

    expect(
      processHandlers({
        useProvider: "api.cmdb.provider",
        args: ["a"],
        callback: {
          finally: {
            useProvider: "api.cmdb.provider.v2",
            args: ["abc"],
            callback: {
              progress: {
                action: "console.log",
              },
            },
          },
          success: {
            useProvider: "namespace@getDetail:1.0.0",
            args: ["abc"],
            callback: {
              error: {
                action: "console.log",
                args: ["a"],
              },
            },
          },
        },
      })
    ).toEqual([
      {
        args: ["a"],
        callback: {
          finally: [
            {
              useProvider: "api.cmdb.provider.v2",
              args: ["abc"],
              callback: {
                progress: [
                  {
                    action: "console.log",
                  },
                ],
              },
            },
          ],
          success: [
            {
              useProvider: "namespace@getDetail:1.0.0",
              args: ["abc"],
              callback: {
                error: [
                  {
                    action: "console.log",
                    args: ["a"],
                  },
                ],
              },
            },
          ],
        },
        useProvider: "api.cmdb.provider",
      },
    ]);
  });
});
