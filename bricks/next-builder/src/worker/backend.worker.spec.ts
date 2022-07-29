import { BackendWorker, QueueItem } from "./backend.worker";
import {
  InstanceApi_createInstance,
  InstanceApi_updateInstance,
  InstanceArchiveApi_archiveInstance,
} from "@next-sdk/cmdb-sdk";
import {
  BuildApi_buildAndPush,
  StoryboardApi_sortStoryboardNodes,
} from "@next-sdk/next-builder-sdk";
import { StoryboardAssembly } from "../shared/storyboard/StoryboardAssembly";

jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/next-builder-sdk");
jest.mock("../shared/storyboard/StoryboardAssembly");

const mockCreateInstance = InstanceApi_createInstance as jest.Mock;
const mockUpdateInstance = InstanceApi_updateInstance as jest.Mock;
const mockArchiveInstance = InstanceArchiveApi_archiveInstance as jest.Mock;
const mockSortStoryboardNodes = StoryboardApi_sortStoryboardNodes as jest.Mock;
const mockBuildAndPush = BuildApi_buildAndPush as jest.Mock;
const mockStoryboardAssembly = StoryboardAssembly as jest.Mock;

mockCreateInstance.mockReturnValue({
  instanceId: "abc",
  id: "123",
});

mockStoryboardAssembly.mockReturnValue({
  projectId: "project-a",
  storyboard: JSON.stringify({ test: 1 }),
});

const postMessage = jest.fn();
const addEventListenerMock = jest.fn();

beforeAll(() => {
  (global as any).Worker = jest.fn(() => {
    const listners = [];
    return {
      postMessage: postMessage.mockImplementation((message) => {
        listners.forEach((listener) => {
          listener.callback({ data: { ...message } });
        });
      }),
      addEventListener: addEventListenerMock.mockImplementation(
        (event, callback) => {
          listners.push({ event, callback });
        }
      ),
    };
  });
});

describe("Draft should work", () => {
  it("test", async () => {
    const worker = new Worker("");
    const backendWorker = new BackendWorker(worker);
    backendWorker.init({
      appId: "app-a",
      basePath: "/next",
      projectId: "project-a",
    });

    const insertData = {
      action: "insert",
      data: {
        brick: "brick-a",
        parent: "abc",
        mountPoint: "content",
        type: "brick",
        sort: 1,
        nodeData: {},
      },
    } as QueueItem;

    const updateData = {
      action: "update",
      data: {
        objectId: "STORYBOARD_BRICK",
        instanceId: "abc",
        property: {
          bg: true,
        },
      },
    } as QueueItem;

    const moveData = {
      action: "move",
      data: {
        nodeIds: ["b-1", "b-2"],
      },
    } as QueueItem;

    const deleteData = {
      action: "delete",
      data: {
        objectId: "STORYBOARD_BRICK",
        instanceId: "abc",
      },
    } as QueueItem;

    backendWorker.push(insertData);
    backendWorker.push(updateData);
    backendWorker.push(moveData);
    backendWorker.push(deleteData);

    await (global as any).flushPromises();

    expect(mockCreateInstance).toHaveBeenNthCalledWith(1, "STORYBOARD_BRICK", {
      brick: "brick-a",
      parent: "abc",
      mountPoint: "content",
      type: "brick",
      sort: 1,
    });
    expect(mockUpdateInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_BRICK",
      "abc",
      {
        bg: true,
      }
    );
    expect(mockArchiveInstance).toHaveBeenNthCalledWith(
      1,
      "STORYBOARD_BRICK",
      "abc"
    );
    expect(mockSortStoryboardNodes).toHaveBeenNthCalledWith(1, {
      nodeIds: ["b-1", "b-2"],
    });

    expect(mockBuildAndPush).toBeCalledTimes(0);

    jest.runAllTimers();
    await (global as any).flushPromises();

    expect(backendWorker.size).toBe(0);

    expect(mockBuildAndPush).toBeCalledTimes(1);
  });
});
