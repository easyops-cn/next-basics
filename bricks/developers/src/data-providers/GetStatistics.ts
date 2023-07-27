import { createProviderClass } from "@next-core/brick-utils";
import {
  reject,
  forEach,
  map,
  filter,
  includes,
  flatten,
  countBy,
  sortBy,
  reverse,
  find,
  keyBy,
  uniq,
  startsWith,
  uniqBy,
  groupBy,
  compact,
} from "lodash";
import * as AuthSdk from "@next-sdk/auth-sdk";
import {
  scanBricksInStoryboard,
  scanTemplatesInStoryboard,
} from "@next-core/brick-utils";
import { getAllStoryListV2 } from "../share/processor";
import { Story, CategoryGroup } from "@next-core/brick-types";

const getBricks = (bricks: any[]): any[] => {
  const resultBricks: any[] = [];
  forEach(bricks, (brickConf) => {
    resultBricks.push(brickConf);
    if (brickConf.slots) {
      forEach(brickConf.slots, (slot) => {
        if (slot.type === "bricks") {
          resultBricks.push(...getBricks(slot.bricks));
        } else if (slot.type === "routes") {
          forEach(slot.routes, (route) => {
            resultBricks.push(...getBricks(route.bricks));
          });
        }
      });
    }
  });
  return resultBricks;
};

const getPercentage = (value: number): number => {
  return value * 100;
};

// 以providers-of开头的自动生成的provider构件以及不包含.的原生元素例如div/span等均为通用构件
const ifCommon = (item: string, commonList: string[]) => {
  return (
    includes(commonList, item) ||
    startsWith(item, "providers-of") ||
    !item.includes(".")
  );
};

