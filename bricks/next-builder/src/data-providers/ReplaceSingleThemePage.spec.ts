import { BuilderBrickNode } from "@next-core/brick-types";
import {
  InstanceApi_CreateInstanceRequestBody,
  InstanceApi_GetDetailRequestParams,
  InstanceApi_UpdateInstanceRequestBody,
} from "@next-sdk/cmdb-sdk";
import {
  ReplaceSingleThemePage,
  ReplaceSingleThemePageParams,
} from "./ReplaceSingleThemePage";

const mockGetDetail = jest.fn((_: any) => ({
  children: [
    {
      instanceId: "B-001",
    },
    {
      instanceId: "B-002",
    },
  ],
}));
const mockCreateInstance = jest.fn((_: any) => ({
  instanceId: "B-003",
}));
const mockUpdateInstance = jest.fn();
const mockArchiveInstance = jest.fn();

jest.mock("@next-sdk/cmdb-sdk", () => ({
  InstanceApi_getDetail: (...args) => mockGetDetail(args),
  InstanceApi_createInstance: (...args) => mockCreateInstance(args),
  InstanceApi_updateInstanceV2: (...args) => mockUpdateInstance(args),
  InstanceArchiveApi_archiveInstance: (...args) => mockArchiveInstance(args),
}));

function needCalled(isNeed): boolean {
  if (isNeed !== false) {
    return true;
  }
}

describe("ReplaceSingleThemePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each<
    [
      string,
      ReplaceSingleThemePageParams,
      InstanceApi_GetDetailRequestParams | false,
      InstanceApi_CreateInstanceRequestBody | false,
      InstanceApi_UpdateInstanceRequestBody | false,
      (
        | {
            [x: string]: any;
          }
        | false
      ),
      {
        action: string;
      }
    ]
  >([
    [
      "while children was null, just add the instance",
      {
        appId: "app-1",
        routeInstanceId: "route-1",
        themeId: "tpl-page-test-1",
        themeList: ["tpl-page-test-1", "tpl-page-test-2"],
        routeChildren: [],
      },
      false,
      [
        [
          [
            "STORYBOARD_BRICK",
            {
              appId: "app-1",
              brick: "tpl-page-test-1",
              mountPoint: "bricks",
              parent: "route-1",
              portal: false,
              type: "brick",
            },
          ],
        ],
      ],
      false,
      false,
      {
        action: "添加",
      },
    ],
    [
      "while had the children, should move the children into the new node",
      {
        appId: "app-1",
        routeInstanceId: "route-1",
        themeId: "tpl-page-test-1",
        themeList: ["tpl-page-test-1", "tpl-page-test-2"],
        routeChildren: [
          {
            brick: "mirco-view",
            instanceId: "B-004",
          },
          {
            brick: "general-button",
            instanceId: "B-005",
          },
        ] as BuilderBrickNode[],
      },
      false,
      [
        [
          [
            "STORYBOARD_BRICK",
            {
              appId: "app-1",
              brick: "tpl-page-test-1",
              mountPoint: "bricks",
              parent: "route-1",
              portal: false,
              type: "brick",
            },
          ],
        ],
      ],
      [
        [
          [
            "STORYBOARD_BRICK",
            "B-004",
            { mountPoint: "content", parent: "B-003" },
          ],
        ],
        [
          [
            "STORYBOARD_BRICK",
            "B-005",
            { mountPoint: "content", parent: "B-003" },
          ],
        ],
      ],
      false,
      {
        action: "添加",
      },
    ],
    [
      "while had the theme, just replace the theme brick",
      {
        appId: "app-1",
        routeInstanceId: "route-1",
        themeId: "tpl-page-test-2",
        themeList: ["tpl-page-test-1", "tpl-page-test-2"],
        routeChildren: [
          {
            brick: "mirco-view",
            instanceId: "B-004",
          },
          {
            brick: "tpl-page-test-1",
            instanceId: "B-005",
          },
        ] as BuilderBrickNode[],
      },
      false,
      false,
      [
        [
          [
            "STORYBOARD_BRICK",
            "B-005",
            {
              brick: "tpl-page-test-2",
            },
          ],
        ],
      ],
      false,
      {
        action: "替换",
      },
    ],
    [
      "while had the theme was equal, no action",
      {
        appId: "app-1",
        routeInstanceId: "route-1",
        themeId: "tpl-page-test-1",
        themeList: ["tpl-page-test-1", "tpl-page-test-2"],
        routeChildren: [
          {
            brick: "mirco-view",
            instanceId: "B-004",
          },
          {
            brick: "tpl-page-test-1",
            instanceId: "B-005",
          },
        ] as BuilderBrickNode[],
      },
      false,
      false,
      false,
      false,
      {
        action: "",
      },
    ],
    [
      "while themeId was null, should delete the page theme",
      {
        appId: "app-1",
        routeInstanceId: "route-1",
        themeId: null,
        themeList: ["tpl-page-test-1", "tpl-page-test-2"],
        routeChildren: [
          {
            brick: "tpl-page-test-1",
            instanceId: "B-005",
          },
        ] as BuilderBrickNode[],
      },
      false,
      false,
      [
        [
          [
            "STORYBOARD_BRICK",
            "B-001",
            { mountPoint: "bricks", parent: "route-1" },
          ],
        ],
        [
          [
            "STORYBOARD_BRICK",
            "B-002",
            { mountPoint: "bricks", parent: "route-1" },
          ],
        ],
      ],
      [[["STORYBOARD_BRICK", "B-005"]]],
      {
        action: "删除",
      },
    ],
    [
      "while themeId was null without theme",
      {
        appId: "app-1",
        routeInstanceId: "route-1",
        themeId: null,
        themeList: ["tpl-page-test-1", "tpl-page-test-2"],
        routeChildren: [] as BuilderBrickNode[],
      },
      false,
      false,
      false,
      false,
      {
        action: "",
      },
    ],
  ])(
    "(%j) should work",
    async (
      _,
      params,
      getDetailParams,
      createInstanceParams,
      updateInstanceParams,
      archiveInstanceParams,
      result
    ) => {
      expect(await ReplaceSingleThemePage(params)).toEqual(result);

      needCalled(getDetailParams) &&
        expect(mockGetDetail.mock.calls).toEqual(getDetailParams);
      needCalled(createInstanceParams) &&
        expect(mockCreateInstance.mock.calls).toEqual(createInstanceParams);
      needCalled(updateInstanceParams) &&
        expect(mockUpdateInstance.mock.calls).toEqual(updateInstanceParams);
      needCalled(archiveInstanceParams) &&
        expect(mockArchiveInstance.mock.calls).toEqual(archiveInstanceParams);
    }
  );
});
