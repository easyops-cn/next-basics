import { BrickEventsMap } from "@next-core/brick-types";
import { getProcessedEvents, transformEventsMap } from "./getProcessedEvents";

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

describe("transformEventsMap", () => {
  it("should work", () => {
    const eventList = [
      {
        name: "tab.select",
        events: [
          {
            action: "context.replace",
            args: ["updateGraphView", true],
            if: true,
          },
          {
            if: "\\<\\% CTX.goodman \\%\\>",
            properties: {
              contentStyle: {
                height: "100%",
                padding:
                  '<% ["1"].includes(EVENT.detail) ? 0 : "var(--page-card-gap)" %>',
              },
            },
            target: "_self",
          },
          {
            args: ["activeTabIndex", "<% EVENT.detail %>"],
            method: "setInitValue",
            target: "#crate-form",
          },
          {
            args: ["HOST"],
            callback: {
              error: {
                action: "handleHttpError",
              },
              finally: {
                action: "console.log",
              },
              success: [
                {
                  action: "message.success",
                  args: ["迭代关闭成功，进入下一个迭代"],
                },
                {
                  args: ["bedfsd"],
                  callback: {
                    error: {
                      action: "handleHttpError",
                    },
                    finally: {
                      properties: {
                        a: 4,
                      },
                      target: "#detail-card",
                    },
                    success: [
                      {
                        args: ["bbb"],
                        method: "update",
                        target: "#detail-decription",
                      },
                      {
                        action: "message.success",
                        args: ["更新成功"],
                      },
                    ],
                  },
                  useProvider: "providers-of-cmdb.instance-api-get-instance",
                },
              ],
            },
            useProvider: "providers-of-cmdb.instance-api-list-instance",
          },
          {
            action: "history.pushQuery",
            args: [
              {
                activeTabIndex: "${EVENT.detail}",
              },
              {
                notify: false,
              },
            ],
          },
        ],
      },
      {
        name: "tab.click",
        events: [],
      },
      {
        name: "tab.change",
        events: [
          {
            args: ["bbc"],
            callback: {
              progress: {
                action: "message.info",
                args: ["更新"],
              },
            },
            poll: {
              enabled: true,
              expectPollEnd:
                '\\<\\% (result) => result.status === "done" \\%\\>',
            },
            useProvider:
              "easyops.api.flow_builder.flow@GetFlowStepFieldsMapping:1.0.8",
          },
          {
            properties: {
              value: "bbb",
            },
            targetRef: "cmdb-instance-select-ref",
          },
        ],
      },
    ];
    expect(transformEventsMap(eventList)).toEqual([
      {
        events: [
          {
            action: "context.replace",
            args: ["updateGraphView", true],
            if: true,
            key: "0-events-0",
          },
          {
            if: "\\<\\% CTX.goodman \\%\\>",
            key: "0-events-1",
            properties: {
              contentStyle: {
                height: "100%",
                padding:
                  '<% ["1"].includes(EVENT.detail) ? 0 : "var(--page-card-gap)" %>',
              },
            },
            target: "_self",
          },
          {
            args: ["activeTabIndex", "<% EVENT.detail %>"],
            key: "0-events-2",
            method: "setInitValue",
            target: "#crate-form",
          },
          {
            args: ["HOST"],
            callback: {
              error: {
                action: "handleHttpError",
                key: "0-events-3-callback-error-0",
              },
              finally: {
                action: "console.log",
                key: "0-events-3-callback-finally-0",
              },
              success: [
                {
                  action: "message.success",
                  args: ["迭代关闭成功，进入下一个迭代"],
                  key: "0-events-3-callback-success-0",
                },
                {
                  args: ["bedfsd"],
                  callback: {
                    error: {
                      action: "handleHttpError",
                      key: "0-events-3-callback-success-1-callback-error-0",
                    },
                    finally: {
                      key: "0-events-3-callback-success-1-callback-finally-0",
                      properties: {
                        a: 4,
                      },
                      target: "#detail-card",
                    },
                    success: [
                      {
                        args: ["bbb"],
                        key: "0-events-3-callback-success-1-callback-success-0",
                        method: "update",
                        target: "#detail-decription",
                      },
                      {
                        action: "message.success",
                        args: ["更新成功"],
                        key: "0-events-3-callback-success-1-callback-success-1",
                      },
                    ],
                  },
                  key: "0-events-3-callback-success-1",
                  useProvider: "providers-of-cmdb.instance-api-get-instance",
                },
              ],
            },
            key: "0-events-3",
            useProvider: "providers-of-cmdb.instance-api-list-instance",
          },
          {
            action: "history.pushQuery",
            args: [
              {
                activeTabIndex: "${EVENT.detail}",
              },
              {
                notify: false,
              },
            ],
            key: "0-events-4",
          },
        ],
        key: "0",
        name: "tab.select",
      },
      {
        events: [],
        key: "1",
        name: "tab.click",
      },
      {
        events: [
          {
            args: ["bbc"],
            callback: {
              progress: {
                action: "message.info",
                args: ["更新"],
                key: "2-events-0-callback-progress-0",
              },
            },
            key: "2-events-0",
            poll: {
              enabled: true,
              expectPollEnd:
                '\\<\\% (result) => result.status === "done" \\%\\>',
            },
            useProvider:
              "easyops.api.flow_builder.flow@GetFlowStepFieldsMapping:1.0.8",
          },
          {
            key: "2-events-1",
            properties: {
              value: "bbb",
            },
            targetRef: "cmdb-instance-select-ref",
          },
        ],
        key: "2",
        name: "tab.change",
      },
    ]);
  });
});
