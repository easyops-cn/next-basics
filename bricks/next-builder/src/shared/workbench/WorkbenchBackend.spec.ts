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
const mockAddNode = jest.fn((appId, { objectId, instance }) => ({
  instance: {
    ...instance,
    instanceId: "new-iid",
    id: "new-id",
  },
}));
const mockEditNode = jest.fn((appId, { instance }) => ({
  instanceInfo: instance,
}));
const mockMoveInstance = jest.fn();
const mockDeleteNode = jest.fn();
const mockBuildAndPush = jest.fn();
const mockGetGraphData = jest.fn();
const mockApplyStoryBoardSnippet = jest.fn((_) => ({}));
const mockCloneBricks = jest.fn();
const mockUpdateFormItem = jest.fn();
const mockDeleteFormItem = jest.fn();
const mockCreateFormItem = jest.fn();

jest.mock("@next-sdk/cmdb-sdk", () => ({
  InstanceApi_getDetail: (...args) => mockGetDetail(args),
  InstanceGraphApi_traverseGraphV2: (...args) => mockGetGraphData(args),
}));
jest.mock("@next-sdk/next-builder-sdk", () => ({
  BuildApi_buildAndPush: (...args) => mockBuildAndPush(...args),
  StoryboardApi_sortStoryboardNodes: (...args) => mockMoveInstance(args),
  StoryboardApi_cloneBricks: (...args) => mockCloneBricks(args),
  PackageAloneApi_listDependencies: jest.fn(() => ({ list: [] })),
  PackageAloneApi_addDependencies: jest.fn(),
  StoryboardApi_addNode: (appId, params) => mockAddNode(appId, params),
  StoryboardApi_editNode: (appId, params) => mockEditNode(appId, params),
  StoryboardApi_deleteNode: (...args) => mockDeleteNode(...args),
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
  storyboardType: "micro-app",
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

    expect(mockAddNode).toHaveBeenNthCalledWith(1, "app-a", {
      objectId: "STORYBOARD_BRICK",
      instance: {
        brick: "div",
        mountPoint: "content",
        parent: "parent",
        sort: 1,
        type: "brick",
      },
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
        workflow: true,
      },
    });

    expect(handleBackendMessage).toHaveBeenNthCalledWith(
      4,
      "message",
      expect.objectContaining({
        action: "update-graph-data",
      })
    );

    expect(handleBackendMessage).toHaveBeenNthCalledWith(5, "message", {
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

    expect(mockEditNode).toHaveBeenNthCalledWith(1, "app-a", {
      objectId: "STORYBOARD_BRICK",
      instanceId: "new-iid",
      mtime: "1",
      instance: { properties: { textContent: "hello" } },
    });

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
    expect(mockEditNode).toHaveBeenNthCalledWith(2, "app-a", {
      objectId: "STORYBOARD_BRICK",
      instanceId: "new-iid",
      mtime: "2",
      instance: { properties: { textContent: "hello world" } },
    });

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

    expect(mockEditNode).toBeCalledTimes(2);

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

    expect(mockEditNode).toHaveBeenNthCalledWith(3, "app-a", {
      objectId: "STORYBOARD_BRICK",
      instanceId: "new-iid",
      instance: { mountPoint: "new-content", parent: "new-parent" },
    });
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

    expect(mockDeleteNode).toHaveBeenNthCalledWith(1, "app-a", {
      objectId: "STORYBOARD_ROUTE",
      instanceId: "new-iid",
    });

    backendInstance.push({
      action: "delete",
      data: {
        objectId: "STORYBOARD_ROUTE",
        instanceId: "abc",
      },
      state: "pending",
    });
    await (global as any).flushPromises();

    expect(mockDeleteNode).toHaveBeenNthCalledWith(2, "app-a", {
      objectId: "STORYBOARD_ROUTE",
      instanceId: "abc",
    });

    expect(handleBackendMessage).toBeCalledTimes(11);
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

    expect(handleBackendMessage).toBeCalledTimes(11);

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
      {
        appId: "app-a",
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

    expect(mockEditNode).toHaveBeenNthCalledWith(4, "app-a", {
      objectId: "STORYBOARD_ROUTE",
      instanceId: "route-a",
      mtime: "3",
      instance: { context: [{ text: "test", value: "test" }] },
    });

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
        instance_ids: ["B-1"],
        related_instance_ids: ["efg"],
        objectId: "STORYBOARD_BRICK",
      },
      state: "pending",
    });
    await (global as any).flushPromises();

    expect(mockEditNode).toHaveBeenNthCalledWith(5, "app-a", {
      objectId: "STORYBOARD_BRICK",
      instanceId: "B-1",
      instance: { parent: "efg" },
    });

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

    expect(mockAddNode).toHaveBeenNthCalledWith(2, "app-a", {
      objectId: "STORYBOARD_BRICK",
      instance: {
        brick: "div",
        mountPoint: "content",
        parent: "parent",
        type: "brick",
      },
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

    backendInstance.push({
      action: "update.formTemplate",
      state: "pending",
      args: [
        "123",
        {
          id: "123",
          projectInstanceId: "123",
          formName: "123",
        },
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

    backendInstance.push({
      action: "update.visualForm",
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

    expect(mockEditNode).toHaveBeenNthCalledWith(6, "app-a", {
      objectId: "STORYBOARD_BRICK",
      instanceId: "new-iid",
      mtime: "1",
      instance: { properties: { textContent: "hello" } },
    });

    expect(mockGetDetail).toBeCalledTimes(12);
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
