import { createProviderClass } from "@next-core/brick-utils";
import { http } from "@next-core/brick-http";
import { StoryDoc, StoryDocTemplate } from "@next-core/brick-types";

function getBrickDocById(
  storyId: string,
  docs: StoryDocTemplate
): StoryDoc | undefined | null {
  return docs && docs.children
    ? docs.children.find((element) => element.id === storyId)
    : null;
}

async function getBricksDoc(
  brickId: string,
  type?: "bricks"
): Promise<StoryDoc | undefined | null> {
  if (!brickId) {
    return null;
  }
  const [module] = brickId.split(".");

  const data = await http
    .get(`bricks/${module}/dist/docs.json`)
    .catch(() => null);

  return getBrickDocById(brickId, data);
}
customElements.define(
  "developers.provider-get-bricks-doc",
  createProviderClass(getBricksDoc)
);
