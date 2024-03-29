import { BuilderRouteNode, BuilderSnippetNode } from "@next-core/brick-types";

export interface ThemePage {
  pageTypeId: string;
  snippet: [{ instanceId: string }];
}

export function buildPreviewRoutesForTheme(
  homepage: string,
  pages: ThemePage[],
  snippets: BuilderSnippetNode[]
): BuilderRouteNode[] {
  const snippetMap = new Map(
    snippets.map((snippet) => [snippet.instanceId, snippet])
  );
  return pages.map<BuilderRouteNode>(
    (page) =>
      ({
        type: "bricks",
        path: `${homepage}/_dev_only_/theme-preview/${page.pageTypeId}`,
        context: snippetMap.get(page.snippet[0].instanceId)?.context,
        children: snippetMap.get(page.snippet[0].instanceId).children,
      } as BuilderRouteNode)
  );
}
