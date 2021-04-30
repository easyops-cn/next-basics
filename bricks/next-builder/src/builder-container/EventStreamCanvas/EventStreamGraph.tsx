import React from "react";
import ReactDOM from "react-dom";
import {
  hierarchy,
  tree,
  HierarchyPointNode,
  HierarchyPointLink,
} from "d3-hierarchy";
import { create, Selection } from "d3-selection";
import { linkHorizontal } from "d3-shape";
import { zoomIdentity } from "d3-zoom";
import { drag, D3DragEvent } from "d3-drag";
import { clamp, uniqueId } from "lodash";
import classNames from "classnames";
import { styleConfig } from "./styleConfig";
import {
  EventDownstreamNode,
  EventDownstreamNodeOfRoot,
  EventDownstreamType,
  EventStreamNode,
  EventUpstreamNode,
  EventUpstreamNodeOfRoot,
  EventUpstreamType,
} from "./interfaces";
import { EventStreamNodeComponent } from "./EventStreamNodeComponent";
import { computeEventDownstreamSourceX } from "./buildBrickEventDownstreamTree";
import { computeEventUpstreamSourceX } from "./buildBrickEventUpstreamTree";

import styles from "./EventStreamGraph.module.css";

interface RenderOptions {
  targetMap: Map<string, string>;
  targetRefMap: Map<string, string>;
  setEventStreamNodeId?: React.Dispatch<React.SetStateAction<string>>;
}

export class EventStreamGraph {
  private readonly canvas: Selection<
    HTMLDivElement,
    undefined,
    null,
    undefined
  >;
  private readonly linksLayer: Selection<
    SVGSVGElement,
    undefined,
    null,
    undefined
  >;
  private readonly nodesLayer: Selection<
    HTMLDivElement,
    undefined,
    null,
    undefined
  >;
  private readonly defs: Selection<SVGDefsElement, undefined, null, undefined>;
  private readonly arrowMarkerId: string;
  private readonly linksContainer: Selection<
    SVGGElement,
    undefined,
    null,
    undefined
  >;
  private readonly nodesContainer: Selection<
    HTMLDivElement,
    undefined,
    null,
    undefined
  >;
  private links: Selection<
    SVGGElement,
    HierarchyPointLink<EventStreamNode>,
    SVGGElement,
    undefined
  >;
  private nodes: Selection<
    HTMLDivElement,
    HierarchyPointNode<EventStreamNode>,
    HTMLDivElement,
    undefined
  >;

  private readonly onEventNodeClick: (eventNode: EventStreamNode) => void;

  private offsetX = 0;
  private offsetY = 0;
  private nodesContainerWidth: number;
  private nodesContainerHeight: number;

  constructor(options?: {
    onEventNodeClick?: (eventNode: EventStreamNode) => void;
  }) {
    this.onEventNodeClick = options?.onEventNodeClick;
    this.canvas = create("div").attr("class", styles.canvas);
    this.linksLayer = this.canvas
      .append("svg")
      .attr("class", styles.linksLayer)
      .style("overflow", "visible");
    this.nodesLayer = this.canvas
      .append("div")
      .attr("class", styles.nodesLayer);
    this.defs = this.linksLayer.append("defs");
    this.arrowMarkerId = uniqueId("arrow-");
    this.defs
      .append("marker")
      .attr("id", this.arrowMarkerId)
      .attr("class", styles.arrowMarker)
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z");
    this.linksContainer = this.linksLayer.append("g");
    this.links = this.linksContainer.selectAll("g");
    this.nodesContainer = this.nodesLayer
      .append("div")
      .attr("class", styles.nodesContainer);
    this.nodes = this.nodesContainer.selectAll(`.${styles.nodeWrapper}`);

    this.canvas.call(
      drag<HTMLDivElement, any>()
        .on("start", () => {
          this.canvas.classed(styles.grabbing, true);
        })
        .on("drag", (event: D3DragEvent<HTMLDivElement, unknown, unknown>) => {
          const { dx, dy } = event;
          this.transform(-dx, -dy);
        })
        .on("end", () => {
          this.canvas.classed(styles.grabbing, false);
        })
    );

    this.canvas
      .on("wheel", function (event: WheelEvent) {
        event.preventDefault();
      })
      .on("wheel.zoom", (event: WheelEvent) => {
        event.stopPropagation();
        const { deltaX, deltaY, ctrlKey } = event;
        // macOS trackPad pinch event is emitted as a wheel.zoom and event.ctrlKey set to true
        if (ctrlKey) {
          return;
        }
        this.transform(deltaX, deltaY);
      });
  }

  private transform(dx: number, dy: number): void {
    const nodeWidth = styleConfig.node.width;
    const maxOffsetX = this.nodesContainerWidth - nodeWidth / 2;
    const maxOffsetY = this.nodesContainerHeight - nodeWidth / 2;
    const minOffsetX = -this.canvas.node().offsetWidth + nodeWidth / 2;
    const minOffsetY = -this.canvas.node().offsetHeight + nodeWidth / 2;
    const resultX = this.offsetX + dx;
    const resultY = this.offsetY + dy;
    this.offsetX = clamp(resultX, minOffsetX, maxOffsetX);
    this.offsetY = clamp(resultY, minOffsetY, maxOffsetY);
    const transformToNodes = `translate(${-this.offsetX}px, ${-this
      .offsetY}px)`;
    const transform = zoomIdentity.translate(-this.offsetX, -this.offsetY);
    this.linksLayer.attr("transform", transform.toString());
    this.nodesLayer.style("transform", transformToNodes);
  }

  getDOMNode(): HTMLDivElement {
    return this.canvas.node();
  }

