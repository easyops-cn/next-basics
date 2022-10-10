import { RouteConf } from "@next-core/brick-types";
import { GetMatchRoute, GetMatchRouteParams } from "./GetMatchRoute";

describe("GetMatchRoute", () => {
  it.each<[GetMatchRouteParams, any]>([
    [
      {
        routesList: [
          {
            path: "/next/my-app/page-1",
            exact: true,
          },
          {
            path: "/next/my-app/route-1",
            exact: false,
          },
          {
            path: "/next/my-app/route-1/page-1",
            exact: true,
          },
        ] as RouteConf[],
        previewUrl: "/next/my-app/route-1/page-1",
      },
      {
        path: "/next/my-app/route-1/page-1",
        exact: true,
      },
    ],
    [
      {
        routesList: [
          {
            path: "/next/my-app/page-1",
            exact: true,
          },
          {
            path: "/next/my-app/route-1",
            exact: undefined,
          },
          {
            path: "/next/my-app/route-1/page-1",
            exact: true,
          },
        ] as RouteConf[],
        previewUrl: "/next/my-app/route-1/page-1",
      },
      {
        path: "/next/my-app/route-1/page-1",
        exact: true,
      },
    ],
    [
      {
        routesList: [
          {
            path: "/next/my-app/page-1",
            exact: true,
          },
          {
            path: "/next/my-app/route-1",
            exact: false,
          },
          {
            path: "/next/my-app/route-1/page-1",
            exact: true,
          },
        ] as RouteConf[],
        previewUrl: "/next/my-app/route-1",
      },
      {
        path: "/next/my-app/route-1",
        exact: false,
      },
    ],
    [
      {
        routesList: [
          {
            path: "/next/my-app/page-1/:instanceId/query",
            exact: true,
          },
          {
            path: "/next/my-app/page-1/:instanceId/query/instance",
            exact: true,
          },
        ] as RouteConf[],
        previewUrl: "/next/my-app/page-1/abc/query",
      },
      {
        path: "/next/my-app/page-1/:instanceId/query",
        exact: true,
      },
    ],
    [
      {
        routesList: [
          {
            path: "/next/my-app/page-1/:instanceId/query",
            exact: true,
          },
          {
            path: "/next/my-app/page-1/:instanceId/query/instance",
            exact: true,
          },
        ] as RouteConf[],
        previewUrl: "/next/my-app/page-1/abc/query/instance",
      },
      {
        path: "/next/my-app/page-1/:instanceId/query/instance",
        exact: true,
      },
    ],
    [
      {
        routesList: [
          {
            path: "/next/my-app/page-1/:instanceId/query",
            exact: true,
          },
          {
            path: "/next/my-app/page-1/:instanceId/query/instance",
            exact: true,
          },
        ] as RouteConf[],
        previewUrl: "/next/my-app/page-1/a/edit",
      },
      undefined,
    ],
    [
      {
        routesList: [
          {
            path: "/next/my-app/page-1/:instanceId/query",
            exact: true,
          },
          {
            path: "/next/my-app/page-1/:instanceId/query/instance",
            exact: true,
          },
        ] as RouteConf[],
        previewUrl: "/next/other-app/page-1/abc/query/instance",
      },
      undefined,
    ],
  ])("GetMatchRoute(%j) should work", async (params, result) => {
    expect(await GetMatchRoute(params)).toEqual(result);
  });
});