export async function GetStatistics(
  categoryGroups: CategoryGroup[] = [],
  stories: Story[] = []
): Promise<any> {
  const storyList = getAllStoryListV2(categoryGroups, stories);
  const allCommonBricks = filter(storyList, (v) => v.type === "brick");
  const allCommonTemplates = reject(storyList, (v) => v.type === "brick");

  const commonBricksName = map(allCommonBricks, "id");
  const commonTemplatesName = map(allCommonTemplates, "id");
  const bootstrap = await AuthSdk.bootstrap();
  // 不统计iframe嵌套老站点的微应用
  const microAppsWithoutLegacy = reject(bootstrap.storyboards, [
    "app.legacy",
    "iframe",
  ]);
  const microAppsBricks = microAppsWithoutLegacy.map((microApp) => {
    const allBricksName = scanBricksInStoryboard(microApp, false);
    const allTemplatesName = scanTemplatesInStoryboard(microApp, false);
    const countAndSortAllBricks = reverse(
      sortBy(
        map(
          countBy(allBricksName, (item) => {
            return item;
          }),
          (v, k) => {
            return {
              id: k,
              count: v,
              type: "brick",
              isCommon: ifCommon(k, commonBricksName),
            };
          }
        ),
        "count"
      )
    );
    const countAndSortAllTemplates = reverse(
      sortBy(
        map(
          countBy(allTemplatesName, (item) => {
            return item;
          }),
          (v, k) => {
            return {
              id: k,
              count: v,
              type: "template",
              isCommon: ifCommon(k, commonTemplatesName),
            };
          }
        ),
        "count"
      )
    );
    microApp.countBricksAndTemplates = reverse(
      sortBy([...countAndSortAllBricks, ...countAndSortAllTemplates], "count")
    );
    microApp.countCommonBricksAndTemplates = filter(
      [...countAndSortAllBricks, ...countAndSortAllTemplates],
      "isCommon"
    ).length;

    const statisticsAll = [
      ...map(allBricksName, (v) => {
        return {
          type: "brick",
          id: v,
          isCommon: ifCommon(v, commonBricksName),
          app: microApp.app,
        };
      }),
      ...map(allTemplatesName, (v) => ({
        type: "template",
        id: v,
        isCommon: ifCommon(v, commonTemplatesName),
        app: microApp.app,
      })),
    ];
    microApp.statisticsAll = statisticsAll;
    microApp.commonUsedRate = getPercentage(
      filter(statisticsAll, (item) => item.isCommon).length /
        statisticsAll.length
    );
    return microApp;
  });
  const microAppsStatisticsMap = keyBy(microAppsBricks, "app.id");
  const microAppsSubMenu = {
    title: "微应用列表",
    menuItems: map(microAppsBricks, (item) => {
      return {
        text: item.app.name,
        to: `/developers/statistics/micro-app-statistics/${item.app.id}`,
      };
    }),
  };
  const microAppStatisticsRedirectTo = `${microAppsSubMenu.menuItems[0].to}`;
  const allMicroAppsBricksAndTemplate = flatten(
    map(microAppsBricks, "statisticsAll")
  );
  const allMicroAppsBricks = map(
    filter(allMicroAppsBricksAndTemplate, (item) => item.type === "brick"),
    "id"
  );
  const allMicroAppsTemplates = map(
    filter(allMicroAppsBricksAndTemplate, (item) => item.type === "template"),
    "id"
  );

  // 统计所有构件
  const allBricksAndTemplateGroupBy = groupBy(
    allMicroAppsBricksAndTemplate,
    (item) => item.type + "," + item.id
  );
  const countAllBricksAndTemplate = map(
    uniqBy(allMicroAppsBricksAndTemplate, (item) => item.type + "," + item.id),
    (v) => {
      return {
        id: v.id,
        type: v.type,
        isCommon: v.isCommon,
        count: allBricksAndTemplateGroupBy[v.type + "," + v.id].length,
        appList: map(
          uniqBy(
            allBricksAndTemplateGroupBy[v.type + "," + v.id],
            (v) => v.app.id
          ),
          "app"
        ),
      };
    }
  );

  // 排名前二十的构件
  let countCommonBricksUsed: any[] = reverse(
    sortBy(
      filter(
        map(
          countBy(allMicroAppsBricks, (item) => {
            return includes(commonBricksName, item) && item;
          }),
          (v, k) => {
            return {
              id: k,
              count: v,
            };
          }
        ),
        (item) => item.id !== "false" && item.id !== "div"
      ),
      "count"
    )
  ).slice(0, 20);
  countCommonBricksUsed = map(countCommonBricksUsed, (item) => {
    const found = find(allCommonBricks, ["id", item.id]);
    if (found) {
      item.author = found.subTitle;
      item.type = found.type;
      item.url = "/developers/brick-book/" + item.type + "/" + item.id;
    }
    return item;
  });
  // 排名前二十的模板
  let countCommonTemplatesUsed: any[] = reverse(
    sortBy(
      filter(
        map(
          countBy(allMicroAppsTemplates, (item) => {
            return includes(commonTemplatesName, item) && item;
          }),
          (v, k) => {
            return {
              id: k,
              count: v,
            };
          }
        ),
        (item) => item.id !== "false"
      ),
      "count"
    )
  ).slice(0, 20);
  countCommonTemplatesUsed = map(countCommonTemplatesUsed, (item) => {
    const found = find(allCommonTemplates, ["id", item.id]);
    item.author = found.subTitle;
    item.type = found.type;
    item.url = "/developers/brick-book/" + item.type + "/" + item.id;
    return item;
  });
  const topBricksAndTemplates = reverse(
    sortBy([...countCommonBricksUsed, ...countCommonTemplatesUsed], "count")
  ).slice(0, 20);
  const result = {
    microAppsCount: bootstrap.storyboards.length,
    microAppsWithoutLegacyCount: microAppsWithoutLegacy.length,
    iframeMicroApps:
      bootstrap.storyboards.length - microAppsWithoutLegacy.length,
    allBricksAndTemplatesCount:
      uniq(allMicroAppsBricks).length + uniq(allMicroAppsTemplates).length,
    commonBricksAndTemplatesCount:
      commonBricksName.length + allCommonTemplates.length,
    commonBricksAndTemplatesUsedRate: getPercentage(
      (filter(allMicroAppsBricks, (item) => {
        return includes(commonBricksName, item);
      }).length +
        filter(allMicroAppsTemplates, (item) => {
          return includes(commonTemplatesName, item);
        }).length) /
        (allMicroAppsBricks.length + allMicroAppsTemplates.length)
    ),
    microAppsPieChart: {
      title: "微应用总数：" + bootstrap.storyboards.length,
      data: {
        legendList: ["全新微应用", "iframe嵌套微应用"],
        seriesData: [
          {
            name: "全新微应用",
            value: microAppsWithoutLegacy.length,
          },
          {
            name: "iframe嵌套微应用",
            value: bootstrap.storyboards.length - microAppsWithoutLegacy.length,
          },
        ],
      },
    },
    microAppsSubMenu,
    microAppStatisticsRedirectTo,
    microAppsStatisticsMap,
    topBricksAndTemplates,
    countAllBricksAndTemplate,
    packageNames: uniq(
      compact(
        [...allMicroAppsBricks, ...allMicroAppsTemplates].map(
          (v) => v.split(".")?.[0]
        )
      )
    ),
  };
  return result;
}

customElements.define(
  "developers.provider-get-statistics",
  createProviderClass(GetStatistics)
);
