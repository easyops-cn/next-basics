import React from "react";
import { GeneralIcon } from "@next-libs/basic-components";
import { isMatch, PlainObject } from "./utils";
import { buildTree, filter, symbolForHightlight, clone } from "./utils";
import {
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "../shared/storyboard/buildStoryboard";
import { operation, SearchInfoProps } from "./SearchTree";

const mockData: any = {
  routes: [
    {
      bricks: [
        {
          brick: "general-button",
          properties: {
            test: 1,
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "general-button",
                  [symbolForNodeInstanceId]: "slots-brick",
                  [symbolForNodeId]: "s-01-01",
                },
              ],
              type: "bricks",
              [symbolForNodeInstanceId]: "slot-content",
              [symbolForNodeId]: "s-01",
            },
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
    functions: [
      {
        name: "getFunctionsByCondition",
        source: "function testA() {console.log(a)}",
        typescript: true,
      },
      {
        name: "getFunctionsByCondition",
        source: "function testB() {console.log(b)}",
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
          $$info: {},
          children: [
            {
              $$info: {
                nodeId: "B-01",
                parentId: "B-01",
                type: "bricks",
                [symbolForNodeId]: "B-01",
              },
              children: [
                {
                  $$info: {
                    brick: "general-button",
                    instanceId: "123123",
                    nodeId: "B-02",
                    parentId: "B-01",
                    path: "${APP.homepage}/test-1",
                    properties: { test: 1 },
                    [symbolForNodeInstanceId]: "123123",
                    [symbolForNodeId]: "B-02",
                  },
                  children: [
                    {
                      $$info: { parentId: "B-01" },
                      children: [
                        {
                          $$info: {
                            brick: "general-button",
                            instanceId: "slots-brick",
                            nodeId: "s-01-01",
                            parentId: "B-01",
                            [symbolForNodeInstanceId]: "slots-brick",
                            [symbolForNodeId]: "s-01-01",
                          },
                          icon: (
                            <GeneralIcon
                              icon={{
                                color: "cyan",
                                icon: "codepen",
                                lib: "antd",
                                theme: "outlined",
                              }}
                              style={{
                                fontSize: 12,
                                margin: "0 2px",
                              }}
                            />
                          ),
                          isTpl: false,
                          key: "routes/0/bricks/0/slots/content/bricks/0",
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
                      isTpl: false,
                      key: "routes/0/bricks/0/slots/content",
                      title: "content",
                      unlink: true,
                    },
                  ],
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
                  isTpl: false,
                  key: "routes/0/bricks/0",
                  title: "general-button",
                },
                {
                  $$info: {
                    brick: "general-select",
                    instanceId: "234",
                    nodeId: "B-04",
                    parentId: "B-01",
                    path: "${APP.homepage}/test-2",
                    properties: { test: 2 },
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
                  isTpl: false,
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
              isTpl: false,
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
          isTpl: false,
          key: "routes",
          title: "routes",
        },
        {
          $$info: {},
          children: [
            {
              $$info: {},
              children: [
                {
                  $$info: {
                    name: "tpl-test-1",
                    nodeId: "t-01",
                    parentId: "t-01",
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
                  isTpl: true,
                  key: "meta/customTemplates/0",
                  title: "tpl-test-1",
                },
                {
                  $$info: {
                    name: "tpl-test-2",
                    nodeId: "t-02",
                    parentId: "t-02",
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
                  isTpl: true,
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
              isTpl: true,
              key: "meta/customTemplates",
              title: "customTemplates",
            },
            {
              $$info: {},
              children: [
                {
                  $$info: {
                    name: "getFunctionsByCondition",
                    parentId: "",
                    source: "function testA() {console.log(a)}",
                    typescript: true,
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
                  isTpl: false,
                  key: "meta/functions/0",
                  title: "getFunctionsByCondition",
                },
                {
                  $$info: {
                    name: "getFunctionsByCondition",
                    parentId: "",
                    source: "function testB() {console.log(b)}",
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
                  isTpl: false,
                  key: "meta/functions/1",
                  title: "getFunctionsByCondition",
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
              isTpl: false,
              key: "meta/functions",
              title: "functions",
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
          isTpl: false,
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
          $$info: {},
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
          isTpl: false,
          key: "routes",
          title: "routes",
        },
        {
          $$info: {},
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
          isTpl: false,
          key: "meta",
          title: "meta",
        },
      ],
    ],
    [
      {
        routes: [
          {
            alias: "Project Menu",
            routes: [
              {
                bricks: [
                  {
                    brick: "general-view",
                    properties: {
                      test: 1,
                    },
                    [symbolForNodeInstanceId]: "instance-01",
                    [symbolForNodeId]: "B-02",
                    path: "${APP.homepage}/test-1",
                  },
                ],
                type: "bricks",
                alias: "/images",
                path: "${APP.homepage}/project/:projectId/app/:appId/images",
                [symbolForNodeId]: "router-child-1",
              },
            ],
            type: "routes",
            [symbolForNodeId]: "router-1",
          },
        ],
        meta: {
          customTemplates: [
            {
              name: "tpl-test-1",
              [symbolForNodeId]: "t-01",
              bricks: [
                {
                  brick: "general-button",
                  properties: {
                    test: 1,
                  },
                  slots: {
                    content: {
                      bricks: [
                        {
                          brick: "general-button",
                          [symbolForNodeInstanceId]: "slots-brick",
                          [symbolForNodeId]: "s-01-01",
                        },
                      ],
                      type: "bricks",
                      [symbolForNodeInstanceId]: "slot-content",
                      [symbolForNodeId]: "s-01",
                    },
                  },
                  [symbolForNodeInstanceId]: "123123",
                  [symbolForNodeId]: "B-02",
                  path: "${APP.homepage}/test-1",
                },
              ],
            },
          ],
        },
      },
      [
        {
          $$info: {},
          children: [
            {
              $$info: {
                alias: "Project Menu",
                nodeId: "router-1",
                parentId: "router-1",
                type: "routes",
                [symbolForNodeId]: "router-1",
              },
              children: [
                {
                  $$info: {
                    alias: "/images",
                    nodeId: "router-child-1",
                    parentId: "router-child-1",
                    path: "${APP.homepage}/project/:projectId/app/:appId/images",
                    type: "bricks",
                    [symbolForNodeId]: "router-child-1",
                  },
                  children: [
                    {
                      $$info: {
                        brick: "general-view",
                        instanceId: "instance-01",
                        nodeId: "B-02",
                        parentId: "router-child-1",
                        path: "${APP.homepage}/test-1",
                        properties: { test: 1 },
                        [symbolForNodeInstanceId]: "instance-01",
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
                      isTpl: false,
                      key: "routes/0/routes/0/bricks/0",
                      title: "general-view",
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
                  isTpl: false,
                  key: "routes/0/routes/0",
                  title: "/images",
                },
              ],
              icon: (
                <GeneralIcon
                  icon={{
                    category: "app",
                    color: "cyan",
                    icon: "flow",
                    lib: "easyops",
                  }}
                  style={{ fontSize: 12, margin: "0 2px" }}
                />
              ),
              isTpl: false,
              key: "routes/0",
              title: "Project Menu",
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
          isTpl: false,
          key: "routes",
          title: "routes",
        },
        {
          $$info: {},
          children: [
            {
              $$info: {},
              children: [
                {
                  $$info: {
                    name: "tpl-test-1",
                    nodeId: "t-01",
                    parentId: "t-01",
                    [symbolForNodeId]: "t-01",
                  },
                  children: [
                    {
                      $$info: {
                        brick: "general-button",
                        instanceId: "123123",
                        nodeId: "B-02",
                        parentId: "t-01",
                        path: "${APP.homepage}/test-1",
                        properties: { test: 1 },
                        [symbolForNodeInstanceId]: "123123",
                        [symbolForNodeId]: "B-02",
                      },
                      children: [
                        {
                          $$info: {
                            parentId: "t-01",
                          },
                          children: [
                            {
                              $$info: {
                                brick: "general-button",
                                instanceId: "slots-brick",
                                nodeId: "s-01-01",
                                parentId: "t-01",
                                [symbolForNodeInstanceId]: "slots-brick",
                                [symbolForNodeId]: "s-01-01",
                              },
                              icon: (
                                <GeneralIcon
                                  icon={{
                                    color: "cyan",
                                    icon: "codepen",
                                    lib: "antd",
                                    theme: "outlined",
                                  }}
                                  style={{
                                    fontSize: 12,
                                    margin: "0 2px",
                                  }}
                                />
                              ),
                              isTpl: true,
                              key: "meta/customTemplates/0/bricks/0/slots/content/bricks/0",
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
                              style={{
                                fontSize: 12,
                                margin: "0 2px",
                              }}
                            />
                          ),
                          isTpl: true,
                          key: "meta/customTemplates/0/bricks/0/slots/content",
                          title: "content",
                          unlink: true,
                        },
                      ],
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
                      isTpl: true,
                      key: "meta/customTemplates/0/bricks/0",
                      title: "general-button",
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
                  isTpl: true,
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
              isTpl: true,
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
          isTpl: false,
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
    [
      "null test",
      {
        tree: [],
        matchKey: [],
      },
    ],
    [
      "general",
      {
        tree: [
          {
            $$info: {},
            children: [
              {
                $$info: {
                  type: "bricks",
                  nodeId: "B-01",
                  parentId: "B-01",
                  [symbolForNodeId]: "B-01",
                },
                children: [
                  {
                    $$info: {
                      brick: "general-button",
                      path: "${APP.homepage}/test-1",
                      properties: { test: 1 },
                      instanceId: "123123",
                      nodeId: "B-02",
                      parentId: "B-01",
                      [symbolForNodeInstanceId]: "123123",
                      [symbolForNodeId]: "B-02",
                    },
                    children: [
                      {
                        $$info: { parentId: "B-01" },
                        children: [
                          {
                            $$info: {
                              brick: "general-button",
                              instanceId: "slots-brick",
                              nodeId: "s-01-01",
                              [symbolForNodeInstanceId]: "slots-brick",
                              [symbolForNodeId]: "s-01-01",
                              parentId: "B-01",
                            },
                            icon: (
                              <GeneralIcon
                                icon={{
                                  color: "cyan",
                                  icon: "codepen",
                                  lib: "antd",
                                  theme: "outlined",
                                }}
                                style={{
                                  fontSize: 12,
                                  margin: "0 2px",
                                }}
                              />
                            ),
                            isTpl: false,
                            key: "routes/0/bricks/0/slots/content/bricks/0",
                            title: "general-button",
                            [symbolForHightlight]: true,
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
                        isTpl: false,
                        key: "routes/0/bricks/0/slots/content",
                        title: "content",
                        unlink: true,
                      },
                    ],
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
                    isTpl: false,
                    key: "routes/0/bricks/0",
                    title: "general-button",
                    [symbolForHightlight]: true,
                  },
                  {
                    $$info: {
                      brick: "general-select",
                      path: "${APP.homepage}/test-2",
                      properties: { test: 2 },
                      instanceId: "234",
                      nodeId: "B-04",
                      [symbolForNodeInstanceId]: "234",
                      [symbolForNodeId]: "B-04",
                      parentId: "B-01",
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
                    isTpl: false,
                    key: "routes/0/bricks/1",
                    title: "general-select",
                    [symbolForHightlight]: true,
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
                isTpl: false,
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
            isTpl: false,
            key: "routes",
            title: "routes",
          },
        ],
        matchKey: [
          "routes/0/bricks/0",
          "routes/0/bricks/0/slots/content/bricks/0",
          "routes/0/bricks/1",
        ],
      },
    ],
    [
      "general-button",
      {
        tree: [
          {
            $$info: {},
            children: [
              {
                $$info: {
                  type: "bricks",
                  nodeId: "B-01",
                  [symbolForNodeId]: "B-01",
                  parentId: "B-01",
                },
                children: [
                  {
                    $$info: {
                      brick: "general-button",
                      path: "${APP.homepage}/test-1",
                      properties: { test: 1 },
                      instanceId: "123123",
                      nodeId: "B-02",
                      [symbolForNodeInstanceId]: "123123",
                      [symbolForNodeId]: "B-02",
                      parentId: "B-01",
                    },
                    children: [
                      {
                        $$info: { parentId: "B-01" },
                        children: [
                          {
                            $$info: {
                              brick: "general-button",
                              instanceId: "slots-brick",
                              nodeId: "s-01-01",
                              [symbolForNodeInstanceId]: "slots-brick",
                              [symbolForNodeId]: "s-01-01",
                              parentId: "B-01",
                            },
                            icon: (
                              <GeneralIcon
                                icon={{
                                  color: "cyan",
                                  icon: "codepen",
                                  lib: "antd",
                                  theme: "outlined",
                                }}
                                style={{
                                  fontSize: 12,
                                  margin: "0 2px",
                                }}
                              />
                            ),
                            isTpl: false,
                            key: "routes/0/bricks/0/slots/content/bricks/0",
                            title: "general-button",
                            [symbolForHightlight]: true,
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
                        isTpl: false,
                        key: "routes/0/bricks/0/slots/content",
                        title: "content",
                        unlink: true,
                      },
                    ],
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
                    isTpl: false,
                    key: "routes/0/bricks/0",
                    title: "general-button",
                    [symbolForHightlight]: true,
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
                isTpl: false,
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
            isTpl: false,
            key: "routes",
            title: "routes",
          },
        ],
        matchKey: [
          "routes/0/bricks/0",
          "routes/0/bricks/0/slots/content/bricks/0",
        ],
      },
    ],
    [
      "tpl-test-1",
      {
        tree: [
          {
            $$info: {},
            children: [
              {
                $$info: {},
                children: [
                  {
                    $$info: {
                      name: "tpl-test-1",
                      nodeId: "t-01",
                      [symbolForNodeId]: "t-01",
                      parentId: "t-01",
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
                    isTpl: true,
                    key: "meta/customTemplates/0",
                    title: "tpl-test-1",
                    [symbolForHightlight]: true,
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
                isTpl: true,
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
            isTpl: false,
            key: "meta",
            title: "meta",
          },
        ],
        matchKey: ["meta/customTemplates/0"],
      },
    ],
    [
      "testA",
      {
        tree: [
          {
            $$info: {},
            children: [
              {
                $$info: {},
                children: [
                  {
                    $$info: {
                      name: "getFunctionsByCondition",
                      source: "function testA() {console.log(a)}",
                      typescript: true,
                      parentId: "",
                      [symbolForHightlight]: true,
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
                    isTpl: false,
                    key: "meta/functions/0",
                    title: "getFunctionsByCondition",
                    [symbolForHightlight]: true,
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
                isTpl: false,
                key: "meta/functions",
                title: "functions",
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
            isTpl: false,
            key: "meta",
            title: "meta",
          },
        ],
        matchKey: ["meta/functions/0"],
      },
    ],
    [
      "console.log(b)",
      {
        tree: [
          {
            $$info: {},
            children: [
              {
                $$info: {},
                children: [
                  {
                    $$info: {
                      name: "getFunctionsByCondition",
                      source: "function testB() {console.log(b)}",
                      [symbolForHightlight]: true,
                      parentId: "",
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
                    isTpl: false,
                    key: "meta/functions/1",
                    title: "getFunctionsByCondition",
                    [symbolForHightlight]: true,
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
                isTpl: false,
                key: "meta/functions",
                title: "functions",
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
            isTpl: false,
            key: "meta",
            title: "meta",
          },
        ],
        matchKey: ["meta/functions/1"],
      },
    ],
  ])("%s should return %p", (value, result) => {
    expect(
      filter({
        tree: treeData,
        text: value,
      })
    ).toEqual(result);
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
    expect(
      filter({ tree: deepTree, text: "handleHttpError" }).tree.length
    ).toBe(1);
    expect(filter({ tree: deepTree, text: "Export Success" }).tree.length).toBe(
      1
    );
  });
});

describe("searchConfig should work", () => {
  const treeData = buildTree(mockData);

  it("supportKey should work", () => {
    expect(
      filter({
        tree: treeData,
        text: "name",
        config: {
          supportKey: true,
        },
      })
    ).toMatchSnapshot();
    expect(
      filter({
        tree: treeData,
        text: "name",
        config: {
          supportKey: false,
        },
      }).tree
    ).toEqual([]);
  });

  it("supportKey should work", () => {
    expect(
      filter({
        tree: treeData,
        text: "general-button",
        config: {
          supportFullWord: true,
        },
      }).tree.length
    ).toBe(1);
    expect(
      filter({
        tree: treeData,
        text: "general-",
        config: {
          supportFullWord: false,
        },
      }).tree.length
    ).toBe(1);
  });

  it("supportWordCase should work", () => {
    expect(
      filter({
        tree: treeData,
        text: "GENERAL-BUTTON",
        config: {
          supportWordCase: true,
        },
      }).tree.length
    ).toBe(0);
    expect(
      filter({
        tree: treeData,
        text: "GENERAL-BUTTON",
        config: {
          supportWordCase: false,
        },
      }).tree.length
    ).toBe(1);
  });
});

describe("searchInfo should work", () => {
  it("work", () => {
    mockData.routes[0].bricks.push(
      ...[
        {
          brick: "general-button",
          properties: {
            test: 1,
          },
          slots: {
            content: {
              bricks: [
                {
                  brick: "general-button",
                  [symbolForNodeInstanceId]: "slots-brick",
                  [symbolForNodeId]: "s-03-01",
                },
              ],
              type: "bricks",
              [symbolForNodeInstanceId]: "slot-content",
              [symbolForNodeId]: "s-03",
            },
          },
          [symbolForNodeInstanceId]: "123123",
          [symbolForNodeId]: "B-03",
          path: "${APP.homepage}/test-1",
        },
        {
          brick: "general-deep",
          properties: {
            child: {
              useBrick: {
                brick: "general-deep-brick",
                alias: "deep",
                type: "brick",
              },
            },
          },
          [symbolForNodeInstanceId]: "234",
          [symbolForNodeId]: "B-04",
          path: "${APP.homepage}/test-2",
        },
      ]
    );
    const tree = buildTree(mockData);
    expect(
      filter({
        tree: tree,
        text: {
          brick: {
            op: operation.$like,
            text: "general-deep-brick",
          },
          alias: {
            op: operation.$eq,
            text: "deep",
          },
        },
      })
    ).toEqual({
      matchKey: ["routes/0/bricks/3"],
      tree: [
        {
          $$info: {},
          children: [
            {
              $$info: {
                parentId: "B-01",
                nodeId: "B-01",
                [symbolForNodeId]: "B-01",
                type: "bricks",
              },
              children: [
                {
                  $$info: {
                    brick: "general-deep",
                    path: "${APP.homepage}/test-2",
                    properties: {
                      child: {
                        useBrick: {
                          alias: "deep",
                          brick: "general-deep-brick",
                          type: "brick",
                        },
                        [symbolForHightlight]: true,
                      },
                      [symbolForHightlight]: true,
                    },
                    instanceId: "234",
                    nodeId: "B-04",
                    parentId: "B-01",
                    [symbolForNodeInstanceId]: "234",
                    [symbolForNodeId]: "B-04",
                    [symbolForHightlight]: true,
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
                  isTpl: false,
                  key: "routes/0/bricks/3",
                  title: "general-deep",
                  [symbolForHightlight]: true,
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
              isTpl: false,
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
          isTpl: false,
          key: "routes",
          title: "routes",
        },
      ],
    });

    expect(
      filter({
        tree: tree,
        text: {
          brick: {
            op: operation.$eq,
            text: "general-deep-brick",
          },
          alias: {
            op: operation.$like,
            text: "deep-1",
          },
        },
      })
    ).toEqual({ matchKey: [], tree: [] });

    expect(
      filter({
        tree: tree,
        text: {
          brick: {
            op: operation.$eq,
            text: "general-button",
          },
          path: {
            op: operation.$like,
            text: "${APP.homepage}/test-1",
          },
        },
      })
    ).toMatchSnapshot();
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

describe("isMatch should work", () => {
  const mockData: PlainObject = {
    a: undefined,
    b: null,
    c: 1,
    d: "123",
    e: false,
    f: {
      properties: {
        test: "hello world",
      },
      value: "fValue",
    },
    g: [
      "123",
      {
        field1: "345",
      },
      [
        {
          field2: "678",
        },
      ],
      false,
    ],
    h: "",
    i: "b",
  };

  it.each<[string, SearchInfoProps, boolean]>([
    // equal
    [
      "equal should work",
      {
        c: {
          op: operation.$eq,
          text: "1",
        },
      },
      true,
    ],
    [
      "equal should work",
      {
        c: {
          op: operation.$eq,
          text: "2",
        },
      },
      false,
    ],
    // not equal
    [
      "not equal should work",
      {
        c: {
          op: operation.$ne,
          text: "1",
        },
      },
      false,
    ],
    [
      "not equal should work",
      {
        c: {
          op: operation.$ne,
          text: "2",
        },
      },
      true,
    ],
    // like
    [
      "like should work",
      {
        f: {
          op: operation.$like,
          text: "hello world",
        },
      },
      true,
    ],
    [
      "like should work",
      {
        f: {
          op: operation.$like,
          text: "fValue",
        },
      },
      true,
    ],
    [
      "deep like should work",
      {
        g: {
          op: operation.$like,
          text: "123",
        },
      },
      true,
    ],
    [
      "deep like should work",
      {
        g: {
          op: operation.$like,
          text: "345",
        },
      },
      true,
    ],
    [
      "deep like should work",
      {
        g: {
          op: operation.$like,
          text: "678",
        },
      },
      true,
    ],
    [
      "deep like should work",
      {
        g: {
          op: operation.$like,
          text: "901",
        },
      },
      false,
    ],
    [
      "like should work",
      {
        f: {
          op: operation.$like,
          text: "hello world1",
        },
      },
      false,
    ],
    // not like
    [
      "like should work",
      {
        d: {
          op: operation.$nlike,
          text: "nlike",
        },
      },
      true,
    ],
    [
      "like should work",
      {
        f: {
          op: operation.$nlike,
          text: "hello world",
        },
      },
      false,
    ],
    [
      "like should work",
      {
        f: {
          op: operation.$nlike,
          text: "hello world1",
        },
      },
      true,
    ],
    [
      "exists should work",
      {
        f: {
          op: operation.$exists,
          text: true,
        },
      },
      true,
    ],
    [
      "exists should work",
      {
        h: {
          op: operation.$exists,
          text: false,
        },
      },
      true,
    ],
    [
      "exists should work",
      {
        f: {
          op: operation.$exists,
          text: false,
        },
      },
      false,
    ],
    // multiple condition
    [
      "multiple condition should work",
      {
        a: {
          op: operation.$exists,
          text: false,
        },
        c: {
          op: operation.$eq,
          text: "1",
        },
        d: {
          op: operation.$ne,
          text: "2",
        },
        f: {
          op: operation.$like,
          text: "hello",
        },
        g: {
          op: operation.$exists,
          text: true,
        },
      },
      true,
    ],
    [
      "multiple condition should work",
      {
        a: {
          op: operation.$exists,
          text: true,
        },
        c: {
          op: operation.$eq,
          text: "1",
        },
        d: {
          op: operation.$ne,
          text: "2",
        },
        f: {
          op: operation.$like,
          text: "hello",
        },
        g: {
          op: operation.$exists,
          text: true,
        },
      },
      true,
    ],
    // arr check
    [
      "arr check should work",
      {
        i: {
          op: operation.$eq,
          text: ["a", "b", "c"],
        },
      },
      true,
    ],
    [
      "arr check should work",
      {
        i: {
          op: operation.$eq,
          text: ["e", "f", "g"],
        },
      },
      false,
    ],
    [
      "arr check should work",
      {
        i: {
          op: operation.$ne,
          text: ["e", "f", "g"],
        },
      },
      true,
    ],
  ])("%s: (%j) should return %s", (_name, searchInfo, result) => {
    expect(isMatch(mockData, searchInfo)).toBe(result);
  });
});
