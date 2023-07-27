import { getProcessedEvents } from "../shared/visual-events/getProcessedEvents";
import { BrickEventsMap } from "@next-core/brick-types";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getProcessedEvents", () => {
  it("should work", () => {
    const eventsMap = {
      "response.error": {
        action: " console.log",
      },
      "response.success": [
        {
          action: "context.replace",
          args: ["brickInfoDetail", "abc"],
        },
        {
          useProvider: "providers-of-cmdb.instance-api-post-search-v3",
          args: [
            "INSTALLED_BRICK_ATOM@EASYOPS",
            {
              fields: ["slots"],
              query: {
                id: {
                  $eq: "<% EVENT.detail.parent[0].brick %>",
                },
              },
              page_size: 1,
            },
          ],
          callback: {
            success: {
              targetRef: "tpl-brick-basic-settings",
              properties: {
                slotOptions:
                  "<% EVENT.detail.list.flatMap(item => item.slots?.map(slot => slot.name) ?? []) %>",
              },
            },
            error: {
              action: "message.error",
              args: [
                '<% I18N("FAILED_TO_LOAD_BRICK_SLOTS", "Failed to load brick slots!") %>',
              ],
            },
          },
        },
        {
          useProvider: "namespace@getDetail:1.0.0",
          args: ["APP"],
          callback: {
            success: [{ action: "console.log" }],
            finally: {
              useProvider: "namespace@getDetail:2.0.0",
              args: ["HOST"],
              callback: {
                success: {
                  action: "console.log",
                },
              },
            },
          },
        },
      ],
    };
    expect(getProcessedEvents(eventsMap as BrickEventsMap)).toEqual([
      {
        events: [
          {
            action: " console.log",
          },
        ],
        name: "response.error",
      },
      {
        events: [
          {
            action: "context.replace",
            args: ["brickInfoDetail", "abc"],
          },
          {
            args: [
              "INSTALLED_BRICK_ATOM@EASYOPS",
              {
                fields: ["slots"],
                page_size: 1,
                query: {
                  id: {
                    $eq: "<% EVENT.detail.parent[0].brick %>",
                  },
                },
              },
            ],
            callback: {
              error: [
                {
                  action: "message.error",
                  args: [
                    '<% I18N("FAILED_TO_LOAD_BRICK_SLOTS", "Failed to load brick slots!") %>',
                  ],
                },
              ],
              success: [
                {
                  properties: {
                    slotOptions:
                      "<% EVENT.detail.list.flatMap(item => item.slots?.map(slot => slot.name) ?? []) %>",
                  },
                  targetRef: "tpl-brick-basic-settings",
                },
              ],
            },
            useProvider: "providers-of-cmdb.instance-api-post-search-v3",
          },
          {
            args: ["APP"],
            callback: {
              finally: [
                {
                  args: ["HOST"],
                  callback: {
                    success: [
                      {
                        action: "console.log",
                      },
                    ],
                  },
                  useProvider: "namespace@getDetail:2.0.0",
                },
              ],
              success: [
                {
                  action: "console.log",
                },
              ],
            },
            useProvider: "namespace@getDetail:1.0.0",
          },
        ],
        name: "response.success",
      },
    ]);
  });
});
