import React from "react";
import { GeneralIcon } from "@next-libs/basic-components";
import { buildTree, filter, NODE_INFO, HIGHTLIGHT, clone } from "./utils";
import {
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "../shared/storyboard/buildStoryboard";

const mockData = {
  routes: [
    {
      bricks: [
        {
          brick: "general-button",
          properties: {
            test: 1,
          },
          [symbolForNodeInstanceId]: "123123",
          [symbolForNodeId]: "B-02",
          path: "${APP.homepage}/test-1",
        },
        {
          brick: "general-select",
          properties: {
            test: 2,
          },
          [symbolForNodeInstanceId]: "234",
          [symbolForNodeId]: "B-04",
          path: "${APP.homepage}/test-2",
        },
      ],
      [symbolForNodeId]: "B-01",
      type: "bricks",
    },
  ],
  meta: {
    customTemplates: [
      {
        name: "tpl-test-1",
        [symbolForNodeId]: "t-01",
      },
      {
        name: "tpl-test-2",
        [symbolForNodeId]: "t-02",
      },
    ],
  },
  dependsAll: false,
};

describe("buildTree should work", () => {
  it.each([
    [
      mockData,
      [
        {
          $$info: { realParentId: "" },
          children: [
            {
              $$info: {
                realParentId: "B-01",
                type: "bricks",
                [symbolForNodeId]: "B-01",
              },
              children: [
                {
                  $$info: {
                    brick: "general-button",
                    path: "${APP.homepage}/test-1",
                    properties: { test: 1 },
                    realParentId: "B-01",
                    [symbolForNodeInstanceId]: "123123",
                    [symbolForNodeId]: "B-02",
                  },
                  icon: (
                    <GeneralIcon
                      icon={{
                        color: "cyan",
                        icon: "codepen",
                        lib: "antd",
                        theme: "outlined",
                      }}
                      style={{ fontSize: 12, margin: "0 2px" }}
                    />
                  ),
                  key: "routes/0/bricks/0",
                  title: "general-button",
                },
                {
                  $$info: {
                    brick: "general-select",
                    path: "${APP.homepage}/test-2",
                    properties: { test: 2 },
                    realParentId: "B-01",
                    [symbolForNodeInstanceId]: "234",
                    [symbolForNodeId]: "B-04",
                  },
                  icon: (
                    <GeneralIcon
                      icon={{
                        color: "cyan",
                        icon: "codepen",
                        lib: "antd",
                        theme: "outlined",
                      }}
                      style={{ fontSize: 12, margin: "0 2px" }}
                    />
                  ),
                  key: "routes/0/bricks/1",
                  title: "general-select",
                },
              ],
              icon: (
                <GeneralIcon
                  icon={{
                    category: "app",
                    color: "cyan",
                    icon: "container",
                    lib: "easyops",
                  }}
                  style={{ fontSize: 12, margin: "0 2px" }}
                />
              ),
              key: "routes/0",
              title: "bricks",
            },
          ],
          icon: (
            <span
              style={{
                display: "inline-block",
                height: 12,
                margin: "0 2px",
                width: 12,
              }}
            />
          ),
          key: "routes",
          title: "routes",
        },
        {
          $$info: { realParentId: "" },
          children: [
            {
              $$info: { realParentId: "" },
              children: [
                {
                  $$info: {
                    name: "tpl-test-1",
                    realParentId: "t-01",
                    [symbolForNodeId]: "t-01",
                  },
                  icon: (
                    <span
                      style={{
                        display: "inline-block",
                        height: 12,
                        margin: "0 2px",
                        width: 12,
                      }}
                    />
                  ),
                  key: "meta/customTemplates/0",
                  title: "tpl-test-1",
                },
                {
                  $$info: {
                    name: "tpl-test-2",
                    realParentId: "t-02",
                    [symbolForNodeId]: "t-02",
                  },
                  icon: (
                    <span
                      style={{
                        display: "inline-block",
                        height: 12,
                        margin: "0 2px",
                        width: 12,
                      }}
                    />
                  ),
                  key: "meta/customTemplates/1",
                  title: "tpl-test-2",
                },
              ],
              icon: (
                <span
                  style={{
                    display: "inline-block",
                    height: 12,
                    margin: "0 2px",
                    width: 12,
                  }}
                />
              ),
              key: "meta/customTemplates",
              title: "customTemplates",
            },
          ],
          icon: (
            <span
              style={{
                display: "inline-block",
                height: 12,
                margin: "0 2px",
                width: 12,
              }}
            />
          ),
          key: "meta",
          title: "meta",
        },
      ],
    ],
    [
      {
        routes: [],
        meta: [],
      },
      [
        {
          $$info: { realParentId: "" },
          icon: (
            <span
              style={{
                display: "inline-block",
                height: 12,
                margin: "0 2px",
                width: 12,
              }}
            />
          ),
          key: "routes",
          title: "routes",
        },
        {
          $$info: { realParentId: "" },
          icon: (
            <span
              style={{
                display: "inline-block",
                height: 12,
                margin: "0 2px",
                width: 12,
              }}
            />
          ),
          key: "meta",
          title: "meta",
        },
      ],
    ],
    [{}, []],
  ])("%s should return %p", (value, result) => {
    expect(buildTree(value)).toEqual(result);
  });
});

describe("fitler should work", () => {
  const treeData = buildTree(mockData);

  it.each([
    ["null test", []],
    [
      "general",
      [
        {
          $$info: { realParentId: "" },
          children: [
            {
              $$info: {
                realParentId: "B-01",
                type: "bricks",
                [symbolForNodeId]: "B-01",
              },
              children: [
                {
                  $$hightlight: true,
                  $$info: {
                    brick: "general-button",
                    path: "${APP.homepage}/test-1",
                    properties: { test: 1 },
                    realParentId: "B-01",
                    [symbolForNodeInstanceId]: "123123",
                    [symbolForNodeId]: "B-02",
                  },
                  icon: (
                    <GeneralIcon
                      icon={{
                        color: "cyan",
                        icon: "codepen",
                        lib: "antd",
                        theme: "outlined",
                      }}
                      style={{ fontSize: 12, margin: "0 2px" }}
                    />
                  ),
                  key: "routes/0/bricks/0",
                  title: "general-button",
                },
                {
                  $$hightlight: true,
                  $$info: {
                    brick: "general-select",
                    path: "${APP.homepage}/test-2",
                    properties: { test: 2 },
                    realParentId: "B-01",
                    [symbolForNodeInstanceId]: "234",
                    [symbolForNodeId]: "B-04",
                  },
                  icon: (
                    <GeneralIcon
                      icon={{
                        color: "cyan",
                        icon: "codepen",
                        lib: "antd",
                        theme: "outlined",
                      }}
                      style={{ fontSize: 12, margin: "0 2px" }}
                    />
                  ),
                  key: "routes/0/bricks/1",
                  title: "general-select",
                },
              ],
              icon: (
                <GeneralIcon
                  icon={{
                    category: "app",
                    color: "cyan",
                    icon: "container",
                    lib: "easyops",
                  }}
                  style={{ fontSize: 12, margin: "0 2px" }}
                />
              ),
              key: "routes/0",
              title: "bricks",
            },
          ],
          icon: (
            <span
              style={{
                display: "inline-block",
                height: 12,
                margin: "0 2px",
                width: 12,
              }}
            />
          ),
          key: "routes",
          title: "routes",
        },
      ],
    ],
    [
      "general-button",
      [
        {
          $$info: { realParentId: "" },
          children: [
            {
              $$info: {
                realParentId: "B-01",
                type: "bricks",
                [symbolForNodeId]: "B-01",
              },
              children: [
                {
                  $$hightlight: true,
                  $$info: {
                    brick: "general-button",
                    path: "${APP.homepage}/test-1",
                    properties: { test: 1 },
                    realParentId: "B-01",
                    [symbolForNodeInstanceId]: "123123",
                    [symbolForNodeId]: "B-02",
                  },
                  icon: (
                    <GeneralIcon
                      icon={{
                        color: "cyan",
                        icon: "codepen",
                        lib: "antd",
                        theme: "outlined",
                      }}
                      style={{ fontSize: 12, margin: "0 2px" }}
                    />
                  ),
                  key: "routes/0/bricks/0",
                  title: "general-button",
                },
              ],
              icon: (
                <GeneralIcon
                  icon={{
                    category: "app",
                    color: "cyan",
                    icon: "container",
                    lib: "easyops",
                  }}
                  style={{ fontSize: 12, margin: "0 2px" }}
                />
              ),
              key: "routes/0",
              title: "bricks",
            },
          ],
          icon: (
            <span
              style={{
                display: "inline-block",
                height: 12,
                margin: "0 2px",
                width: 12,
              }}
            />
          ),
          key: "routes",
          title: "routes",
        },
      ],
    ],
    [
      "tpl-test-1",
      [
        {
          $$info: { realParentId: "" },
          children: [
            {
              $$info: { realParentId: "" },
              children: [
                {
                  $$hightlight: true,
                  $$info: {
                    name: "tpl-test-1",
                    realParentId: "t-01",
                    [symbolForNodeId]: "t-01",
                  },
                  icon: (
                    <span
                      style={{
                        display: "inline-block",
                        height: 12,
                        margin: "0 2px",
                        width: 12,
                      }}
                    />
                  ),
                  key: "meta/customTemplates/0",
                  title: "tpl-test-1",
                },
              ],
              icon: (
                <span
                  style={{
                    display: "inline-block",
                    height: 12,
                    margin: "0 2px",
                    width: 12,
                  }}
                />
              ),
              key: "meta/customTemplates",
              title: "customTemplates",
            },
          ],
          icon: (
            <span
              style={{
                display: "inline-block",
                height: 12,
                margin: "0 2px",
                width: 12,
              }}
            />
          ),
          key: "meta",
          title: "meta",
        },
      ],
    ],
  ])("%s should return %p", (value, result) => {
    expect(filter(treeData, value)).toEqual(result);
  });

  it("filter deep", () => {
    const deepData = {
      routes: [
        {
          bricks: [
            {
              brick: "general-button",
              events: [
                {
                  args: [
                    {
                      instanceId: "${projectId}",
                    },
                  ],
                  callback: {
                    error: [
                      {
                        action: "handleHttpError",
                      },
                    ],
                    success: [
                      {
                        action: "message.success",
                        args: ["Export Success"],
                      },
                    ],
                  },
                  method: "executeWithArgs",
                  useProvider:
                    "providers-of-next-builder.permission-api-export-permissions",
                },
              ],
              properties: {
                test: 1,
              },
              [symbolForNodeInstanceId]: "123123",
              [symbolForNodeId]: "B-02",
              path: "${APP.homepage}/test-1",
            },
          ],
          [symbolForNodeId]: "B-01",
          type: "bricks",
        },
      ],
    };
    const deepTree = buildTree(deepData);
    expect(filter(deepTree, "handleHttpError").length).toBe(1);
    expect(filter(deepTree, "Export Success").length).toBe(1);
  });
});

describe("searchConfig should work", () => {
  const treeData = buildTree(mockData);

  it("supportKey should work", () => {
    expect(
      filter(treeData, "name", {
        supportKey: true,
      })
    ).toEqual([
      {
        $$info: { realParentId: "" },
        children: [
          {
            $$info: { realParentId: "" },
            children: [
              {
                $$hightlight: true,
                $$info: {
                  $$hightlight: true,
                  name: "tpl-test-1",
                  realParentId: "t-01",
                  [symbolForNodeId]: "t-01",
                },
                icon: (
                  <span
                    style={{
                      display: "inline-block",
                      height: 12,
                      margin: "0 2px",
                      width: 12,
                    }}
                  />
                ),
                key: "meta/customTemplates/0",
                title: "tpl-test-1",
              },
              {
                $$hightlight: true,
                $$info: {
                  $$hightlight: true,
                  name: "tpl-test-2",
                  realParentId: "t-02",
                  [symbolForNodeId]: "t-02",
                },
                icon: (
                  <span
                    style={{
                      display: "inline-block",
                      height: 12,
                      margin: "0 2px",
                      width: 12,
                    }}
                  />
                ),
                key: "meta/customTemplates/1",
                title: "tpl-test-2",
              },
            ],
            icon: (
              <span
                style={{
                  display: "inline-block",
                  height: 12,
                  margin: "0 2px",
                  width: 12,
                }}
              />
            ),
            key: "meta/customTemplates",
            title: "customTemplates",
          },
        ],
        icon: (
          <span
            style={{
              display: "inline-block",
              height: 12,
              margin: "0 2px",
              width: 12,
            }}
          />
        ),
        key: "meta",
        title: "meta",
      },
    ]);
    expect(
      filter(treeData, "name", {
        supportKey: false,
      })
    ).toEqual([]);
  });

  it("supportKey should work", () => {
    expect(
      filter(treeData, "general-", {
        supportFuzzy: true,
      }).length
    ).toBe(1);
    expect(
      filter(treeData, "general-", {
        supportFuzzy: false,
      }).length
    ).toBe(0);
  });

  it("supportKey should work", () => {
    expect(
      filter(treeData, "GENERAL-BUTTON", {
        supportIngoreCase: true,
      }).length
    ).toBe(1);
    expect(
      filter(treeData, "GENERAL-BUTTON", {
        supportIngoreCase: false,
      }).length
    ).toBe(0);
  });
});

describe("clone should work", () => {
  it.each([
    [
      "normal",
      {
        a: "123",
        b: {
          c: "234",
          d: "345",
        },
        properties: {
          f: "f",
        },
        arr: [1, 2, 3],
        [symbolForNodeId]: "01",
        [symbolForNodeInstanceId]: "02",
      },
      {
        a: "123",
        b: {
          c: "234",
          d: "345",
        },
        properties: {
          f: "f",
        },
        arr: [1, 2, 3],
        [symbolForNodeId]: "01",
        [symbolForNodeInstanceId]: "02",
      },
    ],
    [
      "ingore key test",
      {
        a: "123",
        bricks: [
          {
            brick: 1,
          },
          {
            brick: 2,
          },
        ],
        slots: {
          content: {
            brick: "general-button",
          },
        },
      },
      {
        a: "123",
      },
    ],
  ])("%s", (_condition, params, result) => {
    expect(clone(params)).toEqual(result);
  });
});
