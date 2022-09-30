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
          type: "switch",
          name: "step1",
          next: "step5",
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
          parent: "step1",
        },
        {
          id: "branch2",
          name: "branch2",
          type: "branch",
          children: ["step3"],
          parent: "step1",
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
          type: "task",
          name: "step3",
          next: "step5",
        },
        {
          id: "step5",
          name: "step5",
          type: "task",
          end: true,
          pre: "step3",
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
                    type: "task",
                    parent: "branch1",
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
            children: ["branch1", "branch2"],
            config: { startAt: "branch1" },
            id: "step1",
            name: "step1",
            next: "step5",
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
            end: true,
            id: "step5",
            name: "step5",
            type: "task",
            pre: "step3",
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
  ])("should work", (rootId, data, result) => {
    expect(getStepTreeData(rootId, data)).toEqual(result);
  });
});
