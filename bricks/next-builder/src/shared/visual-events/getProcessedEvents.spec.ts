import { BrickEventsMap } from "@next-core/brick-types";
import { getProcessedEvents } from "./getProcessedEvents";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getProcessedEvents", () => {
  it("should work", () => {
    const eventsInfo = [
      { type: "general.select.blur", description: "失去焦点触发" },
      { type: "general.select.change", description: "下拉选中变化时被触" },
      { type: "general.select.search", description: "搜索时被触发" },
    ];

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
        args: ["successs"],
      },
    } as BrickEventsMap;
    expect(getProcessedEvents(eventsInfo, eventMap)).toEqual([
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
      { name: "general.select.search", events: [] },
      {
        name: "general.select.click",
        events: [
          {
            action: "message.success",
            args: ["successs"],
          },
        ],
      },
    ]);

    expect(getProcessedEvents()).toEqual([]);
  });
});
