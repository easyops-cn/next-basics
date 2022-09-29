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
        },
        templateData: {
          id: "cmdbInstanceData",
          name: "cmdbInstanceData",
          isStream: true,
          read: {
            dataSource: "list",
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
          dataSource: undefined,
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
  ])("should work", (formData, placeholderFn, result) => {
    expect(packVarTemplateData(formData, placeholderFn)).toEqual(result);
  });
});
