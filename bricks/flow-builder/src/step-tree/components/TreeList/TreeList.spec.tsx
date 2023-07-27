import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TreeList } from "./TreeList";
import { WorkbenchTreeContext } from "../../constants";
import { StepTreeNodeData } from "../../../interfaces";
import { createHistory } from "@next-core/brick-kit";

createHistory();

jest.mock("@next-libs/visual-builder", () => ({
  WorkbenchMiniActionBar: function () {
    return "miniActionBar";
  },
}));

describe("TreeList", () => {
  it("should work", () => {
    const props = {
      nodes: [
        {
          key: "root",
          name: "root",
          data: {
            id: "root",
            type: "task",
            name: "start",
            next: "step1",
          },
          icon: {
            lib: "antd",
            theme: "outlined",
            icon: "forward",
            color: "var(--palette-cyan-6)",
          },
        },
        {
          key: "step1",
          name: "step1",
          data: {
            id: "step1",
            type: "switch",
            name: "step1",
            next: "step5",
            children: ["branch3", "branch1", "branch2"],
          },
          icon: {
            lib: "antd",
            theme: "outlined",
            icon: "rollback",
            color: "var(--palette-indigo-6)",
          },
          children: [
            {
              key: "branch3",
              name: "branch3",
              icon: {
                lib: "antd",
                theme: "outlined",
                icon: "node-expand",
                color: "var(--palette-yellow-6)",
              },
              data: {
                id: "branch3",
                name: "branch3",
                type: "branch",
              },
            },
            {
              key: "branch1",
              name: "branch1",
              icon: {
                lib: "antd",
                theme: "outlined",
                icon: "node-expand",
                color: "var(--palette-yellow-6)",
              },
              data: {
                id: "branch1",
                name: "branch1",
                type: "branch",
                children: ["step2"],
              },
              children: [
                {
                  key: "step2",
                  name: "step2",
                  icon: {
                    lib: "antd",
                    theme: "outlined",
                    icon: "forward",
                    color: "var(--palette-cyan-6)",
                  },
                  data: {
                    id: "step2",
                    type: "task",
                    name: "step2",
                    end: true,
                  },
                },
              ],
            },
            {
              key: "branch2",
              name: "branch2",
              icon: {
                lib: "antd",
                theme: "outlined",
                icon: "node-expand",
                color: "var(--palette-yellow-6)",
              },
              data: {
                id: "branch2",
                name: "branch2",
                type: "branch",
                children: ["step3", "step4"],
              },
              children: [
                {
                  key: "step3",
                  name: "step3",
                  icon: {
                    lib: "antd",
                    theme: "outlined",
                    icon: "forward",
                    color: "var(--palette-cyan-6)",
                  },
                  data: {
                    id: "step3",
                    type: "task",
                    name: "step3",
                    next: "step4",
                  },
                },
                {
                  key: "step4",
                  name: "step4",
                  icon: {
                    lib: "antd",
                    theme: "outlined",
                    icon: "forward",
                    color: "var(--palette-cyan-6)",
                  },
                  data: {
                    id: "step4",
                    type: "task",
                    name: "step4",
                    end: true,
                  },
                },
              ],
            },
          ],
        },
        {
          key: "step5",
          name: "step5",
          data: {
            id: "step5",
            name: "step5",
            type: "task",
            end: true,
          },
          icon: {
            lib: "antd",
            theme: "outlined",
            icon: "forward",
            color: "var(--palette-cyan-6)",
          },
        },
      ] as StepTreeNodeData[],
      level: 1,
      isStart: [] as boolean[],
      isEnd: [] as boolean[],
    };

    render(
      <WorkbenchTreeContext.Provider value={{ actions: [] }}>
        <TreeList {...props} />
      </WorkbenchTreeContext.Provider>
    );

    expect(screen.getByText(/root/i)).toBeInTheDocument();
  });
});
