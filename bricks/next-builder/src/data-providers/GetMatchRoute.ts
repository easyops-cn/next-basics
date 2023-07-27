import { RouteConf } from "@next-core/brick-types";
import { createProviderClass, matchPath } from "@next-core/brick-utils";

export interface GetMatchRouteParams {
  routesList: RouteConf[];
  previewUrl: string;
}

export function GetMatchRoute({
  routesList,
  previewUrl,
}: GetMatchRouteParams): RouteConf {
  return routesList
    .sort((a, b) => Number(!!b.exact) - Number(!!a.exact))
    .find((route) => {
      return matchPath(previewUrl, {
        path: route.path,
        exact: route.exact,
      });
    });
}

customElements.define(
  "next-builder.provider-get-match-route",
  createProviderClass(GetMatchRoute)
);
