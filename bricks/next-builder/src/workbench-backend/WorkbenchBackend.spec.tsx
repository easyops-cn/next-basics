import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  BuilderRuntimeNode,
  useBuilderData,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { WorkbenchBackend } from "./WorkbenchBackend";
import * as brickKit from "@next-core/brick-kit";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("@next-core/brick-kit");

(useBuilderDataManager as jest.Mock).mockReturnValue({
  onNodeUpdate: jest.fn(),
});
(useBuilderData as jest.Mock).mockReturnValue({
  rootId: "root",
  nodes: [],
  edges: [],
});

jest.spyOn(brickKit, "getHistory").mockReturnValue({
  location: {},
} as any);

jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  getBasePath: () => "/next",
} as any);

jest.spyOn(brickKit, "getAuth").mockReturnValue({
  usename: "easyops",
} as any);

describe("WorkbenchWorker", () => {
  it("should work", () => {
    const onStoryboardUpdate = jest.fn();
    const onRootNodeUpdate = jest.fn();
    const onGraphDataUpdate = jest.fn();
    const node = {
      id: "B-1",
      instanceId: "a",
      brick: "page1",
    } as BuilderRuntimeNode;
    const wrapper = render(
      <WorkbenchBackend
        appId="app-a"
        projectId="project-a"
        objectId="STORYBOARD_ROUTE"
        rootNode={node}
        onStoryboardUpdate={onStoryboardUpdate}
        onRootNodeUpdate={onRootNodeUpdate}
        onGraphDataUpdate={onGraphDataUpdate}
      />
    );
    expect(wrapper).toBeTruthy();
  });
});
