import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WorkbenchCommonTree } from "./WorkbenchCommonTree";
import { WorkbenchNodeData } from "../shared/workbench/interfaces";

describe("WorkbenchCommonTree", () => {
  it("should work", () => {
    const nodes: WorkbenchNodeData[] = [
      {
        key: 1,
        name: "n-1",
      },
      {
        key: 2,
        name: "n-2",
      },
      {
        key: 3,
        name: "n-3",
        children: [
          {
            key: "4",
            name: "n-4",
          },
        ],
        if: true,
      },
      {
        key: 5,
        name: "n-5",
        if: false,
      },
    ];
    const mockNodeDrop = jest.fn();
    const { container } = render(
      <WorkbenchCommonTree
        allowDrag={true}
        nodes={nodes}
        handleNodeDrop={mockNodeDrop}
      />
    );
    expect(container.querySelector(".placeholder")).toBe(null);
    expect(container.querySelector(".searchBox")).toBeTruthy();
    expect(container.querySelector(".fixedActions")).toBe(null);
    expect(container.querySelector(".collapsed")).toBe(null);
    expect(container.querySelector(".collapseIcon")).toBe(null);

    const rootTree = container.querySelector(".tree");
    const firstLevelLinks = [...rootTree.children].map((child) =>
      child.querySelector(".nodeLabelRow")
    ) as HTMLElement[];
    expect(firstLevelLinks.length).toBe(3);
  });
});
