import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CacheActionList } from "./CacheActionList";
import { QueueItem } from "../shared/workbench/WorkbenchBackend";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";

describe("WorkbenchWorker", () => {
  it("empty list should work", () => {
    const { baseElement } = render(
      <CacheActionList cacheActionList={[]} nodeCache={new Map()} />
    );
    expect(baseElement.innerHTML).toMatchInlineSnapshot(
      `"<div><div class=\\"cacheActionListWrapper\\">暂无变更</div></div>"`
    );
  });

  it("sholud render list", () => {
    const cacheActionList = [
      {
        action: "insert",
        state: "resolve",
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
      },
      {
        action: "insert",
        state: "resolve",
        data: {
          brick: "div",
          mountPoint: "content",
          parent: "parent",
          sort: 1,
          type: "brick",
          nodeData: {
            instanceId: "mock_instanceId_002",
            id: "mock_id_002",
          },
        },
      },
      {
        action: "update",
        state: "resolve",
        data: {
          objectId: "STORYBOARD_BRICK",
          instanceId: "mock_instanceId_001",
          property: {
            properties: {
              textContent: "hello",
            },
          },
        },
      },
      {
        action: "update",
        state: "resolve",
        data: {
          objectId: "STORYBOARD_BRICK",
          instanceId: "new-iid",
          property: {
            properties: {
              textContent: "hello world",
            },
          },
        },
      },
      {
        action: "move",
        state: "resolve",
        data: {
          nodeIds: ["B-01", "B-02", "mock_id_001"],
        },
      },
      {
        action: "delete",
        state: "reject",
        data: {
          objectId: "STORYBOARD_ROUTE",
          instanceId: "mock_instanceId_001",
        },
      },
      {
        action: "delete",
        state: "pending",
        data: {
          objectId: "STORYBOARD_ROUTE",
          instanceId: "abc",
        },
      },
      {
        action: "copy.data",
        state: "pending",
        data: null,
        sourceName: "test1",
      },
      {
        action: "insert.snippet",
        state: "pending",
        data: {
          brick: "base-layout.page-1",
        },
      },
      {
        action: "copy.brick",
        state: "pending",
        data: {
          sourceBrickId: "B-123",
        },
      },
      {
        action: "cut.brick",
        state: "pending",
        data: {
          sourceBrickId: "B-456",
        },
      },
    ] as QueueItem[];

    const nodeCache = new Map([
      ["mock_instanceId_001", { id: "new-iid-001" }],
      ["abc", { id: "abc-id" }],
      ["mock_instanceId_002", { id: "B-001" }],
    ]) as Map<string, BuilderRuntimeNode>;

    const { baseElement } = render(
      <CacheActionList
        cacheActionList={cacheActionList}
        nodeCache={nodeCache}
      />
    );
    expect(baseElement.innerHTML).toMatchInlineSnapshot(
      `"<div><div class=\\"cacheActionListWrapper\\"><div class=\\"cacheActionItem\\"><span title=\\"粘贴构件: [B-456]\\">粘贴构件: [B-456]</span><span class=\\"pending\\">处理中</span></div><div class=\\"cacheActionItem\\"><span title=\\"粘贴构件: [B-123]\\">粘贴构件: [B-123]</span><span class=\\"pending\\">处理中</span></div><div class=\\"cacheActionItem\\"><span title=\\"新增片段: [base-layout.page-1]\\">新增片段: [base-layout.page-1]</span><span class=\\"pending\\">处理中</span></div><div class=\\"cacheActionItem\\"><span title=\\"粘贴数据: [test1]\\">粘贴数据: [test1]</span><span class=\\"pending\\">处理中</span></div><div class=\\"cacheActionItem\\"><span title=\\"删除实例: [abc-id]\\">删除实例: [abc-id]</span><span class=\\"pending\\">处理中</span></div><div class=\\"cacheActionItem\\"><span title=\\"删除实例: [new-iid-001]\\">删除实例: [new-iid-001]</span><span class=\\"reject\\">失败</span></div><div class=\\"cacheActionItem\\"><span title=\\"移动实例: [B-01,B-02,mock_id_001]\\">移动实例: [B-01,B-02,mock_id_001]</span><span class=\\"resolve\\">完成</span></div><div class=\\"cacheActionItem\\"><span title=\\"更新实例: [undefined]\\">更新实例: [undefined]</span><span class=\\"resolve\\">完成</span></div><div class=\\"cacheActionItem\\"><span title=\\"更新实例: [new-iid-001]\\">更新实例: [new-iid-001]</span><span class=\\"resolve\\">完成</span></div><div class=\\"cacheActionItem\\"><span title=\\"新增实例: [B-001]\\">新增实例: [B-001]</span><span class=\\"resolve\\">完成</span></div><div class=\\"cacheActionItem\\"><span title=\\"新增实例: [new-iid-001]\\">新增实例: [new-iid-001]</span><span class=\\"resolve\\">完成</span></div></div></div>"`
    );
  });
});
