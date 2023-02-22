import {
  initStepMap,
  getItemCheck,
  processCheck,
  getCheckStepList,
} from "./CheckManagement";

describe("CheckManagement processor", () => {
  describe("initStepMap", () => {
    it("should work", () => {
      expect(initStepMap()).toEqual(new Map());

      expect(
        initStepMap([
          {
            id: "step1",
            name: "step1",
            type: "task",
          },
          {
            id: "step2",
            name: "step2",
            type: "task",
            pre: "step1",
            next: "step3",
          },
          {
            id: "step3",
            name: "step3",
            type: "switch",
            pre: "step3",
          },
          {
            id: "step4",
            name: "step4",
            type: "task",
            parent: "step3",
          },
        ])
      ).toEqual(
        new Map([
          [
            "null-null-step1-null",
            { checked: true, id: "step1", name: "step1", type: "task" },
          ],
          [
            "null-step1-step2-step3",
            {
              checked: true,
              id: "step2",
              name: "step2",
              next: "step3",
              pre: "step1",
              type: "task",
            },
          ],
          [
            "null-step3-step3-null",
            {
              checked: true,
              id: "step3",
              name: "step3",
              pre: "step3",
              type: "switch",
            },
          ],
          [
            "step3-null-step4-null",
            {
              checked: true,
              id: "step4",
              name: "step4",
              parent: "step3",
              type: "task",
            },
          ],
        ])
      );
    });
  });

  describe("getItemCheck", () => {
    it("should work", () => {
      expect(
        getItemCheck(
          new Map([
            [
              "root-step1-step2-step3",
              {
                checked: true,
                name: "step2",
                id: "step2",
                type: "task",
                parent: "root",
                pre: "step1",
                next: "step3",
              },
            ],
          ]),
          {
            id: "step2",
            parent: "root",
            pre: "step1",
            next: "step3",
            name: "step2",
            type: "task",
          }
        )
      ).toEqual(true);
    });
  });

  describe("processCheck", () => {
    it.each([
      [
        {
          name: "step1",
          id: "step1",
          type: "task",
          data: {
            name: "step1",
            id: "step1",
            type: "task",
          },
        },
        false,
        new Map([
          [
            "null-null-step1-null",
            { checked: false, id: "step1", name: "step1", type: "task" },
          ],
        ]),
      ],
      [
        {
          name: "branch1",
          id: "branch1",
          type: "branch",
          parent: "switch1",
          next: "branch2",
          data: {
            name: "branch1",
            id: "branch1",
            type: "branch",
            parent: "switch1",
            next: "branch2",
          },
          children: [
            {
              name: "step1",
              id: "step1",
              type: "task",
              parent: "branch1",
              next: "step2",
              data: {
                name: "step1",
                id: "step1",
                type: "task",
                parent: "branch1",
                next: "step2",
              },
              children: [
                {
                  name: "step3",
                  id: "step3",
                  type: "pass",
                  parent: "step1",
                  data: {
                    name: "step3",
                    id: "step3",
                    type: "pass",
                    parent: "step1",
                  },
                },
              ],
            },
            {
              name: "step2",
              id: "step2",
              type: "task",
              parent: "branch1",
              pre: "step2",
              data: {
                name: "step2",
                id: "step2",
                type: "task",
                parent: "branch1",
                pre: "step2",
              },
            },
          ],
        },
        true,
        new Map([
          [
            "switch1-null-branch1-branch2",
            {
              checked: true,
              id: "branch1",
              name: "branch1",
              next: "branch2",
              parent: "switch1",
              type: "branch",
            },
          ],
          [
            "branch1-null-step1-step2",
            {
              checked: true,
              id: "step1",
              name: "step1",
              next: "step2",
              parent: "branch1",
              type: "task",
            },
          ],
          [
            "branch1-step2-step2-null",
            {
              checked: true,
              id: "step2",
              name: "step2",
              parent: "branch1",
              pre: "step2",
              type: "task",
            },
          ],
          [
            "step1-null-step3-null",
            {
              checked: true,
              name: "step3",
              id: "step3",
              type: "pass",
              parent: "step1",
            },
          ],
        ]),
      ],
    ])("should work", (stepData, checked, result) => {
      expect(processCheck(stepData, checked)).toEqual(result);
    });
  });

  describe("getCheckStepList", () => {
    it.each([
      [
        new Map([
          [
            "switch1-null-branch1-branch2",
            {
              checked: true,
              id: "branch1",
              name: "branch1",
              next: "branch2",
              parent: "switch1",
              type: "branch",
            },
          ],
          [
            "branch1-null-step1-step2",
            {
              checked: true,
              id: "step1",
              name: "step1",
              next: "step2",
              parent: "branch1",
              type: "task",
            },
          ],
          [
            "branch1-step2-step2-null",
            {
              checked: true,
              id: "step2",
              name: "step2",
              parent: "branch1",
              pre: "step2",
              type: "task",
            },
          ],
        ]),
        [
          {
            checked: true,
            id: "branch1",
            name: "branch1",
            next: "branch2",
            parent: "switch1",
            type: "branch",
          },
          {
            checked: true,
            id: "step1",
            name: "step1",
            next: "step2",
            parent: "branch1",
            type: "task",
          },
          {
            checked: true,
            id: "step2",
            name: "step2",
            parent: "branch1",
            pre: "step2",
            type: "task",
          },
        ],
      ],
    ])("should work", (map, result) => {
      expect(getCheckStepList(map)).toEqual(result);
    });
  });
});
