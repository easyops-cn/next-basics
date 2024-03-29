import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import {
  BuilderRuntimeNode,
  useBuilderData,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import {
  WorkbenchCacheAction,
  WorkbenchCacheActionProps,
  WorkbenchCacheActionRef,
} from "./WorkbenchCacheAction";
import * as brickKit from "@next-core/brick-kit";
import {
  WorkbenchBackendActionForInsert,
  WorkbenchBackendActionForInsertFormItem,
} from "@next-types/preview";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("@next-core/brick-kit");

let mockData = {
  rootId: 1,
  nodes: [
    {
      brick: "page-a",
      $$uid: 1,
      instanceId: "route-a",
      path: "/page-a",
      type: "bricks",
    },
    {
      brick: "brick-b",
      $$uid: 2,
      $$normalized: {
        properties: {
          data: "<% CTX.dataB %>",
        },
      },
      instanceId: "brick-b",
      type: "brick",
    },
    {
      brick: "brick-c",
      $$uid: 3,
      instanceId: "brick-c",
      $$normalized: {
        events: {
          click: {
            action: "console.log",
            args: ["<% CTX.dataA %>"],
          },
        },
      },
      type: "brick",
    },
    {
      brick: "eo-button",
      $$uid: 4,
      instanceId: "brick-d",
      type: "brick",
    },
  ],
  edges: [
    {
      parent: 1,
      child: 2,
      mountPoint: "content",
      sort: 0,
    },
    {
      parent: 1,
      child: 3,
      mountPoint: "content",
      sort: 1,
    },
    {
      parent: 1,
      child: 4,
      mountPoint: "content",
      sort: 2,
    },
  ],
};

const mockOnNodeUpdate = jest.fn((data) => () => data);
const mockUpdateNode = jest.fn((data) => mockOnNodeUpdate(data));
const mockDeleteNode = jest.fn();

(useBuilderDataManager as jest.Mock).mockReturnValue({
  nodeAdd: jest.fn(() => {
    mockData = { ...mockData };
  }),
  workbenchNodeAdd: jest.fn(() => {
    mockData = { ...mockData };
  }),
  updateNode: mockUpdateNode,
  onNodeUpdate: mockOnNodeUpdate,
  nodeDelete: mockDeleteNode,
});
(useBuilderData as jest.Mock).mockReturnValue(mockData);

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {},
} as any);

jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  getBasePath: () => "/next",
} as any);