  render(
    eventDownstreamTree: EventDownstreamNodeOfRoot,
    eventUpstreamTree: EventUpstreamNodeOfRoot,
    options?: RenderOptions
  ): void {
    const nodeWidth = styleConfig.node.width;
    // x and y is swapped in horizontal tree layout.
    const dx = 40;
    const dy = nodeWidth + 60;
    const markerOffset = 5;

    const hierarchyDownstreamRoot = hierarchy(eventDownstreamTree);

    const downstreamRoot = tree<EventDownstreamNode>()
      .nodeSize([dx, dy])
      .separation((a, b) => {
        // Separation should be relative to `dx`.
        // Make extra one unit as spacing.
        return (a.data.height + b.data.height) / 2 / dx + 1;
      })(hierarchyDownstreamRoot);

    const hierarchyUpstreamRoot = hierarchy(eventUpstreamTree);

    const upstreamRoot = tree<EventUpstreamNode>()
      .nodeSize([dx, dy])
      .separation((a, b) => {
        // Separation should be relative to `dx`.
        // Make extra one unit as spacing.
        return (a.data.height + b.data.height) / 2 / dx + 1;
      })(hierarchyUpstreamRoot);

    upstreamRoot.each((node) => {
      // Upstream nodes are placed in left of canvas, and flipped horizontally.
      node.y = -node.y;
    });

    const downstreamWidth = dy * (downstreamRoot.height + 1);
    const upstreamWidth = dy * upstreamRoot.height;
    const width = downstreamWidth + upstreamWidth;
    this.nodesContainerWidth = width;

    let x0 = Infinity;
    let x1 = -x0;
    const computeNodesContainerHeight = (
      d: HierarchyPointNode<EventStreamNode>
    ): void => {
      const xTop = d.x - d.data.height / 2;
      const xBottom = xTop + d.data.height;
      if (xBottom > x1) x1 = xBottom;
      if (xTop < x0) x0 = xTop;
    };
    downstreamRoot.each(computeNodesContainerHeight);
    upstreamRoot.each(computeNodesContainerHeight);
    const height = x1 - x0 + dx * 2;
    this.nodesContainerHeight = height;

    this.canvas.attr("width", "100%");
    this.canvas.style("height", "100%");
    this.linksLayer.attr("width", "100%");
    this.linksLayer.attr("height", height);

    const offsetX = dy / 2 + upstreamWidth;
    const offsetY = dx - x0;
    this.linksContainer.attr("transform", `translate(${offsetX},${offsetY})`);
    this.nodesContainer
      .style("left", `${offsetX}px`)
      .style("top", `${offsetY}px`);

    const linkFactory = linkHorizontal<
      unknown,
      HierarchyPointNode<EventStreamNode>
    >()
      .x((d) => d.y)
      .y((d) => d.x);

    this.links = this.links
      .data<HierarchyPointLink<EventStreamNode>>(
        (downstreamRoot.links() as HierarchyPointLink<EventStreamNode>[])
          .map(({ source, target }) => {
            const offset = nodeWidth / 2;
            return {
              source: {
                ...source,
                x: computeEventDownstreamSourceX({
                  source,
                  target,
                } as HierarchyPointLink<EventDownstreamNode>),
                y:
                  source.y +
                  offset -
                  (source.data.type === EventDownstreamType.ROOT
                    ? 0
                    : styleConfig.node.padding),
              },
              target: {
                ...target,
                y: target.y - offset - markerOffset * 2,
              },
            };
          })
          .concat(
            // In upstream, source and target are reversed.
            upstreamRoot.links().map(({ source: target, target: source }) => {
              const offset = nodeWidth / 2;
              return {
                source: {
                  ...source,
                  x: computeEventUpstreamSourceX(source),
                  y:
                    source.y +
                    offset -
                    (source.data.type === EventUpstreamType.UPSTREAM_SOURCE
                      ? 0
                      : styleConfig.node.padding),
                },
                target: {
                  ...target,
                  y: target.y - offset - markerOffset * 2,
                },
              };
            })
          )
      )
      .join((enter) => {
        const link = enter.append("g");
        link.append("path").attr("marker-end", `url(#${this.arrowMarkerId})`);
        return link;
      })
      .attr("class", classNames(styles.link));

    // The extra marker offset makes it smoothy for steep links.
    this.links
      .select("path")
      .attr("d", (d) => `${linkFactory(d)}h${markerOffset}`);

    this.nodes = this.nodes
      .data<HierarchyPointNode<EventStreamNode>>(
        (downstreamRoot.descendants() as HierarchyPointNode<EventStreamNode>[]).concat(
          upstreamRoot.descendants().filter((node) => node !== upstreamRoot)
        )
      )
      .join("div")
      .attr("class", classNames(styles.nodeWrapper))
      .style("left", (d) => `${d.y}px`)
      .style("top", (d) => `${d.x}px`);
    const onEventNodeClick = this.onEventNodeClick;
    this.nodes.each(function (d) {
      ReactDOM.render(
        <EventStreamNodeComponent
          eventNode={d.data}
          {...options}
          onEventNodeClick={onEventNodeClick}
        />,
        this
      );
    });

    // When the nodesContainer width or height is smaller than the canvas width or height,
    // transform the nodesContainer to the center of canvas.
    const canvasWidth = this.canvas.node().offsetWidth;
    const dx0 =
      this.nodesContainerWidth < canvasWidth
        ? this.nodesContainerWidth / 2 - canvasWidth / 2 - this.offsetX
        : -this.offsetX;

    const canvasHeight = this.canvas.node().offsetHeight;
    const dy0 =
      this.nodesContainerHeight < canvasHeight
        ? this.nodesContainerHeight / 2 - canvasHeight / 2 - this.offsetY
        : -this.offsetY;
    this.transform(dx0, dy0);
  }
}
