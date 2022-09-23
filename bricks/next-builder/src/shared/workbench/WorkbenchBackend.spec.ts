import * as brickKit from "@next-core/brick-kit";
import WorkbenchBackend from "./WorkbenchBackend";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import {
  WorkbenchBackendActionForInsert,
  WorkbenchBackendActionForInsertSnippet,
  WorkbenchBackendActionForMove,
} from "@next-types/preview";

const mockGetDetail = jest.fn((_) => ({
  mTime: "2",
}));
const mockCreateInstance = jest.fn((_objectId, params) => ({
  ...params,
  instanceId: "new-iid",
  id: "new-id",
}));
const mockUpdateIntanceByQuery = jest.fn((_) => ({
  successTotal: 1,
}));
const mockMoveInstance = jest.fn();
const mockDeleteInstance = jest.fn();
const mockBuildAndPush = jest.fn();
const mockGetGraphData = jest.fn();
const mockApplyStoryBoardSnippet = jest.fn((_) => ({}));
const mockCloneBricks = jest.fn();
const mockCutBricks = jest.fn();
const mockUpdateFormItem = jest.fn();
const mockDeleteFormItem = jest.fn();
const mockCreateFormItem = jest.fn();

jest.mock("@next-sdk/cmdb-sdk", () => ({
  InstanceApi_getDetail: (...args) => mockGetDetail(args),
  InstanceApi_createInstance: (objectId, params) =>
    mockCreateInstance(objectId, params),
  InstanceApi_updateByQuery: (...args) => mockUpdateIntanceByQuery(args),
  InstanceArchiveApi_archiveInstance: (...args) => mockDeleteInstance(args),
  InstanceGraphApi_traverseGraphV2: (...args) => mockGetGraphData(args),
  InstanceRelationApi_set: (...args) => mockCutBricks(args),
}));
jest.mock("@next-sdk/next-builder-sdk", () => ({
  BuildApi_buildAndPush: (...args) => mockBuildAndPush(...args),
  StoryboardApi_sortStoryboardNodes: (...args) => mockMoveInstance(args),
  StoryboardApi_cloneBricks: (...args) => mockCloneBricks(args),
}));

jest.mock("@next-sdk/form-builder-service-sdk", () => ({
  FormProjectApi_updateFormItem: (...args) => mockUpdateFormItem(...args),
  FormProjectApi_deleteFormItem: (...args) => mockDeleteFormItem(args),
  FormProjectApi_createFormItem: (...args) => mockCreateFormItem(args),
}));
jest.mock("@next-core/brick-kit");

jest.mock("../storyboard/StoryboardAssembly", () => ({
  StoryboardAssembly: () => ({
    projectId: "project-a",
    storyboard: {
      routes: [
        {
          bricks: [
            {
              brick: "div",
              type: "brick",
            },
          ],
          type: "bricks",
        },
      ],
    },
  }),
}));

jest.mock("../../data-providers/ApplyStoryboardSnippet", () => ({
  ApplyStoryBoardSnippet: (...args) => mockApplyStoryBoardSnippet(args),
}));

jest.spyOn(brickKit, "getAuth").mockReturnValue({
  username: "easyops",
} as any);

const rootNode = {
  id: "page-1",
  instanceId: "route-a",
} as BuilderRuntimeNode;

const backendInstance = WorkbenchBackend.getInstance({
  appId: "app-a",
  projectId: "project-a",
  objectId: "STORYBOARD_ROUTE",
  rootNode,
  delayBuildTime: 30,
});

let listener: string;

afterEach(() => {
  jest.clearAllMocks();
  backendInstance.unsubscribe(listener);
});

