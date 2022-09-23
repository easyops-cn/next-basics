import { getStepTreeData } from "./getStepTreeData";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("getStepTreeData", () => {
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
          type: "choice",
          name: "step1",
          next: "step5",
          children: ["branch1", "branch2"],
        },
        {
          id: "branch1",
          name: "branch1",
          type: "branch",
          children: ["step2"],
        },
        {
          id: "branch2",
          name: "branch2",
          type: "branch",
          children: ["step3"],
        },
        {
          id: "step2",
          type: "task",
          name: "step2",
          end: true,
        },
        {
          id: "step3",
          type: "task",
          name: "step3",
          next: "step5",
        },
        {
          id: "step5",
          name: "step5",
          type: "task",
          end: true,
        },
      ],
      [
        {
          data: { id: "root", name: "start", next: "step1", type: "task" },
          icon: {
            color: "var(--palette-cyan-6)",
            icon: "forward",
            lib: "antd",
            theme: "outlined",
          },
          key: "root",
          name: "start",
          id: "root",
          iconTooltip: "task",
        },
        {
          children: [
            {
              children: [
                {
                  data: { end: true, id: "step2", name: "step2", type: "task" },
                  icon: {
                    color: "var(--palette-cyan-6)",
                    icon: "forward",
                    lib: "antd",
                    theme: "outlined",
                  },
                  key: "step2",
                  name: "step2",
                  id: "step2",
                  iconTooltip: "task",
                },
              ],
              data: {
                children: ["step2"],
                id: "branch1",
                name: "branch1",
                type: "branch",
              },
              icon: {
                color: "var(--palette-yellow-6)",
                icon: "node-expand",
                lib: "antd",
                theme: "outlined",
              },
              key: "branch1",
              name: "branch1",
              id: "branch1",
              iconTooltip: "branch",
            },
            {
              children: [
                {
                  data: {
                    id: "step3",
                    name: "step3",
                    next: "step5",
                    type: "task",
                  },
                  icon: {
                    color: "var(--palette-cyan-6)",
                    icon: "forward",
                    lib: "antd",
                    theme: "outlined",
                  },
                  key: "step3",
                  name: "step3",
                  id: "step3",
                  iconTooltip: "task",
                },
              ],
              data: {
                children: ["step3"],
                id: "branch2",
                name: "branch2",
                type: "branch",
              },
              icon: {
                color: "var(--palette-yellow-6)",
                icon: "node-expand",
                lib: "antd",
                theme: "outlined",
              },
              key: "branch2",
              name: "branch2",
              id: "branch2",
              iconTooltip: "branch",
            },
          ],
          data: {
            children: ["branch1", "branch2"],
            id: "step1",
            name: "step1",
            next: "step5",
            type: "choice",
          },
          icon: {
            color: "var(--palette-indigo-6)",
            icon: "rollback",
            lib: "antd",
            theme: "outlined",
          },
          key: "step1",
          name: "step1",
          id: "step1",
          iconTooltip: "choice",
        },
        {
          data: { end: true, id: "step5", name: "step5", type: "task" },
          icon: {
            color: "var(--palette-cyan-6)",
            icon: "forward",
            lib: "antd",
            theme: "outlined",
          },
          key: "step5",
          name: "step5",
          id: "step5",
          iconTooltip: "task",
        },
      ],
    ],
  ])("should work", (rootId, data, result) => {
    expect(getStepTreeData(rootId, data)).toEqual(result);
  });
});
