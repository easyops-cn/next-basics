import { getStepTreeData } from "./getStepTreeData";
import { MenuIcon } from "@next-core/brick-types";
import { StepType } from "../interfaces";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getStepTreeData", () => {
  const getIcon = (type: StepType): MenuIcon => {
    let icon;
    let color;

    switch (type) {
      case "task":
        icon = "forward";
        color = "var(--palette-cyan-6)";
        break;
      case "branch":
        icon = "node-expand";
        color = "var(--palette-yellow-6)";
        break;
      case "choice":
        icon = "control";
        color = "var(--palette-amber-6)";
        break;
      case "switch":
        icon = "rollback";
        color = "var(--palette-indigo-6)";
        break;
    }
    return {
      lib: "antd",
      theme: "outlined",
      icon,
      color,
    };
  };
  it.each([
    [
      "root",
      [
        {
          id: "root",
          type: "task",
          name: "start",
          next: "step1",
        },
        {
          id: "step1",
          type: "switch",
          name: "step1",
          next: "step3",
          children: ["branch1", "branch2"],
          config: {
            startAt: "branch1",
          },
        },
        {
          id: "branch1",
          name: "branch1",
          type: "branch",
          children: ["step2"],
          config: {
            startAt: "step2",
          },
          parent: "step1",
        },
        {
          id: "branch2",
          name: "branch2",
          type: "branch",
          children: ["step3"],
          parent: "step1",
          config: {
            startAt: "step3",
          },
        },
        {
          id: "step2",
          type: "task",
          name: "step2",
          end: true,
          parent: "branch1",
        },
        {
          id: "step3",
          type: "choice",
          name: "step3",
          next: "step5",
          pre: "step1",
        },
        {
          id: "step5",
          name: "step5",
          type: "task",
          end: true,
          pre: "step3",
        },
      ],
      getIcon,
      [
        {
          data: { id: "root", name: "start", next: "step1", type: "task" },
          icon: {
            color: "var(--palette-cyan-6)",
            icon: "forward",
            lib: "antd",
            theme: "outlined",
          },
          iconTooltip: "task",
          id: "root",
          key: "root",
          name: "start",
        },
        {
          children: [
            {
              children: [
                {
                  data: {
                    end: true,
                    id: "step2",
                    name: "step2",
                    parent: "branch1",
                    type: "task",
                  },
                  icon: {
                    color: "var(--palette-cyan-6)",
                    icon: "forward",
                    lib: "antd",
                    theme: "outlined",
                  },
                  iconTooltip: "task",
                  id: "step2",
                  key: "step2",
                  name: "step2",
                },
              ],
              data: {
                children: ["step2"],
                config: { startAt: "step2" },
                id: "branch1",
                name: "branch1",
                parent: "step1",
                type: "branch",
              },
              icon: {
                color: "var(--palette-yellow-6)",
                icon: "node-expand",
                lib: "antd",
                theme: "outlined",
              },
              iconTooltip: "branch",
              id: "branch1",
              key: "branch1",
              name: "branch1",
            },
            {
              children: [
                {
                  data: {
                    id: "step3",
                    name: "step3",
                    next: "step5",
                    pre: "step1",
                    type: "choice",
                  },
                  icon: {
                    color: "var(--palette-amber-6)",
                    icon: "control",
                    lib: "antd",
                    theme: "outlined",
                  },
                  iconTooltip: "choice",
                  id: "step3",
                  key: "step3",
                  name: "step3",
                },
                {
                  data: {
                    end: true,
                    id: "step5",
                    name: "step5",
                    pre: "step3",
                    type: "task",
                  },
                  icon: {
                    color: "var(--palette-cyan-6)",
                    icon: "forward",
                    lib: "antd",
                    theme: "outlined",
                  },
                  iconTooltip: "task",
                  id: "step5",
                  key: "step5",
                  name: "step5",
                },
              ],
              data: {
                children: ["step3"],
                config: { startAt: "step3" },
                id: "branch2",
                name: "branch2",
                parent: "step1",
                type: "branch",
              },
              icon: {
                color: "var(--palette-yellow-6)",
                icon: "node-expand",
                lib: "antd",
                theme: "outlined",
              },
              iconTooltip: "branch",
              id: "branch2",
              key: "branch2",
              name: "branch2",
            },
          ],
          data: {
            children: ["branch1", "branch2"],
            config: { startAt: "branch1" },
            id: "step1",
            name: "step1",
            next: "step3",
            type: "switch",
          },
          icon: {
            color: "var(--palette-indigo-6)",
            icon: "rollback",
            lib: "antd",
            theme: "outlined",
          },
          iconTooltip: "switch",
          id: "step1",
          key: "step1",
          name: "step1",
        },
        {
          data: {
            id: "step3",
            name: "step3",
            next: "step5",
            pre: "step1",
            type: "choice",
          },
          icon: {
            color: "var(--palette-amber-6)",
            icon: "control",
            lib: "antd",
            theme: "outlined",
          },
          iconTooltip: "choice",
          id: "step3",
          key: "step3",
          name: "step3",
        },
        {
          data: {
            end: true,
            id: "step5",
            name: "step5",
            pre: "step3",
            type: "task",
          },
          icon: {
            color: "var(--palette-cyan-6)",
            icon: "forward",
            lib: "antd",
            theme: "outlined",
          },
          iconTooltip: "task",
          id: "step5",
          key: "step5",
          name: "step5",
        },
      ],
    ],
    [
      "step1",
      [
        {
          id: "step1",
          type: "switch",
          name: "step1",
          children: ["branch1"],
        },
        {
          id: "branch1",
          name: "branch1",
          type: "branch",
          children: ["step2"],
          config: {
            startAt: "step2",
          },
          parent: "step1",
        },
        {
          id: "step2",
          name: "step2",
          type: "task",
          next: "step2",
        },
      ],
      getIcon,
      [
        {
          children: [
            {
              children: [
                {
                  data: {
                    id: "step2",
                    name: "step2",
                    next: "step2",
                    type: "task",
                  },
                  icon: {
                    color: "var(--palette-cyan-6)",
                    icon: "forward",
                    lib: "antd",
                    theme: "outlined",
                  },
                  iconTooltip: "task",
                  id: "step2",
                  key: "step2",
                  name: "step2",
                },
              ],
              data: {
                children: ["step2"],
                config: { startAt: "step2" },
                id: "branch1",
                name: "branch1",
                parent: "step1",
                type: "branch",
              },
              icon: {
                color: "var(--palette-yellow-6)",
                icon: "node-expand",
                lib: "antd",
                theme: "outlined",
              },
              iconTooltip: "branch",
              id: "branch1",
              key: "branch1",
              name: "branch1",
            },
          ],
          data: {
            children: ["branch1"],
            id: "step1",
            name: "step1",
            type: "switch",
          },
          icon: {
            color: "var(--palette-indigo-6)",
            icon: "rollback",
            lib: "antd",
            theme: "outlined",
          },
          iconTooltip: "switch",
          id: "step1",
          key: "step1",
          name: "step1",
        },
      ],
    ],
  ])("should work", (rootId, data, fn, result) => {
    expect(getStepTreeData(rootId, data, fn)).toEqual(result);
  });

  it("should console error msg", () => {
    const spyOnConsoleError = jest.spyOn(console, "error");
    getStepTreeData(
      "step1",
      [
        {
          id: "step1",
          name: "step1",
          type: "switch",
          children: ["branch1", "step2"],
          config: {
            startAt: "branch1",
          },
        },
        {
          id: "branch1",
          name: "branch1",
          type: "branch",
          parent: "step1",
        },
        {
          id: "step2",
          name: "step2",
          type: "task",
          parent: "step2",
        },
      ],
      getIcon
    );

    expect(spyOnConsoleError).toBeCalledWith(
      "The children of switch and parallel can only be `branch` nodes, but current node type is `task`"
    );
  });
});
