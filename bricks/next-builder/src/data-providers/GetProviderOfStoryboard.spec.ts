import {
  GetProviderOfStoryboard,
  GetProviderOfStoryboardParams,
} from "./GetProviderOfStoryboard";
import { Storyboard } from "@next-core/brick-types";

const storyboard: Storyboard = {
  app: {
    name: "a",
    id: "1",
    homepage: "${APP.HOMEPAGE}",
  },
  routes: [
    {
      bricks: [
        {
          brick: "general-button",
          properties: {
            test: 1,
          },
          lifeCycle: {
            useResolves: [
              {
                useProvider: "providers-of-xxx.get-a",
              },
              {
                useProvider: "providers-of-xxx.get-b",
              },
              {
                useProvider: "easyops.flow_api@FlowApiA:1.0.0",
              },
            ],
          },
        },
        {
          brick: "general-select",
          properties: {
            test: 2,
            useBrick: [
              {
                brick: "general-input",
                events: {
                  click: [
                    {
                      useProvider: "providers-of-xxx.get-deep-provicder",
                      callback: {
                        success: [
                          {
                            useProvider: "easyops.flow_api@FlowApiB:1.0.0",
                          },
                          {
                            useProvider: "providers-of-xxx.get-c-1",
                          },
                          {
                            useProvider: "next-builder.provider-get-d",
                          },
                          {
                            useProvider: "flow.provider-get-e",
                          },
                          {
                            useProvider: "provider-of-xxx.not-provider",
                          },
                          {
                            useProvider123: "providers-of-xxx.not-provider",
                          },
                          {
                            provider12312: "provider-of-xxx.not-provider",
                          },
                          {
                            provider12312: "easyops.flow_api-FlowApiC:1.0.0",
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
          lifeCycle: {
            useResolves: [
              {
                useProvider: "providers-of-xxx.get-c",
              },
            ],
          },
        },
        {
          brick: "providers-of-xxx.get-d",
          properties: {
            id: "get-d",
          },
        },
        {
          brick: "provider-of-xxx.not-provider",
        },
      ],
      context: [
        {
          name: "context",
          resolve: {
            useProvider: "provider-of-xxx.get-e",
          },
        },
      ],
      path: "${APP.homepage}",
      alias: "page1",
      type: "bricks",
    },
  ],
  meta: {
    customTemplates: [
      {
        name: "tpl-test-1",
        bricks: [
          {
            brick: "brick-view",
            events: {
              confirm: [
                {
                  useProvider: "providers-of-xxx.get-f",
                },
              ],
              cancel: [
                {
                  useProvider: "providers-of-xxx.get-g",
                },
              ],
            },
            lifeCycle: {
              useResolves: [
                {
                  useProvider: "providers-of-xxx.get-a",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  dependsAll: false,
};

describe("GetProviderOfStoryboard", () => {
  it.each<[GetProviderOfStoryboardParams, string[]]>([
    [
      {
        storyboard,
      },
      [
        "easyops.flow_api@FlowApiA:1.0.0",
        "easyops.flow_api@FlowApiB:1.0.0",
        "providers-of-xxx.get-a",
        "providers-of-xxx.get-b",
        "providers-of-xxx.get-c",
        "providers-of-xxx.get-deep-provicder",
        "providers-of-xxx.get-c-1",
        "providers-of-xxx.get-d",
        "providers-of-xxx.get-f",
        "providers-of-xxx.get-g",
      ],
    ],
  ])("GetProviderOfStoryboard(%j) should work", (params, result) => {
    expect(GetProviderOfStoryboard(params)).toEqual(result);
  });
});
