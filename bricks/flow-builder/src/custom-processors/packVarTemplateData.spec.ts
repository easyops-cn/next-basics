import { packVarTemplateData } from "./packVarTemplateData";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("packVarTemplateData", () => {
  it.each([
    [
      {
        id: "varData",
        name: "varData",
        templateId: "cmdbInstanceData",
        params: {
          instanceId: "abcbd",
          projectId: "ccd3",
          objectId: undefined,
          if: "<%$if%>",
        },
        templateData: {
          id: "cmdbInstanceData",
          name: "cmdbInstanceData",
          isStream: true,
          read: {
            dataSource: "list",
            dataSourceType: "contract",
            condition: "{{if}}",
            parameter: {
              instanceId: "{{instanceId}}",
              objectId: "{{objectId}}",
            },
            transform: {
              projectId: "{{projectId}}",
            },
          },
          write: {},
        },
      },
      (str) => `\\{\\{\\s*${str}\\s*\\}\\}`,
      {
        id: "varData",
        isStream: true,
        name: "varData",
        read: {
          dataSource: "list",
          condition: "<%$if%>",
          dataSourceType: "contract",
          iterator: undefined,
          parameter: {
            instanceId: "abcbd",
            objectId: "{{objectId}}",
          },
          transform: {
            projectId: "ccd3",
          },
        },
        write: {
          condition: undefined,
          dataSource: undefined,
          dataSourceType: undefined,
          iterator: undefined,
          parameter: undefined,
          transform: undefined,
        },
      },
    ],
    [
      { id: "test", name: "test" },
      (str) => `\\{\\{\\s*${str}\\s*\\}\\}`,
      {
        id: "test",
        isStream: undefined,
        name: "test",
        read: {
          dataSource: undefined,
          iterator: undefined,
          parameter: undefined,
          transform: undefined,
        },
        write: {
          dataSource: undefined,
          iterator: undefined,
          parameter: undefined,
          transform: undefined,
        },
      },
    ],
    [
      {
        id: "instanceParams",
        name: "instanceParams",
        templateId: "instanceId",
        params: {
          query: [{ page: 1 }],
          fields: {
            name: true,
          },
          modelId: "HOST",
        },
        templateData: {
          id: "instanceParams",
          name: "instanceParams",
          isStream: true,
          read: {
            dataSource: "list",
            parameter: {
              url: "/api/{{modelId}}/edit",
              extra: {
                query: "{{query}}",
              },
              fields: "{{fields}}",
            },
            transform: true,
          },
          write: {},
        },
      },
      (str) => `\\{\\{\\s*${str}\\s*\\}\\}`,
      {
        id: "instanceParams",
        isStream: true,
        name: "instanceParams",
        read: {
          dataSource: "list",
          iterator: undefined,
          parameter: {
            fields: { name: true },
            extra: {
              query: [{ page: 1 }],
            },
            url: "/api/HOST/edit",
          },
          transform: true,
        },
        write: {
          dataSource: undefined,
          iterator: undefined,
          parameter: undefined,
          transform: undefined,
        },
      },
    ],
    [
      {
        id: "pluginData",
        name: "pluginData",
        templateId: "pluginId",
        params: {
          parameter: {
            instanceId: "abc",
            fields: {
              name: true,
            },
          },
        },
        templateData: {
          id: "instanceParams",
          name: "instanceParams",
          isStream: true,
          read: {
            dataSource: "list",
            parameter: "{{parameter}}",
          },
          write: {},
        },
      },
      (str) => `\\{\\{\\s*${str}\\s*\\}\\}`,
      {
        id: "pluginData",
        isStream: true,
        name: "pluginData",
        read: {
          dataSource: "list",
          iterator: undefined,
          parameter: { fields: { name: true }, instanceId: "abc" },
          transform: undefined,
        },
        write: {
          dataSource: undefined,
          iterator: undefined,
          parameter: undefined,
          transform: undefined,
        },
      },
    ],
  ])("should work", (formData, placeholderFn, result) => {
    expect(packVarTemplateData(formData, placeholderFn)).toEqual(result);
  });
});
