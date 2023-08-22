import { AddDependencies } from "./AddDependencies";
import {
  InstanceGraphApi_traverseGraphV2,
  InstanceApi_getDetail,
} from "@next-sdk/cmdb-sdk";

jest.mock("@next-sdk/cmdb-sdk");

(InstanceApi_getDetail as jest.Mock).mockResolvedValue({
  templates: [
    {
      templateId: "tpl-test-1",
      id: "T-001",
    },
    {
      templateId: "tpl-test-2",
      id: "T-002",
    },
  ],
});

(InstanceGraphApi_traverseGraphV2 as jest.Mock).mockImplementation((params) => {
  if (params.query.id === "T-001") {
    return {
      topic_vertices: [
        {
          id: "T-001",
          templateId: "tpl-test-1",
          state: JSON.stringify([
            {
              name: "test",
              value: "test",
            },
            {
              useProvider: "provider-of-use-in-template.get-xxx",
            },
          ]),
        },
      ],
      vertices: [
        {
          id: "B-005",
          brick: "tpl-test-2",
        },
        {
          id: "B-006",
          brick: "div",
        },
        {
          id: "B-007",
          brick: "brick-in-tpl.xxx",
        },
        {
          id: "B-008",
          brick: "eo-button",
        },
      ],
      edges: [],
    };
  } else if (params.query.id === "T-002") {
    return {
      topic_vertices: [
        {
          id: "T-002",
          templateId: "tpl-test-2",
        },
      ],
      vertices: [],
      edges: [],
    };
  }
  return {
    topic_vertices: [
      {
        id: "B-000",
        instanceId: "mock-route-instanceId",
        alias: "page",
        context: [
          {
            name: "test",
            value: 1,
          },
          {
            useProvider: "providers-of-a.get-detail",
          },
          {
            useProvider: "providers-of-b.get-detail",
          },
          {
            useProvider: "flow.builder.api@notMatch:1.0.0",
          },
        ],
      },
    ],
    vertices: [
      {
        id: "B-001",
        brick: "basic-bricks.micro-view",
        properties: JSON.stringify({
          toolbar: {
            useBrick: {
              brick: "a-bricks.text",
            },
          },
          footer: {
            useBrick: [
              {
                brick: "b-bricks.text",
              },
              {
                brick: "div",
              },
            ],
          },
        }),
      },
      {
        id: "B-002",
        brick: "basic-bricks.general-card",
        lifeCycle: JSON.stringify({
          useResolves: [
            {
              useProvider: "next-builder.get-xxx",
            },
            {
              useProvider: "provider-of-c.get-xxx",
            },
          ],
        }),
      },
      {
        id: "B-003",
        brick: "div",
        properties: JSON.stringify({
          textContent: "link",
        }),
        events: JSON.stringify({
          click: [
            {
              useProvider: "provider-of-c.get-xxx",
            },
            {
              useProvider: "provider-of-d.get-xxx",
            },
          ],
        }),
      },
      {
        id: "B-004",
        brick: "tpl-test-1",
        properties: JSON.stringify({
          textContent: "link",
          id: "link",
        }),
        events: JSON.stringify({
          click: [
            {
              target: "#link",
              properties: {
                useBrick: {
                  brick: "c-bricks.xxx",
                },
              },
            },
          ],
        }),
      },
    ],
    edges: [],
  };
});

const mockAddDependencies = jest.fn();
jest.mock("@next-sdk/next-builder-sdk", () => ({
  PackageAloneApi_listDependencies: jest.fn(() => ({
    list: [
      {
        name: "basic-bricks-NB",
      },
    ],
  })),
  PackageAloneApi_addDependencies: (...args) => mockAddDependencies(...args),
}));

describe("AddDependencies", () => {
  it("Add Dependencies should work", async () => {
    await AddDependencies({
      projectId: "mockProjectId",
      rootId: "B-000",
    });
    expect(mockAddDependencies).toBeCalledWith("mockProjectId", {
      dependencies: [
        { actualVersion: null, constraint: "*", name: "providers-of-a-NB" },
        { actualVersion: null, constraint: "*", name: "providers-of-b-NB" },
        { actualVersion: null, constraint: "*", name: "a-bricks-NB" },
        { actualVersion: null, constraint: "*", name: "b-bricks-NB" },
        { actualVersion: null, constraint: "*", name: "next-builder-NB" },
        { actualVersion: null, constraint: "*", name: "provider-of-c-NB" },
        { actualVersion: null, constraint: "*", name: "provider-of-d-NB" },
        {
          actualVersion: null,
          constraint: "*",
          name: "provider-of-use-in-template-NB",
        },
        { actualVersion: null, constraint: "*", name: "brick-in-tpl-NB" },
        { actualVersion: null, constraint: "*", name: "basic-NB" },
      ],
    });
  });
});
