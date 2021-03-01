import { BuilderBrickNode } from "@next-core/brick-types";
import { BrickWithEvents } from "./getBricksWithEvents";

export function filterBricksWithEvents(
  bricksWithEvents: BrickWithEvents[],
  q: string
): BrickWithEvents[] {
  return bricksWithEvents.filter(
    (brick) =>
      !q ||
      String(brick.node.alias).toLowerCase().includes(q.toLowerCase()) ||
      String((brick.node as BuilderBrickNode).brick)
        .toLowerCase()
        .includes(q.toLowerCase())
  );
}
