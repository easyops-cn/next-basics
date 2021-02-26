/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React from "react";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import { EventDownstreamGraph } from "./EventDownstreamGraph";
import { EventDownstreamNode, EventDownstreamType } from "./interfaces";
import { buildBrickEventDownstreamTree } from "./buildBrickEventDownstreamTree";
import { useBuilderUIContext } from "../BuilderUIContext";

export interface EventDownstreamGraphComponentProps {
  node: BuilderRuntimeNode;
}

export function EventDownstreamGraphComponent({
  node,
}: EventDownstreamGraphComponentProps): React.ReactElement {
  const { fullscreen } = useBuilderUIContext();
  const eventRoot = React.useMemo(() => {
    const root: EventDownstreamNode = {
      type: EventDownstreamType.ROOT,
      node,
      children: [],
    };
    buildBrickEventDownstreamTree(root, node.$$parsedEvents);
    return root;
  }, [node]);

  const visual = React.useMemo(() => new EventDownstreamGraph(), []);
  const ref = React.useRef<HTMLDivElement>(null);

  const resize = React.useCallback(() => {
    const graphContainer = ref.current;
    if (!graphContainer) {
      return;
    }
    let maxHeight = "100%";
    if (!fullscreen) {
      // Make the graph does not overflow the screen.
      const { top, bottom } = graphContainer.getBoundingClientRect();
      // The bottom spacing is the height of RootLayout subtract the bottom of the graph.
      const bottomSpacing =
        process.env.NODE_ENV === "test"
          ? 44 // For testing only
          : document.querySelector("#root-layout").getBoundingClientRect()
              .height - bottom;
      maxHeight = `${
        document.documentElement.clientHeight - top - bottomSpacing
      }px`;
    }
    graphContainer.style.maxHeight = maxHeight;
    graphContainer.style.height = maxHeight;
  }, [fullscreen]);

  React.useEffect(() => {
    const graphContainer = ref.current;
    if (!graphContainer) {
      return;
    }

    resize();
    graphContainer.appendChild(visual.getDOMNode());
  }, [visual, resize]);

  React.useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  const handleRender = React.useCallback(() => {
    visual.render(eventRoot);
  }, [eventRoot, visual]);

  React.useEffect(() => {
    handleRender();
  }, [handleRender]);

  return <div ref={ref} style={{ width: "100%", overflow: "hidden" }}></div>;
}