describe("WorkbenchWorker", () => {
  it("should work", async () => {
    const onStoryboardUpdate = jest.fn();
    const onRootNodeUpdate = jest.fn();
    const onGraphDataUpdate = jest.fn();
    const onExecuteSuccess = jest.fn();
    const onSnippetSuccess = jest.fn();
    const node = {
      $$uid: 1,
      id: "B-1",
      instanceId: "route-a",
      brick: "page1",
    } as BuilderRuntimeNode;

    const cacheActionRef = createRef<WorkbenchCacheActionRef>();

    const props = {
      ref: cacheActionRef,
      appId: "app-a",
      projectId: "project-a",
      objectId: "STORYBOARD_ROUTE",
      rootNode: node,
      onStoryboardUpdate: onStoryboardUpdate,
      onRootNodeUpdate: onRootNodeUpdate,
      onGraphDataUpdate: onGraphDataUpdate,
      onExecuteSuccess: onExecuteSuccess,
      onSnippetSuccess: onSnippetSuccess,
    } as WorkbenchCacheActionProps;
    const { baseElement } = render(<WorkbenchCacheAction {...props} />);
    const cacheAction = cacheActionRef.current;

    expect(cacheAction.getInstanceDetail("route-a")).toEqual({
      $$uid: 1,
      brick: "page-a",
      instanceId: "route-a",
      path: "/page-a",
      type: "bricks",
      mountPoint: undefined,
      parent: [undefined],
    });

    expect(cacheAction.getInstanceDetail("brick-b")).toEqual({
      $$normalized: { properties: { data: "<% CTX.dataB %>" } },
      $$uid: 2,
      brick: "brick-b",
      children: [],
      type: "brick",
      instanceId: "brick-b",
      mountPoint: "content",
      parent: [
        {
          $$uid: 1,
          brick: "page-a",
          instanceId: "route-a",
          path: "/page-a",
          type: "bricks",
        },
      ],
    });

    const result = cacheAction.cacheAction({
      action: "get",
      data: {
        instanceId: "brick-c",
      },
    });

    expect(result).toEqual({
      $$normalized: {
        events: { click: { action: "console.log", args: ["<% CTX.dataA %>"] } },
      },
      $$uid: 3,
      children: [],
      action: "get",
      brick: "brick-c",
      instanceId: "brick-c",
      mountPoint: "content",
      type: "brick",
      parent: [
        {
          $$uid: 1,
          brick: "page-a",
          instanceId: "route-a",
          path: "/page-a",
          type: "bricks",
        },
      ],
    });

    expect(baseElement.getElementsByClassName("tips").length).toBe(0);

    act(() => {
      cacheAction.cacheAction({
        action: "insert",
        data: {
          brick: "div",
          mountPoint: "content",
          parent: "route-a",
          sort: 1,
          type: "brick",
          nodeData: {
            instanceId: "mock_instanceId_001",
            id: "mock_id_001",
          },
        },
      } as WorkbenchBackendActionForInsert);
    });

    expect(onStoryboardUpdate).toHaveBeenNthCalledWith(1, {
      settings: undefined,
      storyboard: {
        brick: "page-a",
        path: "/page-a",
        iid: "route-a",
        bricks: [
          { alias: "brick-b", brick: "brick-b", iid: "brick-b" },
          { alias: "brick-c", brick: "brick-c", iid: "brick-c" },
          { alias: "eo-button", brick: "eo-button", iid: "brick-d" },
        ],
        type: "bricks",
      },
      updateStoryboardType: "route",
    });

    expect(baseElement.getElementsByClassName("tips")[0].innerHTML).toBe("1");

    act(() => {
      cacheAction.cacheAction({
        action: "update",
        data: {
          objectId: "STORYBOARD_BRICK",
          instanceId: "brick-b",
          property: {
            properties: JSON.stringify({
              textContent: "hello",
            }),
          },
          mtime: "1",
        },
      });
    });

    const result2 = cacheAction.cacheAction({
      action: "get",
      data: {
        instanceId: "brick-b",
      },
    });

    expect(result2).toEqual({
      $$isMock: false,
      $$normalized: { properties: { data: "<% CTX.dataB %>" } },
      $$uid: 2,
      action: "get",
      brick: "brick-b",
      children: [],
      instanceId: "brick-b",
      mountPoint: "content",
      parent: [
        {
          $$uid: 1,
          brick: "page-a",
          instanceId: "route-a",
          path: "/page-a",
          type: "bricks",
        },
      ],
      properties: '{"textContent":"hello"}',
      type: "brick",
    });

    act(() => {
      cacheAction.cacheAction({
        action: "delete",
        data: {
          objectId: "STORYBOARD_BRICK",
          instanceId: "brick-b",
        },
      });
    });

    cacheAction.cacheAction({
      action: "get",
      data: {
        instanceId: "brick-b",
      },
    });

    expect(mockDeleteNode).toBeCalledWith({ $$uid: 2 });

    act(() => {
      cacheAction.cacheAction({
        action: "update",
        data: {
          objectId: "STORYBOARD_ROUTE",
          instanceId: "route-a",
          property: {
            path: "/page-a/1",
          },
          mtime: "1",
        },
      });
    });
    expect(onRootNodeUpdate).toBeCalledWith({
      $$uid: 1,
      brick: "page-a",
      instanceId: "route-a",
      mountPoint: undefined,
      parent: [undefined],
      path: "/page-a/1",
      type: "bricks",
    });

    act(() => {
      cacheAction.cacheAction({
        action: "insert.formItem",
        nodeData: {
          brick: "div",
          mountPoint: "content",
          parentItemId: "route-a",
          sort: 1,
          type: "brick",
          id: "mock_instanceId_001",
        },
        type: "insertByField",
      } as WorkbenchBackendActionForInsertFormItem);
    });
    expect(useBuilderDataManager).toBeCalledTimes(6);

    act(() => {
      cacheAction.cacheAction({
        action: "update.visualForm",
        data: {
          objectId: "STORYBOARD_BRICK",
          instanceId: "brick-b",
          property: {
            properties: JSON.stringify({
              easyops_form_hidden_rules: [
                {
                  title: "显示d",
                  conditions: {
                    groups: [
                      {
                        groupId: "group_13785",
                        conditions: [
                          {
                            origin: "单选框(radio)",
                            operation: "equal",
                            value: "true",
                            op: "and",
                            conditionId: "condition_13784",
                          },
                        ],
                      },
                    ],
                    op: "and",
                  },
                  actions: [
                    {
                      actionType: "show",
                      target: "d(d)",
                    },
                  ],
                  actionType: "display",
                  eventId: "__event_13694",
                  eventType: "",
                  origin: "",
                  target: "",
                },
              ],
            }),
          },
          mtime: "1",
        },
      });
    });

    expect(useBuilderDataManager).toBeCalledTimes(7);

    act(() => {
      cacheAction.cacheAction({
        action: "insert.snippet",
        data: {
          nodeData: {
            brick: "presentational-bricks.brick-table[normal]",
            params: {
              test: {
                type: "string",
                defaultValue: "come from snippetParams",
              },
            },
            data: [
              {
                name: "testGood",
                value: "<%! SNIPPET_PARAMS.test %>",
              },
              {
                name: "dataSourceList",
                resolve: {
                  useProvider: "providers-of-cmdb.instance-api-post-search",
                  args: [
                    "APP",
                    {
                      fields: {
                        "*": true,
                      },
                    },
                  ],
                },
              },
            ],
            bricks: [
              {
                brick: "presentational-bricks.brick-table",
                properties: {
                  columns: [
                    {
                      title: "Name",
                      dataIndex: "name",
                    },
                    {
                      title: "ctime",
                      dataIndex: "ctime",
                      useBrick: [
                        {
                          brick: "span",
                          properties: {
                            textContent: "<% DATA.cellData %>",
                          },
                        },
                      ],
                    },
                    {
                      title: "test",
                      dataIndex: "test",
                      useBrick: [
                        {
                          brick: "span",
                          properties: {
                            textContent: "<%! SNIPPET_PARAMS.test %>",
                          },
                        },
                      ],
                    },
                  ],

                  dataSource: "<%@ CTX_OR_STATE.dataSourceList %>",
                },
              },
            ],
          },
          snippetContext: {
            rootInstanceId: "route-a",
            rootType: "route",
            inputParams: {
              test: "hello",
            },
          },
        },
      });
    });

    expect(useBuilderDataManager).toBeCalledTimes(8);

    act(() => {
      cacheAction.showMessage({ content: "hello world", show: true });
    });

    expect(screen.getByText("hello world")).toBeInTheDocument();
  });
});
