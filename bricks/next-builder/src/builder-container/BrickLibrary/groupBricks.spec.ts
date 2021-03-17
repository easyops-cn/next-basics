import { groupBricks } from "./groupBricks";

describe("groupBricks", () => {
  it("should work", () => {
    const result = groupBricks(
      [
        {
          type: "brick",
          name: "basic-bricks.micro-view",
        },
        {
          type: "brick",
          name: "basic-bricks.general-button",
        },
        {
          type: "brick",
          name: "forms.general-form",
        },
        {
          type: "brick",
          name: "forms.general-input",
        },
        {
          type: "template",
          // Some legacy bricks have a name of which contains two dots.
          name: "workspace.container.create-deploy-unit",
        },
        {
          type: "customTemplate",
          name: "my-pkg.tpl-test-a",
        },
        {
          type: "customTemplate",
          name: "tpl-test-b",
        },
      ],
      "my-app"
    );
    expect(result).toEqual([
      {
        scope: "basic-bricks",
        bricks: [
          {
            type: "brick",
            name: "basic-bricks.micro-view",
            scopeName: "basic-bricks",
            shortName: "micro-view",
          },
          {
            type: "brick",
            name: "basic-bricks.general-button",
            scopeName: "basic-bricks",
            shortName: "general-button",
          },
        ],
      },
      {
        scope: "forms",
        bricks: [
          {
            type: "brick",
            name: "forms.general-form",
            scopeName: "forms",
            shortName: "general-form",
          },
          {
            type: "brick",
            name: "forms.general-input",
            scopeName: "forms",
            shortName: "general-input",
          },
        ],
      },
      {
        scope: "workspace",
        bricks: [
          {
            type: "template",
            name: "workspace.container.create-deploy-unit",
            scopeName: "workspace",
            shortName: "container.create-deploy-unit",
          },
        ],
      },
      {
        scope: "my-pkg",
        bricks: [
          {
            type: "customTemplate",
            name: "my-pkg.tpl-test-a",
            scopeName: "my-pkg",
            shortName: "tpl-test-a",
          },
        ],
      },
      {
        scope: "my-app",
        bricks: [
          {
            type: "customTemplate",
            name: "tpl-test-b",
            scopeName: "my-app",
            shortName: "tpl-test-b",
          },
        ],
      },
    ]);
  });
});
