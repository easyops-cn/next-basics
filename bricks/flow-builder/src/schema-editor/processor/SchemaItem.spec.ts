import { getModelRefData } from "./schemaItem";

describe("SchemaItem processor", () => {
  it("getModelRefData", () => {
    const modelDefinition = {
      name: "Agent",
      fields: [
        {
          name: "id",
          type: "string",
        },
        {
          name: "status",
          type: "int",
        },
        {
          name: "Admin.a",
          ref: "Admin.a",
        },
      ],
    };

    const modelDefinitionList = [
      {
        name: "Agent",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "status",
            type: "int",
          },
          {
            name: "Admin.a",
            ref: "Admin.a",
          },
        ],
      },
      {
        name: "Admin",
        fields: [
          {
            name: "Task.*",
            ref: "Task.*",
          },
          {
            name: "user",
            type: "string",
          },
        ],
      },
      {
        name: "Task",
        fields: [
          {
            name: "Deny.b",
            ref: "Deny.b",
          },
          {
            name: "Plugin.*",
            ref: "Plugin.*",
          },
        ],
      },
      {
        name: "Deny",
        fields: [
          {
            name: "b",
            type: "string",
          },
        ],
      },
      {
        name: "Plugin",
        fields: [
          {
            name: "a",
            type: "string",
          },
        ],
      },
    ];

    expect(
      getModelRefData("Agent.*", modelDefinition, modelDefinitionList)
    ).toEqual({
      name: "Agent",
      fields: [
        {
          name: "id",
          type: "string",
        },
        {
          name: "status",
          type: "int",
        },
        {
          name: "Admin.a",
          ref: "Admin.a",
        },
      ],
    });

    expect(
      getModelRefData("Agent.status", modelDefinition, modelDefinitionList)
    ).toEqual({
      ref: "Agent.status",
      name: "Agent.status",
      fields: [
        {
          name: "status",
          type: "int",
        },
      ],
    });

    expect(
      getModelRefData(
        "Admin.a",
        {
          name: "Admin",
          fields: [
            {
              name: "Task.*",
              ref: "Task.*",
            },
            {
              name: "user",
              type: "string",
            },
          ],
        },
        modelDefinitionList
      )
    ).toEqual({
      name: "Admin.a",
      ref: "Admin.a",
      fields: [
        {
          name: "a",
          type: "string",
        },
      ],
    });
  });
});
