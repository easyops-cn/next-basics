import { developHelper } from "@next-core/brick-kit";
import { createProviderClass } from "@next-core/brick-utils";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";

export interface BrickLibraryItem {
  type: "brick" | "template" | "customTemplate" | "provider";
  name: string;
}

export interface GetBrickLibraryParams {
  projectId: string;
}

export async function GetBrickLibrary({
  projectId,
}: GetBrickLibraryParams): Promise<BrickLibraryItem[]> {
  return developHelper
    .getBrickPackages()
    .flatMap<BrickLibraryItem>((pkg) =>
      pkg.filePath.startsWith("bricks/providers-of-")
        ? pkg.bricks.map((name) => ({ type: "provider", name }))
        : pkg.bricks.map((name) => ({
            type: pkg.providers?.includes(name) ? "provider" : "brick",
            name,
          }))
    )
    .concat(
      (
        await InstanceApi_postSearch("STORYBOARD_TEMPLATE", {
          fields: {
            templateId: 1,
            id: 1,
          },

          page: 1,
          page_size: 3000,
          query: {
            "project.instanceId": projectId,
          },
        })
      ).list.map<BrickLibraryItem>((item) => ({
        type: "customTemplate",
        name: item.templateId,
        id: item.id,
      }))
    )
    .concat(
      developHelper.getTemplatePackages().flatMap<BrickLibraryItem>((pkg) =>
        pkg.templates.map((name) => ({
          type: "template",
          name,
        }))
      )
    );
}

customElements.define(
  "next-builder.provider-get-brick-library",
  createProviderClass(GetBrickLibrary)
);
