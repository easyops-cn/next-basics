import { UpdateBricksToV3 } from "./UpdateBricksToV3";
describe("updateBrickToV3", () => {
  it("should work", () => {
    const result = UpdateBricksToV3({
      topic_vertices: [
        {
          _object_id: "STORYBOARD_BRICK",
          instanceId: "mock-instanceId",
          brick: ":if",
          alias: "v3",
          type: "brick",
        },
      ],
      vertices: [
        {
          brick: "basic-bricks.micro-view",
          instanceId: "a",
          ref: "view",
          mountPoint: "bricks",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({
            width: "800px",
            toolbarUseBrick: {
              useBrick: [
                {
                  brick: "basic-bricks.general-button",
                  properties: {
                    buttonName: "toolbarBtn",
                  },
                  events: {
                    "general.button.click": {
                      action: "console.log",
                    },
                  },
                },
              ],
            },
          }),
        },
        {
          brick: "basic-bricks.general-card",
          instanceId: "b",
          _object_id: "STORYBOARD_BRICK",
          mountPoint: "content",
          ref: "card",
          properties: JSON.stringify({
            textContent: "Hello, This is a card",
            cardProps: "<% TPL.cardProps %>",
            toolbar: {
              useBrick: {
                brick: "basic-bricks.general-card",
                transform: {
                  cardTitle: "@{text}",
                  style: {
                    width: "<% DATA.width %>",
                  },
                },
                slots: {
                  content: {
                    bricks: [
                      {
                        brick: "div",
                      },
                      {
                        brick: "span",
                      },
                    ],
                  },
                },
              },
            },
          }),
          events: JSON.stringify({
            click: [
              {
                action: "console.log",
                args: ["<% TPL.cardProps %>"],
              },
              {
                target: "_self",
                properties: {
                  toolbar: {
                    useBrick: {
                      brick: "basic-bricks.general-button",
                      transform: {
                        buttonName: "<% EVENT.detail %>",
                      },
                      events: {
                        "general.button.click": [
                          {
                            action: "console.log",
                          },
                        ],
                      },
                    },
                  },
                },
              },
            ],
          }),
          lifeCycle: JSON.stringify({
            useResolves: [
              {
                useProvider: "providers-of-cmdb.get-detail",
                args: ["abc", "STORYBOARD_TEMPLATE"],
                transform: {
                  useBrick: {
                    brick: "container-brick.tabs-container",
                    properties: {
                      tabList: [
                        {
                          key: "Tab 1",
                          text: "Tab 1",
                        },
                        {
                          key: "Tab 2",
                          text: "Tab 2",
                        },
                      ],
                    },
                    slots: {
                      content: {
                        bricks: [
                          {
                            brick: "div",
                          },
                          {
                            brick: "div",
                          },
                        ],
                      },
                    },
                  },
                },
              },
            ],
          }),
        },
        {
          brick: "basic-bricks.general-button",
          instanceId: "c",
          mountPoint: "content",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({
            buttonName: "name",
            buttonSize: "size",
            buttonIcon: "icon",
          }),
          events: JSON.stringify({
            "general.button.click": [
              {
                action: "console.log",
              },
            ],
          }),
        },
        {
          brick: "presentational-bricks.brick-link",
          instanceId: "d",
          mountPoint: "content",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({
            label: "label",
            underLine: true,
          }),
          events: JSON.stringify({
            "link.click": [
              {
                action: "console.log",
              },
            ],
          }),
        },
        {
          brick: "presentational-bricks.brick-tag",
          instanceId: "tag-list",
          mountPoint: "content",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({
            tagList: [
              {
                key: "testA",
                label: "testA",
              },
              {
                key: "testB",
                label: "testB",
                icon: {
                  icon: "adjust",
                  lib: "fa",
                  prefix: "fas",
                },
              },
            ],
            multipleCheck: true,
          }),
          events: JSON.stringify({
            "checked.update": [
              {
                action: "console.log",
                args: ["<% `checked.v1`, EVENT.detail %>"],
              },
              {
                target: "#button",
                properties: {
                  buttonName: "<% 'noChange', EVENT.detail %>",
                },
              },
            ],
            "checked.update.v2": {
              action: "console.log",
              args: ["<% `checked.v2`, EVENT.detail %>"],
            },
            "tag.close": [
              {
                action: "console.log",
                args: [
                  "<% EVENT.detail.tagList.map(item => ({...EVENT.detail.current, key: 'a'})) %>",
                  {
                    args: {
                      params: "<% EVENT.detail.current %>",
                    },
                  },
                ],
              },
              {
                useProvider: "mock-provider",
                args: [],
                callback: {
                  success: [
                    {
                      action: "no change",
                      args: [
                        "<% 'still event.detail.current', EVENT.detail.current %>",
                      ],
                    },
                  ],
                },
              },
            ],
          }),
        },
        {
          brick: "container-brick.tabs-container",
          instanceId: "tab",
          mountPoint: "content",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({
            tabList: [
              {
                key: "Tab 1",
                text: "Tab 1",
              },
              {
                key: "Tab 2",
                text: "Tab 2",
              },
            ],
            activeKey: "Tab 1",
          }),
        },
        {
          brick: "div",
          instanceId: "tab-item-1",
          mountPoint: "content",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({
            textContent: "tab-item-1",
          }),
        },
        {
          brick: "div",
          instanceId: "tab-item-2",
          mountPoint: "content",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({
            textContent: "tab-item-2",
          }),
        },
      ],
      edges: [
        {
          out: "mock-instanceId",
          in: "a",
          out_name: "children",
        },
        {
          out: "a",
          in: "b",
          out_name: "children",
        },
        {
          out: "b",
          in: "c",
          out_name: "children",
        },
        {
          out: "b",
          in: "d",
          out_name: "children",
        },
        {
          out: "b",
          in: "tag-list",
          out_name: "children",
        },
        {
          out: "b",
          in: "tab",
          out_name: "children",
        },
        {
          out: "tab",
          in: "tab-item-1",
          out_name: "children",
        },
        {
          out: "tab",
          in: "tab-item-2",
          out_name: "children",
        },
      ],
    });

    expect(result).toEqual([
      {
        _object_id: "STORYBOARD_BRICK",
        brick: "containers.micro-view",
        instanceId: "a",
        mountPoint: "bricks",
        properties:
          '{"width":"800px","toolbarUseBrick":{"useBrick":[{"brick":"basic-bricks.general-button","properties":{"buttonName":"toolbarBtn"},"events":{"general.button.click":{"action":"console.log"}}}]}}',
      },
      {
        _object_id: "STORYBOARD_BRICK",
        brick: "containers.general-card",
        events:
          '{"click":[{"action":"console.log","args":["<% TPL.cardProps %>"]},{"target":"_self","properties":{"toolbar":{"useBrick":{"brick":"basic.general-button","transform":{"buttonName":"<% EVENT.detail %>"},"events":{"click":[{"action":"console.log"}]},"properties":{"textContent":"<% EVENT.detail %>"}}}}}]}',
        instanceId: "b",
        lifeCycle:
          '{"useResolves":[{"useProvider":"providers-of-cmdb.get-detail","args":["abc","STORYBOARD_TEMPLATE"],"transform":{"useBrick":{"brick":"containers.tab-list","properties":{"tabs":[{"key":"Tab 1","text":"Tab 1","panel":"Tab 1"},{"key":"Tab 2","text":"Tab 2","panel":"Tab 2"}]},"slots":{"content":{"bricks":[{"brick":"div"},{"brick":"div"}]}}}}}]}',
        mountPoint: "",
        properties:
          '{"textContent":"Hello, This is a card","cardProps":"<% TPL.cardProps %>","toolbar":{"useBrick":{"brick":"containers.general-card","transform":{"cardTitle":"@{text}","style":{"width":"<% DATA.width %>"}},"slots":{"content":{"bricks":[{"brick":"div"},{"brick":"span"}]}},"properties":{"cardTitle":"@{text}","style":{"width":"<% DATA.width %>"}}}}}',
      },
      {
        _object_id: "STORYBOARD_BRICK",
        brick: "basic.general-button",
        events: '{"click":[{"action":"console.log"}]}',
        instanceId: "c",
        mountPoint: "",
        properties: '{"textContent":"name","size":"size","icon":"icon"}',
      },
      {
        _object_id: "STORYBOARD_BRICK",
        brick: "basic.general-link",
        events: '{"click":[{"action":"console.log"}]}',
        instanceId: "d",
        mountPoint: "",
        properties: '{"textContent":"label","underline":true}',
      },
      {
        _object_id: "STORYBOARD_BRICK",
        brick: "basic.general-tag-list",
        events:
          '{"checked":[{"action":"console.log","args":["<% `checked.v1`, EVENT.detail.item %>"]},{"target":"#button","properties":{"buttonName":"<% \'noChange\', EVENT.detail %>"}},{"action":"console.log","args":["<% `checked.v2`, EVENT.detail.list %>"]}],"close":[{"action":"console.log","args":["<% EVENT.detail.list.map(item => ({...EVENT.detail.item, key: \'a\'})) %>",{"args":{"params":"<% EVENT.detail.item %>"}}]},{"useProvider":"mock-provider","args":[],"callback":{"success":[{"action":"no change","args":["<% \'still event.detail.current\', EVENT.detail.current %>"]}]}}]}',
        instanceId: "tag-list",
        mountPoint: "",
        properties:
          '{"list":[{"key":"testA","label":"testA"},{"key":"testB","label":"testB","icon":{"icon":"adjust","lib":"fa","prefix":"fas"}}],"multiple":true}',
      },
      {
        _object_id: "STORYBOARD_BRICK",
        brick: "containers.tab-list",
        instanceId: "tab",
        mountPoint: "",
        properties:
          '{"tabs":[{"key":"Tab 1","text":"Tab 1","panel":"Tab 1"},{"key":"Tab 2","text":"Tab 2","panel":"Tab 2"}],"activePanel":"Tab 1"}',
      },
      {
        _object_id: "STORYBOARD_BRICK",
        instanceId: "tab-item-1",
        mountPoint: "Tab 1",
      },
      {
        _object_id: "STORYBOARD_BRICK",
        instanceId: "tab-item-2",
        mountPoint: "Tab 2",
      },
    ]);
  });
});
