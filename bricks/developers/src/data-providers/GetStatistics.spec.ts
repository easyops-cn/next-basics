import { GetStatistics } from "./GetStatistics";
import * as AuthSdk from "@sdk/auth-sdk";
import { getAllStoryListV2 } from "../share/processor";

jest.mock("@sdk/auth-sdk");

const mockBootstrap = AuthSdk.bootstrap as jest.Mock;

const mockData = {
  storyboards: [
    {
      app: {
        id: "test-iframe",
        name: "iframe嵌套微应用",
        legacy: "iframe",
      },
    },
    {
      app: {
        id: "micro-app1",
        name: "产品1",
      },
      routes: [
        {
          path: "${APP.homepage}",
          bricks: [
            {
              brick: "div",
              slots: {
                "": {
                  type: "routes",
                  routes: [
                    {
                      path: "${APP.homepage}/1",
                      bricks: [
                        {
                          template: "monitor-alert.alert-event-number",
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              brick: "presentational-bricks.brick-table",
            },
            {
              brick: "mock-custom-pkg.custom-brick",
              slots: {
                content: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "presentational-bricks.brick-descriptions",
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

mockBootstrap.mockResolvedValue(mockData);

jest.mock("../share/processor");
const mockGetStoryList = getAllStoryListV2 as jest.Mock;
mockGetStoryList.mockReturnValue([
  {
    id: "presentational-bricks.brick-table",
    type: "brick",
    title: "表格",
    subTitle: "lynette",
  },
  {
    id: "presentational-bricks.brick-descriptions",
    type: "brick",
    title: "描述列表",
    subTitle: "lynette",
  },
  {
    id: "monitor-alert.alert-event-number",
    type: "template",
    title: "告警事件数量",
    subTitle: "ice",
  },
]);

describe("GetStatistics", () => {
  it.each<[any]>([
    [
      {
        microAppsCount: 2,
        microAppsWithoutLegacyCount: 1,
        iframeMicroApps: 1,
        allBricksAndTemplatesCount: 4,
        commonBricksAndTemplatesCount: 3,
        commonBricksAndTemplatesUsedRate: 75,
        microAppsPieChart: {
          title: "微应用总数：2",
          data: {
            legendList: ["全新微应用", "iframe嵌套微应用"],
            seriesData: [
              {
                name: "全新微应用",
                value: 1,
              },
              {
                name: "iframe嵌套微应用",
                value: 1,
              },
            ],
          },
        },
        microAppsSubMenu: {
          title: "微应用列表",
          menuItems: [
            {
              text: "产品1",
              to: "/developers/statistics/micro-app-statistics/micro-app1",
            },
          ],
        },
        microAppStatisticsRedirectTo:
          "/developers/statistics/micro-app-statistics/micro-app1",
        microAppsStatisticsMap: {
          "micro-app1": {
            ...mockData.storyboards[1],
            commonUsedRate: 75,
            countCommonBricksAndTemplates: 3,
            countBricksAndTemplates: [
              {
                type: "template",
                id: "monitor-alert.alert-event-number",
                isCommon: true,
                count: 1,
              },
              {
                type: "brick",
                id: "presentational-bricks.brick-table",
                isCommon: true,
                count: 1,
              },
              {
                type: "brick",
                id: "mock-custom-pkg.custom-brick",
                isCommon: false,
                count: 1,
              },
              {
                type: "brick",
                id: "presentational-bricks.brick-descriptions",
                isCommon: true,
                count: 1,
              },
            ],
            statisticsAll: [
              {
                type: "brick",
                id: "presentational-bricks.brick-table",
                isCommon: true,
                app: {
                  id: "micro-app1",
                  name: "产品1",
                },
              },
              {
                type: "brick",
                id: "mock-custom-pkg.custom-brick",
                isCommon: false,
                app: {
                  id: "micro-app1",
                  name: "产品1",
                },
              },
              {
                type: "brick",
                id: "presentational-bricks.brick-descriptions",
                isCommon: true,
                app: {
                  id: "micro-app1",
                  name: "产品1",
                },
              },
              {
                type: "template",
                id: "monitor-alert.alert-event-number",
                isCommon: true,
                app: {
                  id: "micro-app1",
                  name: "产品1",
                },
              },
            ],
          },
        },
        topBricksAndTemplates: [
          {
            type: "template",
            id: "monitor-alert.alert-event-number",
            count: 1,
            author: "ice",
            url:
              "/developers/brick-book/template/monitor-alert.alert-event-number",
          },
          {
            type: "brick",
            id: "presentational-bricks.brick-table",
            count: 1,
            author: "lynette",
            url:
              "/developers/brick-book/brick/presentational-bricks.brick-table",
          },
          {
            type: "brick",
            id: "presentational-bricks.brick-descriptions",
            count: 1,
            author: "lynette",
            url:
              "/developers/brick-book/brick/presentational-bricks.brick-descriptions",
          },
        ],
        countAllBricksAndTemplate: [
          {
            type: "brick",
            id: "presentational-bricks.brick-table",
            count: 1,
            appList: [
              {
                id: "micro-app1",
                name: "产品1",
              },
            ],
            isCommon: true,
          },
          {
            id: "mock-custom-pkg.custom-brick",
            type: "brick",
            isCommon: false,
            count: 1,
            appList: [
              {
                id: "micro-app1",
                name: "产品1",
              },
            ],
          },
          {
            type: "brick",
            id: "presentational-bricks.brick-descriptions",
            count: 1,
            appList: [
              {
                id: "micro-app1",
                name: "产品1",
              },
            ],
            isCommon: true,
          },
          {
            type: "template",
            id: "monitor-alert.alert-event-number",
            count: 1,
            appList: [
              {
                id: "micro-app1",
                name: "产品1",
              },
            ],
            isCommon: true,
          },
        ],
        packageNames: [
          "presentational-bricks",
          "mock-custom-pkg",
          "monitor-alert",
        ],
      },
    ],
  ])("GetStatistics(%j) should work", async (result) => {
    expect(await GetStatistics()).toEqual(result);
  });
});
