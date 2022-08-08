import * as brickKit from "@next-core/brick-kit";
import WorkbenchBackend from "./WorkbenchBackend";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import {
  WorkbenchBackendActionForInsert,
  WorkbenchBackendActionForMove,
} from "@next-types/preview";

const mockCreateInstance = jest.fn((_objectId, params) => ({
  ...params,
  instanceId: "new-iid",
  id: "new-id",
}));
const mockUpdateInstance = jest.fn();
const mockMoveInstance = jest.fn();
const mockDeleteInstance = jest.fn();
const mockBuildAndPush = jest.fn();
const mockGetGraphData = jest.fn();

jest.mock("@next-sdk/cmdb-sdk", () => ({
  InstanceApi_createInstance: (objectId, params) =>
    mockCreateInstance(objectId, params),
  InstanceApi_updateInstance: (...args) => mockUpdateInstance(args),
  InstanceArchiveApi_archiveInstance: (...args) => mockDeleteInstance(args),
  InstanceGraphApi_traverseGraphV2: (...arg) => mockGetGraphData(arg),
}));
jest.mock("@next-sdk/next-builder-sdk", () => ({
  BuildApi_buildAndPush: (...arg) => mockBuildAndPush(...arg),
  StoryboardApi_sortStoryboardNodes: (...args) => mockMoveInstance(args),
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
      },
    });

    jest.runAllTimers();
    await (global as any).flushPromises();

    expect(mockBuildAndPush).toHaveBeenNthCalledWith(1, {
      projectId: "project-a",
      storyboardJson:
        '{"routes":[{"bricks":[{"brick":"div","type":"brick"}],"type":"bricks"}]}',
    });
    await (global as any).flushPromises();

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
      },
    });
    await (global as any).flushPromises();

    expect(mockUpdateInstance).toHaveBeenNthCalledWith(1, [
      "STORYBOARD_BRICK",
      "new-iid",
      {
        properties: {
          textContent: "hello",
        },
      },
    ]);

    expect(handleBackendMessage).toHaveBeenLastCalledWith("message", {
      action: "instance-success",
      data: {
        action: "update",
        data: {
          instanceId: "mock_instanceId_001",
          objectId: "STORYBOARD_BRICK",
          property: { properties: { textContent: "hello" } },
        },
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
      },
    });
    await (global as any).flushPromises();
    expect(mockUpdateInstance).toHaveBeenNthCalledWith(2, [
      "STORYBOARD_BRICK",
      "new-iid",
      {
        properties: {
          textContent: "hello world",
        },
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
        },
      },
    });

    backendInstance.push({
      action: "move",
      data: {
        nodeIds: ["B-01", "B-02", "mock_id_001"],
      },
    } as WorkbenchBackendActionForMove);

    expect(mockUpdateInstance).toBeCalledTimes(2);

    expect(mockMoveInstance).toHaveBeenNthCalledWith(1, [
      { nodeIds: ["B-01", "B-02", "new-id"] },
    ]);
    await (global as any).flushPromises();

    backendInstance.push({
      action: "move",
      data: {
        nodeInstanceId: "new-iid",
        nodeIds: ["B-03", "new-id", "B-04"],
        nodeData: {
          parent: "new-parent",
          mountPoint: "new-content",
        },
      },
    } as WorkbenchBackendActionForMove);

    expect(mockUpdateInstance).toHaveBeenNthCalledWith(3, [
      "STORYBOARD_BRICK",
      "new-iid",
      {
        parent: "new-parent",
        mountPoint: "new-content",
      },
    ]);
    await (global as any).flushPromises();

    expect(mockMoveInstance).toHaveBeenNthCalledWith(2, [
      { nodeIds: ["B-03", "new-id", "B-04"] },
    ]);
    await (global as any).flushPromises();

    backendInstance.push({
      action: "delete",
      data: {
        objectId: "STORYBOARD_ROUTE",
        instanceId: "mock_instanceId_001",
      },
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
    });
    await (global as any).flushPromises();

    expect(mockDeleteInstance).toHaveBeenNthCalledWith(2, [
      "STORYBOARD_ROUTE",
      "abc",
    ]);

    expect(handleBackendMessage).toBeCalledTimes(8);
    backendInstance.unsubscribe(listener);

    backendInstance.push({
      action: "delete",
      data: {
        objectId: "STORYBOARD_ROUTE",
        instanceId: "abc",
      },
    });
    await (global as any).flushPromises();

    expect(handleBackendMessage).toBeCalledTimes(8);
  });

  it("throw error should work", async () => {
    const handleBackendMessage = jest.fn();
    listener = backendInstance.subscribe("message", handleBackendMessage);
    backendInstance.push({
      action: "insert",
      data: null,
    });

    await (global as any).flushPromises();

    expect(handleBackendMessage).toHaveBeenNthCalledWith(1, "message", {
      action: "error",
      data: { error: "创建实例失败" },
    });

    expect(handleBackendMessage).toHaveBeenNthCalledWith(2, "message", {
      action: "instance-fail",
      data: { action: "insert", data: null },
    });

    backendInstance.push({
      action: "update",
      data: null,
    });

    await (global as any).flushPromises();

    expect(handleBackendMessage).toHaveBeenNthCalledWith(3, "message", {
      action: "error",
      data: { error: "更新实例失败" },
    });

    expect(handleBackendMessage).toHaveBeenNthCalledWith(4, "message", {
      action: "instance-fail",
      data: { action: "update", data: null },
    });

    backendInstance.push({
      action: "move",
      data: null,
    });

    await (global as any).flushPromises();

    expect(handleBackendMessage).toHaveBeenNthCalledWith(5, "message", {
      action: "error",
      data: { error: "移动实例失败" },
    });

    expect(handleBackendMessage).toHaveBeenNthCalledWith(6, "message", {
      action: "instance-fail",
      data: { action: "move", data: null },
    });

    backendInstance.push({
      action: "delete",
      data: null,
    });

    await (global as any).flushPromises();

    expect(handleBackendMessage).toHaveBeenNthCalledWith(7, "message", {
      action: "error",
      data: { error: "删除实例失败" },
    });

    expect(handleBackendMessage).toHaveBeenNthCalledWith(8, "message", {
      action: "instance-fail",
      data: { action: "delete", data: null },
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
    } as WorkbenchBackendActionForInsert);

    expect(backendInstance.size).toBe(1);

    backendInstance.clear();

    expect(backendInstance.size).toBe(0);
  });
});