describe("WorkbenchBackend should work", () => {
  it("batchDealRequest and listen should be work", async () => {
    const handleBackendMessage = jest.fn();
    listener = backendInstance.subscribe("message", handleBackendMessage);
    backendInstance.push({
      action: "insert",
      data: {
        brick: "div",
        mountPoint: "content",
        parent: "parent",
        sort: 1,
        type: "brick",
        nodeData: {
          instanceId: "mock_instanceId_001",
          id: "mock_id_001",
        },
      },
      state: "pending",
    } as WorkbenchBackendActionForInsert);

    await (global as any).flushPromises();

    expect(mockCreateInstance).toHaveBeenNthCalledWith(1, "STORYBOARD_BRICK", {
      brick: "div",
      mountPoint: "content",
      parent: "parent",
      sort: 1,
      type: "brick",
    });

    await (global as any).flushPromises();

    expect(backendInstance.size).toBe(0);

    expect(handleBackendMessage).toHaveBeenNthCalledWith(1, "message", {
      action: "insert",
      data: {
        brick: "div",
        mountPoint: "content",
        nodeData: { id: "mock_id_001", instanceId: "mock_instanceId_001" },
        parent: "parent",
        sort: 1,
        type: "brick",
      },
      newData: {
        brick: "div",
        id: "new-id",
        instanceId: "new-iid",
        mountPoint: "content",
        parent: "parent",
        sort: 1,
        type: "brick",
      },
    });
    expect(handleBackendMessage).toHaveBeenLastCalledWith("message", {
      action: "instance-success",
      data: {
        action: "insert",
        data: {
          brick: "div",
          mountPoint: "content",
          nodeData: { id: "mock_id_001", instanceId: "mock_instanceId_001" },
          parent: "parent",
          sort: 1,
          type: "brick",
        },
        state: "pending",
      },
    });

    jest.runAllTimers();
    await (global as any).flushPromises();

    expect(handleBackendMessage).toHaveBeenNthCalledWith(3, "message", {
      action: "build-start",
    });

    expect(mockBuildAndPush).toHaveBeenNthCalledWith(1, {
      projectId: "project-a",
      storyboardJson:
        '{"routes":[{"bricks":[{"brick":"div","type":"brick"}],"type":"bricks"}]}',
      ignoredResources: {
        menus: true,
        image: true,
      },
    });

    expect(handleBackendMessage).toHaveBeenNthCalledWith(4, "message", {
      action: "build-success",
      data: {
        storyboard: {
          routes: [
            { bricks: [{ brick: "div", type: "brick" }], type: "bricks" },
          ],
        },
      },
    });
    await (global as any).flushPromises();

    expect(mockGetDetail).toBeCalledTimes(0);

    backendInstance.push({
      action: "update",
      data: {
        objectId: "STORYBOARD_BRICK",
        instanceId: "mock_instanceId_001",
        property: {
          properties: {
            textContent: "hello",
          },
        },
        mtime: "1",
      },
      state: "pending",
    });
    await (global as any).flushPromises();

    expect(mockUpdateIntanceByQuery).toHaveBeenNthCalledWith(1, [
      "STORYBOARD_BRICK",
      {
        data: { properties: { textContent: "hello" } },
        query: { instanceId: { $eq: "new-iid" }, mtime: { $eq: "1" } },
      },
    ]);

    expect(mockGetDetail).toBeCalledTimes(1);

    expect(handleBackendMessage).toHaveBeenLastCalledWith("message", {
      action: "instance-success",
      data: {
        action: "update",
        data: {
          instanceId: "mock_instanceId_001",
          objectId: "STORYBOARD_BRICK",
          property: { properties: { textContent: "hello" } },
          mtime: "1",
        },
        state: "pending",
      },
    });

    expect(mockBuildAndPush).toBeCalledTimes(1);

    backendInstance.push({
      action: "update",
      data: {
        objectId: "STORYBOARD_BRICK",
        instanceId: "new-iid",
        property: {
          properties: {
            textContent: "hello world",
          },
        },
        mtime: "2",
      },
      state: "pending",
    });
    await (global as any).flushPromises();
    expect(mockUpdateIntanceByQuery).toHaveBeenNthCalledWith(2, [
      "STORYBOARD_BRICK",
      {
        data: { properties: { textContent: "hello world" } },
        query: { instanceId: { $eq: "new-iid" }, mtime: { $eq: "2" } },
      },
    ]);

    expect(handleBackendMessage).toHaveBeenLastCalledWith("message", {
      action: "instance-success",
      data: {
        action: "update",
        data: {
          instanceId: "new-iid",
          objectId: "STORYBOARD_BRICK",
          property: { properties: { textContent: "hello world" } },
          mtime: "2",
        },
        state: "pending",
      },
    });

    expect(mockGetDetail).toBeCalledTimes(2);

    backendInstance.push({
      action: "move",
      data: {
        nodeIds: ["B-01", "B-02", "mock_id_001"],
        nodeInstanceIds: ["a", "b", "c"],
      },
      state: "pending",
    } as WorkbenchBackendActionForMove);

    expect(mockUpdateIntanceByQuery).toBeCalledTimes(2);

    expect(mockMoveInstance).toHaveBeenNthCalledWith(1, [
      { nodeIds: ["B-01", "B-02", "new-id"] },
    ]);
    await (global as any).flushPromises();

    expect(mockGetDetail).toBeCalledTimes(5);

    backendInstance.push({
      action: "move",
      data: {
        nodeInstanceId: "new-iid",
        nodeIds: ["B-03", "new-id", "B-04"],
        nodeInstanceIds: ["a", "b", "c"],
        nodeData: {
          parent: "new-parent",
          mountPoint: "new-content",
        },
        objectId: "STORYBOARD_BRICK",
      },
      state: "pending",
    } as WorkbenchBackendActionForMove);

    expect(mockUpdateIntanceByQuery).toHaveBeenNthCalledWith(3, [
      "STORYBOARD_BRICK",
      {
        data: { mountPoint: "new-content", parent: "new-parent" },
        query: { instanceId: { $eq: "new-iid" } },
      },
    ]);
    await (global as any).flushPromises();

    expect(mockMoveInstance).toHaveBeenNthCalledWith(2, [
      { nodeIds: ["B-03", "new-id", "B-04"] },
    ]);
    expect(mockGetDetail).toBeCalledTimes(8);
    await (global as any).flushPromises();

    backendInstance.push({
      action: "delete",
      data: {
        objectId: "STORYBOARD_ROUTE",
        instanceId: "mock_instanceId_001",
      },
      state: "pending",
    });

    expect(mockDeleteInstance).toHaveBeenNthCalledWith(1, [
      "STORYBOARD_ROUTE",
      "new-iid",
    ]);

    backendInstance.push({
      action: "delete",
      data: {
        objectId: "STORYBOARD_ROUTE",
        instanceId: "abc",
      },
      state: "pending",
    });
    await (global as any).flushPromises();

    expect(mockDeleteInstance).toHaveBeenNthCalledWith(2, [
      "STORYBOARD_ROUTE",
      "abc",
    ]);

    expect(handleBackendMessage).toBeCalledTimes(10);
    backendInstance.unsubscribe(listener);

    backendInstance.push({
      action: "delete",
      data: {
        objectId: "STORYBOARD_ROUTE",
        instanceId: "abc",
      },
      state: "pending",
    });
    await (global as any).flushPromises();

    expect(handleBackendMessage).toBeCalledTimes(10);

    // @ts-ignore
    backendInstance.mockNodeIdCache.set("mock_id_1", "new-id");
    // @ts-ignore
    backendInstance.mockInstanceIdCache.set("mock_intanceId_1", "new-iid");

    backendInstance.push({
      action: "insert.snippet",
      data: {
        snippetData: {
          nodeIds: ["mock_id_1", "B-1"],
          nodeDetails: [
            {
              nodeUid: 1,
              parentUid: 1,
              nodeData: {
                brick: "brick-a",
                type: "brick",
                mountPoint: "a",
                parent: "mock_intanceId_1",
              },
              children: [
                {
                  nodeUid: 2,
                  parentUid: 2,
                  nodeData: {
                    brick: "brick-a",
                    type: "brick",
                    mountPoint: "b",
                    parent: "123",
                  },
                },
              ],
            },
          ],
        },
      },
      state: "pending",
    } as WorkbenchBackendActionForInsertSnippet);
    await (global as any).flushPromises();

    expect(mockApplyStoryBoardSnippet).toHaveBeenNthCalledWith(1, [
      {
        nodeDetails: [
          {
            children: [
              {
                nodeData: {
                  brick: "brick-a",
                  mountPoint: "b",
                  parent: "123",
                  type: "brick",
                },
                nodeUid: 2,
                parentUid: 2,
              },
            ],
            nodeData: {
              brick: "brick-a",
              mountPoint: "a",
              parent: "new-iid",
              type: "brick",
            },
            nodeUid: 1,
            parentUid: 1,
          },
        ],
        nodeIds: ["new-id", "B-1"],
      },
    ]);

    backendInstance.push({
      action: "copy.data",
      data: {
        objectId: "STORYBOARD_ROUTE",
        instanceId: "route-a",
        property: {
          context: [
            {
              text: "test",
              value: "test",
            },
          ],
        },
        mtime: "3",
      },
      state: "pending",
      sourceName: "test",
    });
    await (global as any).flushPromises();

    expect(mockUpdateIntanceByQuery).toHaveBeenNthCalledWith(4, [
      "STORYBOARD_ROUTE",
      {
        data: { context: [{ text: "test", value: "test" }] },
        query: { instanceId: { $eq: "route-a" }, mtime: { $eq: "3" } },
      },
    ]);

    backendInstance.push({
      action: "copy.brick",
      data: {
        sourceBrickId: "abc",
        newParentBrickId: "efg",
        newAppId: "xxx",
      },
      state: "pending",
    });
    await (global as any).flushPromises();

    expect(mockCloneBricks).toBeCalled();

    backendInstance.push({
      action: "cut.brick",
      data: {
        sourceBrickId: "general-text",
        instance_ids: ["B-1", "B-2"],
        related_instance_ids: ["efg"],
      },
      state: "pending",
    });
    await (global as any).flushPromises();

    expect(mockCutBricks).toBeCalled();

    expect(mockGetDetail).toBeCalledTimes(9);
    expect(mockMoveInstance).toBeCalledTimes(2);

    backendInstance.push({
      action: "insert",
      data: {
        brick: "div",
        mountPoint: "content",
        parent: "parent",
        type: "brick",
        nodeData: {
          instanceId: "mock_instanceId_002",
          id: "mock_id_002",
        },
        sortData: {
          nodeIds: ["B-1", "mock_id_002"],
          nodeUids: [1, 2],
          nodeInstanceIds: ["abc", "mock_instanceId_00"],
        },
      },
      state: "pending",
    } as WorkbenchBackendActionForInsert);

    await (global as any).flushPromises();

    expect(mockCreateInstance).toHaveBeenNthCalledWith(2, "STORYBOARD_BRICK", {
      brick: "div",
      mountPoint: "content",
      parent: "parent",
      type: "brick",
    });

    expect(mockMoveInstance).toHaveBeenNthCalledWith(3, [
      { nodeIds: ["B-1", "new-id"] },
    ]);
    expect(mockGetDetail).toBeCalledTimes(11);

    backendInstance.push({
      action: "insert.formItem",
      nodeData: {},
      state: "pending",
      args: [{ formTemplateId: "123", id: "test", isDraft: true }, ""],
    });
    await (global as any).flushPromises();

    expect(mockCreateFormItem).toHaveBeenCalledWith([
      { formTemplateId: "123", id: "test", isDraft: true },
      "",
    ]);

    backendInstance.push({
      action: "update.formItem",
      state: "pending",
      args: [
        "123",
        { formTemplateId: "123", brick: "test", isDraft: true },
        "",
      ],
    });
    await (global as any).flushPromises();

    expect(mockUpdateFormItem).toHaveBeenCalledWith("123", {
      formTemplateId: "123",
      brick: "test",
      isDraft: true,
    });

    backendInstance.push({
      action: "delete.formItem",
      state: "pending",
      args: ["123", ""],
    });
    await (global as any).flushPromises();

    expect(mockDeleteFormItem).toHaveBeenCalledWith(["123", ""]);
  });

  it("throw error should work", async () => {
    const handleBackendMessage = jest.fn();
    listener = backendInstance.subscribe("message", handleBackendMessage);
    backendInstance.push({
      action: "insert",
      data: null,
      state: "pending",
    });

    await (global as any).flushPromises();

    expect(handleBackendMessage).toHaveBeenNthCalledWith(1, "message", {
      action: "error",
      data: { error: "创建实例失败" },
    });

    backendInstance.push({
      action: "update",
      data: null,
      state: "pending",
    });

    await (global as any).flushPromises();

    expect(handleBackendMessage).toHaveBeenNthCalledWith(2, "message", {
      action: "error",
      data: { error: "更新实例失败" },
    });

    backendInstance.push({
      action: "move",
      data: null,
      state: "pending",
    });

    await (global as any).flushPromises();

    expect(handleBackendMessage).toHaveBeenNthCalledWith(3, "message", {
      action: "error",
      data: { error: "移动实例失败" },
    });

    backendInstance.push({
      action: "delete",
      data: null,
      state: "pending",
    });

    await (global as any).flushPromises();

    expect(handleBackendMessage).toHaveBeenNthCalledWith(4, "message", {
      action: "error",
      data: { error: "删除实例失败" },
    });
  });

  it("clear should work", async () => {
    backendInstance.push({
      action: "insert",
      data: {
        brick: "div",
        mountPoint: "content",
        parent: "parent",
        sort: 1,
        type: "brick",
        nodeData: {
          instanceId: "mock_instanceId_001",
          id: "mock_id_001",
        },
      },
      state: "pending",
    } as WorkbenchBackendActionForInsert);

    expect(backendInstance.size).toBe(1);

    backendInstance.clear();

    expect(backendInstance.size).toBe(0);
  });
});
