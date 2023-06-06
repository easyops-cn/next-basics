import {
  UpdateRouteOrTemplate,
  updateUseResolves,
  updateProxy,
  updateTemplateRefAndAsVarible,
  replaceUseBrickTransform,
  replaceInjectOrTranformRawToEvaluteRaw,
} from "./UpdateBricks";

jest.mock("@next-sdk/cmdb-sdk", () => ({
  InstanceGraphApi_traverseGraphV2: () =>
    Promise.resolve({
      topic_vertices: [
        {
          _object_id: "STORYBOARD_BRICK",
          instanceId: "mock-instanceId",
          brick: "div",
          alias: "v3",
          type: "brick",
        },
      ],
      vertices: [
        {
          brick: "basic.micro-view",
          instanceId: "a",
          ref: "view",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({
            width: "800px",
          }),
        },
        {
          brick: "basic.general-card",
          instanceId: "b",
          _object_id: "STORYBOARD_BRICK",
          ref: "card",
          properties: JSON.stringify({
            textContent: "Hello, This is a card",
            cardProps: "<% TPL.cardProps %>",
            useBrick: {
              brick: "div",
              transform: {
                textContent: "@{text}",
                style: {
                  width: "<% DATA.width %>",
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
            ],
          }),
          lifeCycle: JSON.stringify({
            useResolves: [
              {
                useProvider: "providers-of-cmdb.get-detail",
                args: ["abc", "STORYBOARD_TEMPLATE"],
                transform: {
                  name: "@{}",
                },
              },
              {
                useProvider: "providers-of-cmdb.query-search-v3",
                args: ["STORYBOARD_TEMPLATE", "xxx"],
                transform: {
                  abc: "@{}",
                },
              },
            ],
          }),
        },
        {
          brick: "div",
          ref: "list",
          instanceId: "c",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({}),
        },
        {
          brick: "not-change-brick-and-should-ingore",
          ref: "no-change",
          instanceId: "d",
          _object_id: "STORYBOARD_BRICK",
          properties: JSON.stringify({
            textContent: "no change",
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
      ],
    }),
}));

describe("updateUseResolves", () => {
  it("updateUseResolves should work", () => {
    const mockNodeDetail = {
      instanceId: "mock-instanceId",
      brick: "basic-bricks.mock-brick",
      properties: JSON.stringify({
        name: "mock-name",
      }),
      lifeCycle: JSON.stringify({
        useResolves: [
          {
            provider: "provider-of-next-builder\\.get-detail",
            args: {
              fileds: ["name", "age"],
            },
            transform: "list",
          },
          {
            provider: "provider-of-next-builder\\.get-project-detail",
            transform: {
              projectDetail: "@{project.detail}",
              info: "@{info}",
              project: "@{}",
              object0: {
                name: "@{name}",
                age: "@{person.age}",
              },
            },
          },
          {
            useProvider: "provider-of-next-builder.get-instanced",
            transform: {
              id: "<% DATA.instanceId %>",
              detail: "<% DATA %>",
              object1: {
                name: "<% DATA.name %>",
                age: "<% DATA.age %>",
              },
              object2: "<% { name: DATA.name, age: DATA.age } %>",
            },
          },
        ],
      }),
    };
    expect(updateUseResolves(mockNodeDetail, "CTX")).toEqual({
      context: [
        {
          name: "data_0",
          resolve: {
            args: { fileds: ["name", "age"] },
            useProvider: "provider-of-next-builder.get-detail",
          },
        },
        {
          name: "data_1",
          resolve: {
            args: undefined,
            useProvider: "provider-of-next-builder.get-project-detail",
          },
        },
        {
          name: "data_2",
          resolve: {
            args: undefined,
            useProvider: "provider-of-next-builder.get-instanced",
          },
        },
      ],
      lifeCycle: {},
      properties: {
        detail: "<% CTX.data_2 %>",
        id: "<% CTX.data_2.instanceId %>",
        info: "<% CTX.data_1.info %>",
        list: "<% CTX.data_0 %>",
        name: "mock-name",
        object0: {
          name: "<% CTX.data_1.name %>",
          age: "<% CTX.data_1.person.age %>",
        },
        object1: { name: "<% CTX.data_2.name %>", age: "<% CTX.data_2.age %>" },
        object2: "<% { name: CTX.data_2.name, age: CTX.data_2.age } %>",
        project: "<% CTX.data_1 %>",
        projectDetail: "<% CTX.data_1.project.detail %>",
      },
    });
  });

  it("updateUseResolves should ingore specil item", () => {
    const mockNodeDetail = {
      instanceId: "mock-instanceId",
      brick: "basic-bricks.mock-brick",
      properties: JSON.stringify({
        name: "mock-name",
      }),
      lifeCycle: JSON.stringify({
        useResolves: [
          {
            provider: "provider-of-next-builder\\.undeal-item",
            transform: [
              {
                to: "list-item",
                form: "list",
                mapArray: false,
              },
            ],
          },
        ],
      }),
    };

    expect(updateUseResolves(mockNodeDetail, "CTX")).toBeFalsy();
  });
});

describe("updateProxy", () => {
  it("updateProxy should work", () => {
    const mockNodeDetail = {
      instanceId: "mock-instanceId",
      brick: "tpl-template-bricks",
      proxy: JSON.stringify({
        properties: {
          name: {
            ref: "mock-ref-1",
            refProperty: "name",
            extraOneWayRefs: [
              {
                ref: "mock-ref-1",
                refProperty: "age",
              },
              {
                ref: "mock-ref-2",
                refProperty: "title",
              },
            ],
          },
          age: {
            ref: "mock-ref-2",
            refTransform: {
              hidden: "<% DATA.age === 18 %>",
            },
            extraOneWayRefs: [
              {
                ref: "mock-ref-2",
                refProperty: "xx",
              },
              {
                ref: "mock-ref-2",
                refTransform: {
                  age: "<% DATA.age %>",
                },
              },
            ],
          },
          sex: {
            asVariable: true,
          },
        },
        events: {
          test: {
            ref: "mock-ref-1",
            refEvent: "click",
          },
        },
      }),
    };

    expect(updateProxy(mockNodeDetail)).toEqual({
      context: [{ name: "name" }, { name: "age" }, { name: "sex" }],
      refProxy: {
        "mock-ref-1": {
          name: "<%= STATE.name %>",
          age: "<%= STATE.name %>",
        },
        "mock-ref-2": {
          xx: "<%= STATE.age %>",
          hidden: "<%= STATE.age === 18 %>",
          title: "<%= STATE.name %>",
          age: `<%= STATE.age %>`,
        },
      },
      newProxy: JSON.stringify({
        events: {
          test: {
            ref: "mock-ref-1",
            refEvent: "click",
          },
        },
      }),
    });
  });
});

describe("updateTemplateRefAndAsVarible", () => {
  it("updateTemplateRefAndAsVarible should work", () => {
    const mockNodeDetail = {
      brick: "mock-bricks.general-brick",
      instanceId: "mock-instanceId",
      ref: "mock-ref-1",
      properties: JSON.stringify({
        a: "<% TPL.a %>",
        b: "<% TPL.b * TPL.a %>",
        c: "<% `${TPL.c} TPL title` %>",
      }),
      events: JSON.stringify({
        click: [
          {
            action: "console.log",
            args: ["<% TPL.a %>"],
          },
        ],
        select: {
          action: "console.log",
          args: [
            "<% TPL.b + TPL.c %>",
            "<% 'notwork', NTPL + TPLN + NTPLN.x %>",
          ],
        },
      }),
    };

    const refProxy = {
      "mock-ref-1": {
        name: "<%= STATE.name %>",
        age: "<%= STATE.name %>",
        title: "<%= STATE.name %>",
      },
      "mock-ref-2": {
        xx: "<%= STATE.age %>",
        hidden: "<% STATE.age === 18 %>",
        age: "<% STATE.age %>",
      },
    };

    expect(updateTemplateRefAndAsVarible(mockNodeDetail, refProxy)).toEqual({
      events: {
        click: [{ action: "console.log", args: ["<% STATE.a %>"] }],
        select: {
          action: "console.log",
          args: [
            "<% STATE.b + STATE.c %>",
            "<% 'notwork', NTPL + TPLN + NTPLN.x %>",
          ],
        },
      },
      lifeCycle: {},
      properties: {
        a: "<% STATE.a %>",
        age: "<%= STATE.name %>",
        b: "<% STATE.b * STATE.a %>",
        c: "<% `${STATE.c} TPL title` %>",
        name: "<%= STATE.name %>",
        title: "<%= STATE.name %>",
      },
    });
  });
});

describe("replaceUseBrickTransform", () => {
  it("replaceUseBrickTransform should work", () => {
    const mockNodeDetail = {
      brick: "mock-brick.general-brick",
      instanceId: "mock-instanceId",
      properties: JSON.stringify({
        a: {
          useBrick: {
            brick: "mock-brick.general-brick",
            transform: {
              a: "<% DATA.a %>",
              b: "@{}",
            },
            properties: {
              name: "name",
            },
          },
        },
        b: {
          useBrick: [
            {
              brick: "mock-brick.general-brick",
              transform: {
                a: "<% DATA.a %>",
              },
              properties: {
                b: "<% STATE.b %>",
              },
            },
            {
              brick: "mock-brick.general-brick",
              transform: {
                c: "<% DATA.c %>",
              },
              properties: {
                d: "<% STATE.d %>",
              },
            },
          ],
        },
      }),
      events: JSON.stringify({
        click: [
          {
            targetRef: "xxx",
            properties: {
              a: {
                useBrick: {
                  brick: "xxx",
                  transform: {
                    c: "<% CTX.a %>",
                  },
                },
              },
            },
          },
        ],
      }),
      lifeCycle: JSON.stringify({
        onPageLoad: [
          {
            targetRef: "yyy",
            properties: {
              b: {
                useBrick: {
                  brick: "xxx",
                  transform: {
                    c: "<% CTX.a %>",
                  },
                },
              },
            },
          },
        ],
      }),
    };
    expect(replaceUseBrickTransform(mockNodeDetail)).toEqual({
      events: {
        click: [
          {
            properties: {
              a: {
                useBrick: {
                  brick: "xxx",
                  properties: { c: "<% CTX.a %>" },
                },
              },
            },
            targetRef: "xxx",
          },
        ],
      },
      lifeCycle: {
        onPageLoad: [
          {
            properties: {
              b: {
                useBrick: {
                  brick: "xxx",
                  properties: { c: "<% CTX.a %>" },
                },
              },
            },
            targetRef: "yyy",
          },
        ],
      },
      properties: {
        a: {
          useBrick: {
            brick: "mock-brick.general-brick",
            properties: { a: "<% DATA.a %>", name: "name", b: "<% DATA %>" },
          },
        },
        b: {
          useBrick: [
            {
              brick: "mock-brick.general-brick",
              properties: { a: "<% DATA.a %>", b: "<% STATE.b %>" },
            },
            {
              brick: "mock-brick.general-brick",
              properties: { c: "<% DATA.c %>", d: "<% STATE.d %>" },
            },
          ],
        },
      },
    });
  });
});

describe("replaceInjectOrTranformRawToEvaluteRaw", () => {
  it.each<[string, string]>([
    ["@{}", "<% DATA %>"],
    ["@{rowData}", "<% DATA.rowData %>"],
    ["@{rowData.name}", "<% DATA.rowData.name %>"],
    [
      "@{rowData.name='abc' | string | boolean}",
      "<% PIPES.boolean(PIPES.string(DATA.rowData.name??'abc')) %>",
    ],
    ["${PATH.projectId}", "<% PATH.projectId %>"],
    [
      "${QUERY.name='hello'|string|boolean}",
      "<% PIPES.boolean(PIPES.string(QUERY.name??'hello')) %>",
    ],
    ["<% `${a} @{}` %>", "<% `${a} @{}` %>"],
    ["@{rowData.notWork", "@{rowData.notWork"],
    ["${rowData.notWork", "${rowData.notWork"],
    ["@{rowData.notWork", "@{rowData.notWork"],
    ["$r{owData.notWork}", "$r{owData.notWork}"],
  ])("replaceInjectOrTranformRawToEvaluteRaw should work", (params, result) => {
    expect(replaceInjectOrTranformRawToEvaluteRaw(params)).toEqual(result);
  });
});

describe("UpdateRouteOrTemplate", () => {
  it("UpdateRouteOrTemplate should work", async () => {
    const rootNode = {
      brick: "tpl-template",
      instanceId: "mock-instanceId-template",
      _object_id: "STORYBOARD_TEMPLATE",
      proxy: JSON.stringify({
        properties: {
          name: {
            ref: "view",
            refProperty: "pageTitle",
            extraOneWayRefs: [
              {
                ref: "card",
                refProperty: "cardTitle",
              },
              {
                ref: "list",
                refProperty: "list-name",
              },
            ],
          },
          age: {
            ref: "card",
            refTransform: {
              hidden: "<% DATA.age === 18 %>",
            },
            extraOneWayRefs: [
              {
                ref: "list",
                refProperty: "list-age",
              },
              {
                ref: "list",
                refTransform: {
                  list: "<% DATA.age %>",
                },
              },
            ],
          },
          cardProps: {
            asVariable: true,
          },
        },
      }),
    };
    expect(
      await UpdateRouteOrTemplate(rootNode, "mock-id", {
        updateProxy: true,
        updateUseResolves: true,
        updateUseBrickTransform: true,
        updateChildContext: true,
      })
    ).toEqual([
      {
        _object_id: "STORYBOARD_TEMPLATE",
        instanceId: "mock-instanceId-template",
        state:
          '[{"name":"name"},{"name":"age"},{"name":"cardProps"},{"name":"data_0","resolve":{"useProvider":"providers-of-cmdb.get-detail","args":["abc","STORYBOARD_TEMPLATE"]}},{"name":"data_1","resolve":{"useProvider":"providers-of-cmdb.query-search-v3","args":["STORYBOARD_TEMPLATE","xxx"]}}]',
        proxy: "{}",
      },
      {
        _object_id: "STORYBOARD_BRICK",
        instanceId: "a",
        properties: '{"width":"800px","pageTitle":"<%= STATE.name %>"}',
        context: null,
      },
      {
        _object_id: "STORYBOARD_BRICK",
        instanceId: "b",
        properties:
          '{"textContent":"Hello, This is a card","cardProps":"<% STATE.cardProps %>","useBrick":{"brick":"div","properties":{"textContent":"<% DATA.text %>","style":{"width":"<% DATA.width %>"}}},"cardTitle":"<%= STATE.name %>","hidden":"<%= STATE.age === 18 %>","name":"<% STATE.data_0 %>","abc":"<% STATE.data_1 %>"}',
        events:
          '{"click":[{"action":"console.log","args":["<% STATE.cardProps %>"]}]}',
        lifeCycle: "{}",
        context: null,
      },
      {
        _object_id: "STORYBOARD_BRICK",
        instanceId: "c",
        properties:
          '{"list-name":"<%= STATE.name %>","list-age":"<%= STATE.age %>","list":"<%= STATE.age %>"}',
        context: null,
      },
    ]);
  });
});
